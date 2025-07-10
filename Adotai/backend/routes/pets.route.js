const router = require("express").Router();

/**
 *  CONTROLLERS 
 */
const PetController = require("../controllers/Pet.controller.js")

/**
 *  MIDDLEWARES 
 */
const verifyToken = require("../helpers/verifyToken.helper.js");
const { imageUpload } = require("../helpers/imageUpload.helper.js");

router.post("/create", verifyToken, imageUpload.array("images"), PetController.create);
router.get("/", PetController.getAll);
router.get("/mypets", verifyToken, PetController.getAllUserPets);
router.get("/myadoptions", verifyToken, PetController.getAllUserAdoptions);
router.get("/:id", PetController.getPetById);
router.delete("/:id", verifyToken, PetController.removePetById);
router.patch("/:id", verifyToken, imageUpload.array("images"), PetController.updatePet);
router.patch("/schedule/:id", verifyToken, PetController.schedule);
router.patch("/conclude/:id", verifyToken, PetController.concludeAdoption);

module.exports = router;