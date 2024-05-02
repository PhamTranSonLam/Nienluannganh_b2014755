const express = require("express");
const orders = require("../controllers/order.controller");

const router = express.Router();

router.route("/")
    .get(orders.findAll)
    .post(orders.create)
    // .put(orders.update)
    // .delete(orders.delete);
    // .delete(contacts.deleteAll);

// router.route("/favorite")
//     .get(contacts.findAllFavorite);

router.route("/:id")
    .get(orders.findOne)
    .put(orders.update)
    .delete(orders.delete);

module.exports = router;