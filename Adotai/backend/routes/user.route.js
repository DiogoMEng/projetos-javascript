const router = require("express").Router();

/**
 *  CONTROLLERS 
 */
const UserController = require("../controllers/User.controller.js");

/**
 * MIDDLEWARES 
 */
const verifyToken = require("../helpers/verifyToken.helper.js");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);
router.patch("/edit/:id", verifyToken, UserController.editUser);

module.exports = router;