import express from "express";
import cors from "cors";
const app = express();
app.use(cors("*"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.all("*", async (req, res) => {
  res.send("Route Not Exists");
});
export default app;
