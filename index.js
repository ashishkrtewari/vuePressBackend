import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import routes from "./routes/routes";

const app = express();
const PORT = process.env.PORT || 5000;

//Mongoose Connect
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost/vuePress",
  {
    useMongoClient: true
  }
);

//bodyParser Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("vuePress running on port :", PORT);
});
