const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const CartService = require("../services/cart.service");
const ProductService = require("../services/product.service");
const OrderService = require("../services/order.service");

// 

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const cartService = new CartService(MongoDB.client);
        const userId = req.query.userId;
        
        // Kiểm tra xem userId đã được cung cấp trong truy vấn hay không
       
        // Tìm kiếm giỏ hàng của userId được cung cấp
        documents = await cartService.findByuserId(userId);
        
        // Trả về danh sách sản phẩm trong giỏ hàng của userId
        return res.send(documents);
    } catch (error) {
        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình tìm kiếm
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
};

//Delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404,"Contact was deleted successfully" ));
        }
        return res.send({ message:"Contact not found" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete contact with id=${req.params.id}`
            )
        );
    }
}

exports.addCart = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const productService = new ProductService(MongoDB.client);
        const { userId, productId, name, image, quantity, price } = req.body;

        let cart = await cartService.findByuserId({ userId: userId });
        console.log(cart)

        if (!cart) {
           const newcart = await cartService.addCart({
                userId,
                products: [{ productId, name, image, quantity, price }], // Assuming `product` contains necessary information
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

exports.findcart = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const carts = await cartService.findCartUser(req.user._id)
        return res.json(carts);
    } catch (error) {
        return next(new ApiError(500, `Error adding item to cart: ${error.message}`));
    }
}

exports.findcart = async (req, res, next) => {
    try {
        // const userId = '66230d2c7da4fdc7eef23f7c';
        // const userId = '1234800';
        // const userId = req.body.userId;
        const cartService = new CartService(MongoDB.client);
        // const carts = await cartService.findByuserId(userId);
        const carts = await cartService.find();

        if (!carts) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        // console.log(carts)
        return res.json(carts);
    } catch (error) {
        return next(new ApiError(500, `Error adding item to cart: ${error.message}`));
    }
};

exports.addOrder = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const productService = new ProductService(MongoDB.client);
        const { userId,totalPrice, products, username, phone, address } = req.body;

        // let cart = await cartService.findByuserId({ userId: userId });
        // let order = await orderService.findByuserId({ 'products[0]._id': productId  });
        // console.log(order)

        //  const cartItem = {
        //     productId :productId,
        //     name: name,
        //     image:image,
        //     quantity:quantity,
        //     price :price,
        //     created_at: new Date(),
        // };

        
        // if (!order) {
           const neworder = await orderService.addOrder({
                userId,
                totalPrice,
                products, // Assuming `product` contains necessary information
                users: { username, phone, address},
            });
            return res.status(200).json({ success: true, data: neworder });

        // } else {
        // //     // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        //     const existingProduct = order.products.find(item => item.productId === productId);

        //     if (existingProduct) {
        //         // Nếu sản phẩm đã tồn tại, tăng số lượng
        //         existingProduct.quantity += quantity;
        //     } else {
        //         // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
        //         order.products.push({ productId, name, image, quantity, price });
        //     }

        //     // Cập nhật giỏ hàng
        //     await orderService.update(order._id, order);
        //     return res.status(200).json({ success: true, data: order });
        // }
    } catch (error) {
        return next(new ApiError(500, `Error adding item to cart: ${error.message}`));
    }
};