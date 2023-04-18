const recipesController = require("../controllers/recipesController");
const express = require("express");
const router = express.Router();

router.post("/create", recipesController.create)
router.get("/:id", recipesController.show)
router.post("/:id/rating", recipesController.setRating)

module.exports = router;