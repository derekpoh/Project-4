const recipesController = require("../controllers/recipesController");
const express = require("express");
const router = express.Router();

router.post("/create", recipesController.create)
router.get("/cuisines/:cuisine", recipesController.cuisine)
router.get("/:id", recipesController.show)
router.put("/:id", recipesController.update)
router.delete("/:id", recipesController.delete)
router.get("/:id/myrecipes", recipesController.myRecipes)
router.post("/:id/rating", recipesController.setRating)
router.post("/:id/comment", recipesController.setComment)

module.exports = router;