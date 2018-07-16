import express from "express";
import { resolve } from "path";
const staticRoutes = app => {
  if (process.env.NODE_ENV === "production") {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static("client/build"));

    // Express will serve up the index.html file
    // if it doesn't recognize the route
    app.get("*", (req, res) => {
      res.sendFile(resolve(__dirname, "../", "client", "build", "index.html"));
    });
  }
};
export default staticRoutes;
