require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./configs/dbConfig.js");
const EmailSchema = require("./model/emails.js");
const port = process.env.PORT;
const mongodb_cluster_url = process.env.MONGODB_DB_URL;

app.use(express.json());
app.use(cors());

app.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    await EmailSchema.create({ email });
    return res.status(201).json({ msg: "You are subscribed now!" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Email already subscribed" });
    } else {
      return res
        .status(500)
        .json({ error: "Server error, try again after some time" });
    }
  }
});

connectDB(mongodb_cluster_url).then(() => {
  app.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
});
