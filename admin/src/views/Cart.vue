
<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-9">
                <h1 class="text-danger">GIỎ HÀNG</h1>

                <table class="table text-center">
                    <thead>
                        <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Đơn giá</th>
                        <th scope="col">Kích cỡ</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Xóa</th>
                       
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(cart, index) in carts" :key="cart._id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ cart.name }}</td>
                        <td>{{ cart.image }}</td>
                        <td>{{ cart.price }}</td>
                        <td></td>
                        <td>{{ cart.quantity }}</td>
                        <td> {{ formatNumber(cartTotalAmounts[index]) }}</td>
                        <td>
                            <button type="button" class="btn btn-danger" @click="deleteCart(cart._id)">Xóa</button>
                        </td>
                        </tr>
                       
                        <tr>
                            <td colspan="7" class="">Tổng giá:</td>
                            <td>{{ formatNumber(total) }}</td>
                        </tr>
                    </tbody> 
                    
                </table>

                <div class="d-flex justify-content-end">
                    <div class="me-auto mt-2">
                        <button type="button" class="btn btn-primary">Tiếp tục mua sắm</button>
                    </div>
                    <div class="">
                        <button type="button" class="btn btn-success m-2 ">Tiến hành đặt hàng</button>
                        <button type="button" class="btn btn-warning m-2">Thanh toán qua VNPAY</button>
                    </div>

                </div>
            </div>
            <div class="col-3 bg-light rounded-1 ">
                <h5 class="mt-3 text-center">Đơn hàng của bạn!</h5>
                <div clas="mt-3">
                    <p>Giảm giá:</p>
                    <p>Phí vận chuyển:</p>
                    <p>Total: {{ formatNumber(total) }}</p>


                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import CartService from "@/services/cart.service"

export default {
//   props: {
//     carts: { type: Array, default: [] },
//   },
data() {
      return {
        carts: [],
      }

    },
  created() {
    this.retrieveCarts();
  },
  computed: {
     // Tính toán tổng tiền cho từng sản phẩm
    cartTotalAmounts() {
        return this.carts.map(cart => cart.quantity * cart.price * 1000);
     },
    // Tính tổng tiền cho tất cả sản phẩm trong giỏ hàng
    total() {
        return this.cartTotalAmounts.reduce((total, amount) => total + amount, 0);
    }
  },
  methods: {
   
    async retrieveCarts() {
      try {
        this.carts = await CartService.getAll();
      } catch (error) {
        console.log('Error fetching carts:');
      }
    },
    // Hàm định dạng số với dấu chấm (.) để phân tách hàng nghìn
    formatNumber(value) {
        const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        });
        return formatter.format(value);
    },

    async deleteCart(cartId) {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await CartService.delete(cartId);

                    this.retrieveCarts();
                    // Load lại trang hiện tại sau khi xóa thành công
                    // this.$router.go(); // Điều hướng trang lại về trang hiện tại
                  
                } catch (error) {
                    console.log(error);
                }
            }
        },
  },
};
</script>