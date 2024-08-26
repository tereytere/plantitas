const express = require("express");
const router = express.Router();
const { addUser, login, getUserById, getUsers, deleteUser, updateUser, addPlantToUser } = require("../controllers/user.controller");
const uploadUser = require("../../middleware/uploadUser");
const { isAuth, isAdmin } = require("../../middleware/auth");

router.post("/add", uploadUser.single("image"), addUser);
router.post("/login", login);
router.get("/user/:id", [isAuth], getUserById);
router.put("/user/:id", [isAuth], updateUser);
router.put("/user/:idU/plant", [isAuth], addPlantToUser);
router.get("/users", [isAdmin], getUsers);
router.delete("/deleteuser", [isAdmin], deleteUser);

module.exports = router