import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import postRoutes from "./routes/postRoutes";
import authRoutes from "./routes/authRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import cookieSession from 'cookie-session';
import passport from 'passport';
import './models/userModel';
import './services/passport';
import { cookieKey } from "./config/keys";

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost/vuePress";

//Mongoose Connect
mongoose.Promise = global.Promise;
mongoose.connect(
  mongoURI,
  {
    useMongoClient: true
  }
);

//bodyParser Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Adding Passport middleware and cookiesession
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Registering Routes
authRoutes(app);
postRoutes(app);
uploadRoutes(app);

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
else {
  app.get("/", (req, res) => {
    res.send("Hello World");
  });
}

app.listen(PORT, () => {
  console.log("vuePress running on port :", PORT);
});
