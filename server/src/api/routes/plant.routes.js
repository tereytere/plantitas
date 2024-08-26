const express = require("express");
const router = express.Router();
const { addPlant, deletePlant, getPlant, getPlants, changePlant } = require("../controllers/plant.controller");
const uploadPlant = require("../../middleware/uploadPlant");
const { isAdmin } = require("../../middleware/auth");

router.post("/addplant", [isAdmin, uploadPlant.single("image")], addPlant);
router.put("/plant/:id", [isAdmin], changePlant);
router.get("/plant/:id", getPlant);
router.get("/plants", getPlants);
router.delete("/deleteplant", [isAdmin], deletePlant);

module.exports = router