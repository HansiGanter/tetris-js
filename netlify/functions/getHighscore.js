const sqlite3 = require("sqlite3").verbose();

exports.handler = async function (event, context) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("./tetris.db", sqlite3.OPEN_READONLY);
    db.get("SELECT highscore FROM scores", (err, row) => {
      db.close();

      if (err) {
        return resolve({
          statusCode: 500,
          body: JSON.stringify({ message: "Internal Server Error" }),
        });
      }

      if (row) {
        return resolve({
          statusCode: 200,
          body: JSON.stringify({ highScore: row.highscore }),
        });
      } else {
        return resolve({
          statusCode: 404,
          body: JSON.stringify({ message: "No highscore found" }),
        });
      }
    });
  });
};
