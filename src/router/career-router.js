const express = require("express");
const router = express.Router();
const careerController = require("../controllers/careerController");

router.post("/add-career", careerController.addCareer);
router.get("/career-type", careerController.getTypeOfCareers);

module.exports = router;
