import express from "express";
import dataSource from "./data-source.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

// Server start logic
const startServer = async () => {
  try {
    await dataSource.connect(); // Ensure the DB is connected before starting the server
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

// Start server only in non-test environments
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;

