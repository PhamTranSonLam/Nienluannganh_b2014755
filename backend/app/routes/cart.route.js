const express = require("express");
const carts = require("../controllers/cart.controller");

const router = express.Router();

router.route("/")
    .get(carts.findcart)
    .post(carts.addOrder);
    // .delete(contacts.deleteAll);

router.route("/add")
    .post(carts.addCart);

router.route("/:id")
    // .get(carts.findOne)
//     .put(contacts.update)
    .delete(carts.delete);

module.exports = router;