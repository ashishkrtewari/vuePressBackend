import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import postRoutes from "./routes/postRoutes";
import authRoutes from "./routes/authRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import cookieSession from "cookie-session";
import passport from "passport";
import "./models/userModel";
import "./services/passport";
import { cookieKey } from "./config/keys";
import staticRoutes from "./routes/staticRoutes";

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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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
staticRoutes(app);

app.listen(PORT, () => {
  console.log("vuePress running on port :", PORT);
});
