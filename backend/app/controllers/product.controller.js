const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const ProductService = require("../services/product.service");
const CartService = require("../services/cart.service");
const CategoryService = require("../services/category.service");
const multer = require("multer");

// Create and Save a new Contact
exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    
    }
    try {
        const productService = new ProductService(MongoDB.client);
        // const imagePath = req.file.findname;
        const document = await productService.create(req.body); 
        return res.send(document);

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const productService = new ProductService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await productService.findByName(name);
        } else {
            documents = await productService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.update(req.params.id, req.body);
        if (!document) {
           return res.send({message: "Updated successfully" });
        }
       return next(new ApiError(404, "Not found"));
        
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

//Delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404,"Product was deleted successfully" ));
        }
        return res.send({ message:"Product not found" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete Product with id=${req.params.id}`
            )
        );
    }
}

// Delete all contacts of user from the database
exports.deleteAll = async (_req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const deletedCount = await productService.deleteAll();
        return res.send({
            message: `${deletedCount} products were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all products")
        );
    }
};

// Find all favorite contacts of user
// exports.findAllFavorite = async (_req, res, next) => {
//     try {
//         const productService = new ProductService(MongoDB.client);
//         const documents = await productService.findFavorite();
//         return res.send(documents);
//     } catch (error) {
//         return next(
//             new ApiError(
//                 500,
//                 "An error occurred while rtrieving favorite contacts"
//             )
//         );
//     }
// }

exports.addCart = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const productService = new ProductService(MongoDB.client);
        const { userId, productId, name, image, quantity, price } = req.body;

        // let cart = await cartService.findByuserId({ userId: userId });
        let cart = await cartService.findByuserId({ 'products[0]._id': productId  });
        console.log(cart)

        //  const cartItem = {
        //     productId :productId,
        //     name: name,
        //     image:image,
        //     quantity:quantity,
        //     price :price,
        //     created_at: new Date(),
        // };

        
        if (!cart) {
           const newcart = await cartService.addCart({
                userId,
                products: { productId, name, image, quantity, price }, // Assuming `product` contains necessary information
            });
            return res.status(200).json({ success: true, data: newcart });

        } else {
        //     // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingProduct = cart.products.find(item => item.productId === productId);

            if (existingProduct) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng
                existingProduct.quantity += quantity;
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
                cart.products.push({ productId, name, image, quantity, price });
            }

            // Cập nhật giỏ hàng
            await cartService.update(cart._id, cart);
            return res.status(200).json({ success: true, data: cart });
        }
    } catch (error) {
        return next(new ApiError(500, `Error adding item to cart: ${error.message}`));
    }
};




