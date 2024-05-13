const faunadb = require("faunadb");

exports.handler = async (event, context) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET,
  });

  const q = faunadb.query;
  const docId = "397807145781821643"; // Document ID for the high score

  // Parse the new high score value from the request body
  const data = JSON.parse(event.body);
  const newHighScore = data.highscore;

  try {
    const oldHighScore = await client.query(
      q.Get(q.Ref(q.Collection("Scores"), docId))
    );

    if (newHighScore > oldHighScore.data.highscore) {
      try {
        const result = await client.query(
          q.Update(q.Ref(q.Collection("Scores"), docId), {
            data: { highscore: newHighScore },
          })
        );
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: `High score updated successfully to ${newHighScore}`,
            newHighScore: result.data.highscore,
          }),
        };
      } catch (error) {
        console.error("Error updating FaunaDB:", error);
        return {
          statusCode: 500,
          body: JSON.stringify({
            message: "Failed to update high score",
            error: error.message,
          }),
        };
      }
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: `Request successful. Highscore stays at ${oldHighScore.data.highscore}`,
          newHighScore: oldHighScore.data.highscore,
        }),
      };
    }
  } catch (error) {
    console.error("Error accessing FaunaDB:", error);
  }
};
