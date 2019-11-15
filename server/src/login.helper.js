const TOKEN_VALID_MINUTES = require('./conf/serverconfig').TOKEN_VALID_MINUTES;
const jwtSecret = require('./conf/serverconfig').jwtSecret;
const jwt = require('jsonwebtoken');

class LoginHelper {

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
}

module.exports = LoginHelper;
