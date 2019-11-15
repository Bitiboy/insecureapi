const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../../database/users.db');

class DBHelper {

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
}
module.exports = DBHelper;