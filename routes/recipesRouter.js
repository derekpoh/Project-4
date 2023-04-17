const recipesController = require("../controllers/recipesController");
const express = require("express");
const router = express.Router();

router.post("/create", recipesController.create)
router.get("/:id", recipesController.show)

module.exports = router;