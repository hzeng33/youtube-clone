import express from "express";

const app = express();
const port = 3030;

app.get("/", (req, res) => {
  res.send("Hello !");
});

app.listen(port, () => {
  console.log(
    `Video processing service is running at http://localhost:${port}`
  );
});
