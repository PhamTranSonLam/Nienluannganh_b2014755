<template>
  <section class="h-100 h-custom shadow rounded-3">
    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-7">
          <h1 class="text-danger m-3">GIỎ HÀNG</h1>

          <!-- Lặp qua danh sách giỏ hàng -->
          <div v-for="(cart, cartIndex) in filteredCarts" :key="cartIndex" class="card mb-3 shadow">
            <div class="card-body">
              <!-- <div v-for="(sach, sachIndex) in cart.sach" :key="sachIndex"> -->
                <div class="d-flex justify-content-between">
                  <div class="d-flex flex-row align-items-center">
                    <div>
                      <!-- Hiển thị hình ảnh -->
                      <img :src="cart.products.image" class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                    </div>
                    <div class="ms-3">
                      <!-- Hiển thị tên sách -->
                      <h5>{{ cart.products.name }}</h5>
                      <!-- Hiển thị giá -->
                      <p class="small mb-0 text-danger ">Giá: {{cart.products.price }}</p>
                      <!-- Hiển thị số lượng -->
                      <p class="small mb-0">Số lượng: {{ cart.products.quantity }}</p>
                      <!-- Hiển thị số lượng -->
                      <p class="small mb-0">Tổng tiền: {{ cart.products.price* cart.products.quantity * 1000}}</p>

                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center">
                    <!-- Nút xóa sách khỏi giỏ hàng -->
                    <button @click="deleteCart(cartIndex, sachIndex)" style="color: red;"><i class="fas fa-trash-alt"></i></button>
                  </div>
                </div>
              <!-- </div> -->
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <div class="me-auto mt-2">
              <!-- Nút tiếp tục mua sắm -->
              <router-link to="/products" class="btn btn-primary">Tiếp tục mua sắm</router-link>
            </div>
            <div class="">
              <!-- Nút tiến hành đặt hàng -->
              <button type="submit" class="btn btn-success m-2" @click="addOrder" >Tiến hành đặt hàng</button>
              <!-- Nút thanh toán qua VNPAY -->
              <button type="button" class="btn btn-warning m-2">Thanh toán qua VNPAY</button>
            </div>
          </div>
        </div>
        <div class="col-lg-5  rounded-1 shadow mt-3 text-dark bg-light" style=" font-size: 20px;">
          <h5 class="mt-3 text-center">Thông tin khách hàng</h5>
          <div clas="mt-3">
            <thongtin></thongtin>
            <p>Tổng tiền:  {{ formatNumber(total) }}</p>

                    <!-- <p>Giảm giá: </p>
                    <p>Phí vận chuyển:</p> -->
                    <!-- <p>Total: {{ formatNumber(total) }}</p> -->


                </div>
        </div>
      </div>
    </div>
  </section>
</template>





<script>
import CartService from "@/services/cart.service";
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';
import Thongtin from '../components/Thongtin.vue';

export default {
  components: { Thongtin },
  component: {
    Thongtin

  },
  data() {
    return {
      carts: [],
    };
  },
  created() {
    this.retrieveCarts();
  },
  computed: {

    // Tính tổng tiền cho tất cả sản phẩm trong giỏ hàng
    total() {
// Tính tổng giá bằng cách cộng giá từng sản phẩm ;
    
    let total = 0;
    for (const cart of this.filteredCarts) {
      
        total += cart.products.price * cart.products.quantity;
      
    }
    return total;
  },
    filteredCarts() {
      const userStore = useUserStore();
      const userId = userStore.userInfo ? userStore.userInfo.docgiaId : '';
      return this.carts.filter((cart) => cart.userId === userId);
      
    },
    // gọi tất cả các cart, ss id người đăng nhập = id đăng nhập cart , giống nhau gọi ra
  },
  methods: {
    // lấy thông tin giỏ hàng api bằng cartservice
    async retrieveCarts() {
  try {
  
    this.carts = await CartService.getAll();
    console.log('Carts fetched:', this.carts);
    
  } catch (error) {
    console.log('Lỗi khi lấy giỏ hàng');
  }

    },
    formatNumber(value) {
      const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
      });
      return formatter.format(value);
    },
    async deleteCart(cartIndex, sachIndex) {
    if (confirm("Bạn muốn xóa sách này khỏi giỏ hàng?")) {
        try {
            //  Xóa sản phẩm khỏi giỏ hàng và chỉ mục gói
            this.carts[cartIndex].sach.splice(sachIndex, 1);
            
            // Tùy chọn, bạn có thể cập nhật tổng số tại đây nếu cần
        } catch (error) {
            console.log(error);
        }
    }
  },
 
async addOrder() {
  try {
    //Thu thập thông tin người dùng
    const userStore = useUserStore();
    const userId = userStore.userInfo ? userStore.userInfo.docgiaId : "";
    const username = userStore.userInfo ? userStore.userInfo.ten : "";
    const phone = userStore.userInfo ? userStore.userInfo.dienthoai : "";
    const address = userStore.userInfo ? userStore.userInfo.diachi : "";

    

    // Khởi tạo một mảng để chứa tất cả các mục đơn hàng
    const orderItems = [];


    // Lặp lại các giỏ hàng đã lọc và tạo các mục đặt hàng
    for (const cart of this.filteredCarts) {
      const orderItem = {
        productId: cart.products.productId,
        name: cart.products.name,
        image: cart.products.image,
        quantity: cart.products.quantity,
        price: cart.products.price,
        
      };

      // Đẩy mục đơn hàng vào mảng orderItems
      orderItems.push(orderItem);
    }
    // sắp xếp lại đối tượng người dùng với các mục đặt hàng dưới dạng một mảng
    const user = {
      userId: userId,
      phone: phone,
      username: username,
      address: address,  // Include total price
      products: orderItems, // Array of order items
    };
    // // Push the order item to the orderItems array
   
    console.log(user); 

    // Gọi API để thêm tất cả các mục đơn hàng
    const response = await CartService.addOrder(user);

    // Kiểm tra phản hồi và hiển thị thông báo thích hợps
    if (response.success) {
      window.alert("Đặt hàng thành công!");
      // Clear the cart after successful order
      this.carts = [];
    } else {
      window.alert("Đã xảy ra lỗi khi đặt hàng.");
    }
  } catch (error) {
    console.log("Lỗi khi thêm đơn hàng:");
    window.alert("Đã xảy ra lỗi khi thêm đơn hàng.");
  }
}
  },
};
</script>
