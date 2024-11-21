const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioControllers");
const auth = require("../middlewares/authmiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.post("/register", usuarioController.register);
router.get("/list", usuarioController.list);
router.post("/login", usuarioController.login);
router.put("/me", auth, upload.single('avatar'), usuarioController.update);

module.exports = router;
