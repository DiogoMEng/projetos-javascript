const { Router } = require("express");

const ToughtController = require("../controllers/ToughtController");

const router = Router();

router.get("/", ToughtController.showToughts);

module.exports = router;