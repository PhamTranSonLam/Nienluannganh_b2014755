const { ObjectId } = require("mongodb");

class OrderService {
    constructor(client) {
        this.Order = client.db().collection("orders");
       
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractOrderData(payload) {
        const order = {
            userId: payload.userId,
            products:payload.products,
            users:payload.users,
            paidAt: new Date(),
            totalPrice: payload.totalPrice,
            orderStatus: payload.orderStatus,
        };
        
         
        //Remove undefined fields
        Object.keys(order).forEach(
            (key) => order[key] === undefined && delete order[key]
        );console.log('thành công')
        return order;
        
    }

    async create(payload) {
        const order = this.extractOrderData(payload);
        const result = await this.Order.findOneAndUpdate(
            order,
            { $set: { orderStatus: 'Đã mua'} },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Order.find(filter);
        return await cursor.toArray();
    }

    // async findByName(name) {
    //     return await this.find({
    //         name: { $regex: new RegExp(name), $options: "i"},
    //     });
    // }

    async findById(id) {
        return await this.Order.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async findByuserId(userId) {
        try {
            const order = await this.Order.findOne(userId);
            return order; // Trả về giỏ hàng nếu tìm thấy
        } catch (error) {
            console.error('Error finding cart by userId:', error);
            throw new Error(`Error finding cart by userId: ${error.message}`);
        }
    }
    async addOrder(payload) {
        const order = this.extractOrderData(payload);
        // const { userId, productId, name, image, quantity, price } = payload;
        const result = await this.Order.findOneAndUpdate(
            order,
            { $set: { orderStatus:'Đã mua' }},
            { returnDocument: "after", upsert: true }
        );
    
        console.log('thành công');
        return result.value;
    }

    // async findCartUser(userId) {
    //     try {
    //       // Sử dụng filter để tìm kiếm giỏ hàng của người dùng theo userId
    //       const filter = { userId: userId };
    //       // Sử dụng find để lấy danh sách giỏ hàng từ cơ sở dữ liệu
    //       const result = await this.Order.find(filter).toArray();
    //       return result;
    //     } catch (error) {
    //       console.log('Error finding cart for user:', error);
    //       throw new Error('Error finding cart for user');
    //     }
    //   }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractOrderData(payload);
        const result = await this.Order.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after"}
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Order.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    // async findFavorite() {
    //     return await this.find({ favorite: true });
    // }

    async deleteAll() {
        const result = await this.Order.deleteMany({});
        return result.deletedCount;
    }

}

module.exports = OrderService;