import express from "express";
import dataSource from "./data-source.js";
import authRouter from "./src/Routes/Auth.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Test Route
app.get("/", (req, res) => {
  return res.send("Server is Live");
});

// Active Routes
app.use("/auth", authRouter);

await dataSource.connect();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
