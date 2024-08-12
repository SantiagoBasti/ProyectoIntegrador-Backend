const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");
const isAdmin = require('../middlewares/isAdmin');
const upload = require("../middlewares/upload");

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", upload, userController.postUser);
router.delete("/users/:id", [auth, isAdmin], userController.deleteUser);
router.put("/users/:idUpdate", [auth, upload], userController.updateUser);
router.post("/login", userController.login);

module.exports = router;
