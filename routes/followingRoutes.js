const express = require("express");
const router = express.Router();
const followingController = require("../controllers/followingControllers");
const auth = require("../middlewares/authmiddleware");

router.post("/follow",auth, followingController.follow);

module.exports = router;