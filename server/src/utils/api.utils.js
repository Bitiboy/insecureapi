const TOKEN_VALID_MINUTES = require('../conf/serverconfig').TOKEN_VALID_MINUTES;
const jwtSecret = require('../conf/serverconfig').jwtSecret;
const jwt = require('jsonwebtoken');

class ApiUtils {

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
