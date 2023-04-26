const recipesController = require("../controllers/recipesController");
const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("../config/ensureLoggedIn")


router.get("/mostviews", recipesController.mostViews)
router.get("/bestratings", recipesController.bestRatings)
router.get("/newestrecipes", recipesController.newestRecipes)
router.post("/create",  recipesController.create)
router.get("/cuisines/:cuisine", recipesController.cuisine)
router.get("/:id", recipesController.show)
router.put("/:id",  recipesController.update)
router.delete("/:id",  recipesController.delete)
router.get("/:id/myrecipes",  recipesController.myRecipes)
router.post("/:id/rating",  recipesController.setRating)
router.post("/:id/comment",  recipesController.setComment)
router.get("/:id/edit",  recipesController.edit)
router.post("/:id/bookmark",  recipesController.addBookmark)
router.delete("/:id/bookmark",  recipesController.deleteBookmark)

module.exports = router;