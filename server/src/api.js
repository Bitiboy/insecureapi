const express = require('express')
const apiRoutes = express.Router();

const ApiUtils = require('./utils/api.utils');
const helper = new ApiUtils();
const DBHelper = require('./utils/dbhelper');
const dbHelper = new DBHelper();
const InputValidator = require('./utils/inputvalidator');
const inputValidator = new InputValidator();


apiRoutes.get('/health', (req, res) => {
	res.status(200).send("Server working..");
})

apiRoutes.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	const sql_query = "SELECT * from users WHERE username = '" + username + 
                "' and password = '" + password + "';";

    let db = dbHelper.openDb();
    db.all(sql_query, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
            return;
        }

        if (rows.length == 0) {
            res.sendStatus(401);
            return;
        }
        
        token = helper.generateToken(rows[0].username);
        res.status(200).send({username: rows[0].username, accesstoken: token});
    });

    dbHelper.closeDb(db);
})



apiRoutes.get('/secret/:userid', (req, res) => {
	const userid = req.params.userid;
	if (!inputValidator.isNumerical(userid)){
        res.status(400).send("userid must be numerical");
        return;
    }
    
    if (!helper.validTokenAttached(req)) {
        res.status(401).send("Missing valid access token");
        return;
    }

    const sql_query = "SELECT * from users WHERE id = '" + userid + "';";

    let db = dbHelper.openDb();
    db.all(sql_query, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
            return;
        }

        if (rows.length != 1) {
            res.sendStatus(401);
            return;
        }
        
        res.status(200).send({userid: userid, secret: rows[0].secret});
    });
    dbHelper.closeDb(db);
});

module.exports = apiRoutes;
