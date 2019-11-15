const TOKEN_VALID_MINUTES = require('./conf/serverconfig').TOKEN_VALID_MINUTES;
const jwtSecret = require('./conf/serverconfig').jwtSecret;
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const path = require('path');
const dbPath = path.resolve(__dirname, '../database/users.db');

class ApiUtils {

  openDb() {
    return new sqlite3.Database(dbPath, (err) => {
      if (err) {
          console.error(err);
      }
      console.log("Connected to DB!");
    });
  }

  closeDb(db) {
    db.close((err) => {
      if (err) {
          console.error(err.message);
      }
      console.log("Closed db connection.");
    });
  }

  generateToken(username) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + (TOKEN_VALID_MINUTES * 60);
    const payload = {
      "iat": iat,
      "exp": exp,
      "sub": username,
      "iss": "fishysite.no"
    };
    return jwt.sign(payload, jwtSecret); 
  }

  isNumerical(str) {
    str = str.toLowerCase();
    const nonNumericalVals = "abcdefghijklmnopqrstuvwxyz|!#¤%&/()?*^¨~,.:_";
    for(let i = 0; i < str.length; i++) {
      if (nonNumericalVals.indexOf(str.charAt(i)) >= 0) {
        return false;
      }
    }
    return true;
  }

  validTokenAttached(req) {
    let validToken = false;
    if (req.header!= null) {
      let token = req.headers['x-access-token'] || req.headers['authorization'];
      if(token) {
        if (token.toLowerCase().startsWith('bearer ')) {
          // Remove "Bearer " from string
          token = token.slice(7, token.length);
        }
        jwt.verify(token, jwtSecret, { ignoreExpiration: false, algorithms: ['HS256'] }, (e, decoded) => {
          if (!e) {
            validToken = true;
          }
        });
      }
    }
    return validToken;
  }

}

module.exports = ApiUtils;
