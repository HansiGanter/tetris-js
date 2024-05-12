const sqlite3 = require("sqlite3").verbose();

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { score } = data;

    if (typeof score !== "number") {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid request: score must be a number.",
        }),
      };
    }

    const db = new sqlite3.Database("./tetris.db");
    return new Promise((resolve, reject) => {
      db.get("SELECT highscore FROM scores", (err, row) => {
        if (err) {
          db.close();
          return resolve({
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" }),
          });
        }

        let currentHighScore = row ? row.highscore : 0;

        if (score > currentHighScore) {
          db.run("UPDATE scores SET highscore = ?", [score], (updateError) => {
            db.close();
            if (updateError) {
              return resolve({
                statusCode: 500,
                body: JSON.stringify({
                  message: "Failed to update highscore.",
                }),
              });
            }
            return resolve({
              statusCode: 200,
              body: JSON.stringify({
                message: `High score updated successfully to ${score}.`,
              }),
            });
          });
        } else {
          db.close();
          return resolve({
            statusCode: 200,
            body: JSON.stringify({
              message: `Request successful. Highscore is still: ${currentHighScore}.`,
            }),
          });
        }
      });
    });
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Error parsing request body." }),
    };
  }
};
