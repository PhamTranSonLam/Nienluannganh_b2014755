<template>
    <div class="container shadow bg-white ">
      <form action="" method="post" @submit.prevent="updateOrderStatus">
        <h2 class="text-center pt-2">Chi tiết đơn hàng</h2>
        <p>Id khách hàng: {{ orders.userId }} </p>
        <p>Tên khách hàng: {{ orders.users.username }}</p>
        <p>Địa chỉ: {{ orders.users.address }}</p>
        <p>Email khách hàng: </p>
        <p>Ngày mua hàng: {{ orders.paidAt }} </p>
        <p>Số điện thoại: {{ orders.users.phone }}</p>
        <p>Tổng tiền: {{orders.totalPrice}}VND</p>
  
        <h3 class="text-center mb-3">Sản phẩm</h3>
        <table class="table">
          <thead class="table-dark text-white text-center">
            <tr>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr >
              <td>{{ orders.products.name }}</td>
              <td>{{ orders.products.quantity }}</td>
              <td>{{ orders.products.price }} VND</td>
            </tr>
          </tbody>
        </table>
  
        <div class="d-flex">
          <p>Trạng thái đơn hàng: </p>
          <div>
            <select name="status" id="status" v-model="orders.orderStatus">
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Đã hủy">Đã hủy</option>
              <option value="Đã giao">Đã giao</option>
            </select>
          </div>
        </div>

        <div class="d-flex">
  
            <button type="submit" class="btn btn-primary mb-2 mr-3">Cập nhật</button>
            <router-link to="/orders" class="btn btn-primary center text-white">Thoát</router-link>
        </div>
      </form>
  
  
    </div>
  </template>

<script>
import OrderService from '../services/order.service';
// import { router } from '../router';


export default {
    
    data() {
        return {
            orders: {} // Initialize user as an empty object
        };
    },
    created() {
        this.fetchUser();
    },
    methods: {
        async fetchUser() {
            try {
                this.orders = await OrderService.get(this.$route.params.id);

            } catch (error) {
                console.log(error);
            }
        },
        async updateOrderStatus() {
            try {
                const orderId = this.orders._id;
                const updatedData = {
                    orderStatus: this.orders.orderStatus
                };
                await OrderService.update(orderId, updatedData);
                alert("Đơn hàng đã được cập nhật thành công.");
                this.$router.push('/orders');
            } catch (error) {
                console.error('Lỗi khi cập nhật đơn hàng:', error);
                // Handle error gracefully, you can display an error message to the user
            }
        }
    }
}
</script>