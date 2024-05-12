import { createServer } from "node:http";
import sqlite3 from "sqlite3";

const PORT = process.env.PORT || 3000;

let highScore = 0; // Initial high score

const server = createServer((req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    // Handle OPTIONS request
    res.writeHead(200);
    res.end();
    return;
  } else if (req.method === "GET" && req.url === "/highscore") {
    const db = new sqlite3.Database("./tetris.db");
    db.get("SELECT highscore FROM scores", (err, row) => {
      if (err) {
        console.error(err.message);
        db.close(); // Close the database connection in case of an error
        return;
      }
      if (row) {
        highScore = row.highscore;
        console.log("Current highscore: " + highScore);
      } else {
        console.error("No highscore found");
      }
      db.close(); // Close the database connection after retrieving highscore
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ highScore }));
    });
  } else if (req.method === "POST" && req.url === "/highscore") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      const body = JSON.parse(data);
      const { score } = body;
      if (score && typeof score === "number") {
        // Open the SQLite database
        const db = new sqlite3.Database("./tetris.db");

        // Check the highscore from the database
        db.get("SELECT highscore FROM scores", (err, row) => {
          if (err) {
            console.error(err.message);
            db.close(); // Close the database connection in case of an error
            return;
          }
          if (row) {
            highScore = row.highscore;
            console.log("Current highscore: " + highScore);
          } else {
            console.error("No highscore found");
          }

          // Check if the new score is higher than the current highscore
          if (score > highScore) {
            highScore = score;
            // Update the highscore in the database
            db.run("UPDATE scores SET highscore = ?", [score], (err) => {
              if (err) {
                console.error(err.message);
                db.close(); // Close the database connection in case of an error
                return;
              }
              console.log(`Highscore updated to ${score}`);
              // Send response after updating highscore
              res.writeHead(200, { "Content-Type": "text/plain" });
              res.end(`High score updated successfully to ${score}.`);
              db.close(); // Close the database connection after updating highscore
            });
          } else {
            // Send response without updating highscore
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(`Request successful. Highscore is still: ${highScore}.`);
            db.close(); // Close the database connection since highscore is not updated
          }
        });
      } else {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Invalid request.");
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found.");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
