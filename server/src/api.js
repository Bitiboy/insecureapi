const express = require('express')
const apiRoutes = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const LoginHelper = require('./login.helper');
const loginHelper = new LoginHelper();

apiRoutes.get('/health', (req, res) => {
	res.status(200).send("Server working..");
})

apiRoutes.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	sql_query = "SELECT * from users WHERE username = '" + username + 
                "' and password = '" + password + "';";

    let dbpath = path.resolve(__dirname, '../database/users.db');
    let db = new sqlite3.Database(dbpath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
            return;
        }
        console.log("Connected to DB!");
    });

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
        
        token = loginHelper.generateToken(rows[0].username);
        res.status(200).send({username: rows[0].username, accesstoken: token});
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Closed db connection.");
    });
})

module.exports = apiRoutes;
