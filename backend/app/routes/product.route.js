const express = require("express");
const products = require("../controllers/product.controller");
const carts = require("../controllers/cart.controller");
const multer = require("multer");
const path = require("path");

const router = express.Router();



router.route("/")
    .get(products.findAll)
    
    .delete(products.deleteAll);

router.route("/Add")
    .post(products.create)

router.route("/addcart")
    .post(products.addCart);

router.route("/:id")
    .get(products.findOne)
    .put(products.update)
    .delete(products.delete);

// router.route("/add")
//     .post(products.addCart);

module.exports = router;