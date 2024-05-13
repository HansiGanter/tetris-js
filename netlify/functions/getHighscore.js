const faunadb = require("faunadb");

exports.handler = async (event, context) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET,
  });

  const q = faunadb.query;
  const docId = "397807145781821643"; // Document ID for the high score

  try {
    const result = await client.query(
      q.Get(q.Ref(q.Collection("Scores"), docId))
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "High score fetched successfully",
        highscore: result.data.highscore,
      }),
    };
  } catch (error) {
    console.error("Error accessing FaunaDB:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to fetch high score",
        error: error.message,
      }),
    };
  }
};
