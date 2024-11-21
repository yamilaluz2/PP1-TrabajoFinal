const express = require("express");
const router = express.Router();
const postController = require("../controllers/postControllers");
const auth = require("../middlewares/authmiddleware");



router.post("/createPost",auth, postController.createPost);
router.get("/listPost",auth, postController.listPost);
router.put("/editPost/:id",auth,postController.editPost);
router.delete("/deletePost/:id",auth, postController.deletePost);
router.get("/viewPost/:id",auth, postController.viewPost);
router.get("/userpost/:id",auth , postController.userPost);



module.exports = router;