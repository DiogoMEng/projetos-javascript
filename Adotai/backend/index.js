const express = require("express");
const cors = require("cors");
const UserRoutes = require("./routes/user.route.js");
const PetRoutes = require("./routes/pets.route.js");

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
app.use("/pets", PetRoutes);

app.listen(5000, () => {
  console.log("http://localhost:5000");
});