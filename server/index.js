const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postsRouter = require("./routes/posts.js");
const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts/", postsRouter);

const CONNECTION_URL =
  "mongodb+srv://srijibkesh:Srijib123@cluster0.emtnp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

mongoose.set("useFindAndModify", false);
