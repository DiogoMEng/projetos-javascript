const { Router } = require("express");

const { checkAuth } = require("../middlewares/auth.js");
const ToughtController = require("../controllers/ToughtController");

const router = Router();

router.get("/add", checkAuth, ToughtController.createTought);
router.post('/add', checkAuth, ToughtController.createToughtSave)
router.get("/dashboard", checkAuth, ToughtController.dashboard);
router.post("/remove", )
router.get("/", ToughtController.showToughts);

module.exports = router;