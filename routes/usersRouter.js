const userController = require("../controllers/usersController");
const express = require("express");
const router = express.Router();

router.post("/register", userController.create);
router.post("/login", userController.login);
router.get("/:id/bookmarks", userController.checkBookmark)

module.exports = router;