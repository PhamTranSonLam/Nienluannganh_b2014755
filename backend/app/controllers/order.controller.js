const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const OrderService = require("../services/order.service");

// Create and Save a new Contact
exports.create = async (req, res, next) => {
    // if (!req.body?.user) {
    //     return next(new ApiError(400, "Name can not be empty"));
    
    // }
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.create(req.body);
        res.status(200).json(document); 
        // return res.send(document);

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const orderService = new OrderService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await orderService.findByName(name);
        } else {
            documents = await orderService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.update(req.params.id, req.body);
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
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.delete(req.params.id);
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
};
exports.findOne = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.findById(req.params.id);
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