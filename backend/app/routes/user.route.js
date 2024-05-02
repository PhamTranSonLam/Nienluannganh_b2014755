const express = require("express");
const users = require("../controllers/user.controller");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

router.route("/")
    .get(users.findAll)
    // .post(users.create)
    .delete(users.deleteAll);

router.route("/login").post(users.login);
router.route("/Add").post(users.create);

router.route("/usersAdd").post(users.create);

 router.route("/:id")
    .get(users.findOne)
    .put(users.update)
    .delete(users.delete);

module.exports = router;