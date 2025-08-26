import express from "express";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";

ffmpeg.setFfmpegPath(ffmpegPath.path);

const app = express();
app.use(express.json());

app.post("/process-video", (req, res) => {
  //Get path of input video file from the request body
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;

  if (!inputFilePath || !outputFilePath) {
    res.status(400).send("Bad Request: Missing file paths.");
  }

  ffmpeg(inputFilePath)
    .outputOptions("-vf", "scale=-1:720") // scale video to 720p
    .on("end", () => {
      res.status(200).send("Video processing finished successfully.");
    })
    .on("error", (err) => {
      console.log(`An error occurred: ${err.message}`);
      res.status(500).send(`Internal Server Error: ${err.message}`);
    })
    .save(outputFilePath);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(
    `Video processing service is running at http://localhost:${port}`
  );
});
