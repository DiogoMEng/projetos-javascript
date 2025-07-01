const express = require("express");
const cors = require("cors");
const UserRoutes = require("./routes/user.route.js");

const app = express();

/**
 * CONFIG JSON RESPONSE
 */
app.use(express.json());

/**
 * SOLVE CORS
 */
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

/**
 * PUBLIC FOLDER FOR IMAGES
 */
app.use(express.static("public"));

/**
 * ROUTES 
 */
app.use("/users", UserRoutes);

app.listen(3001, () => {
  console.log("http://localhost:3001");
});