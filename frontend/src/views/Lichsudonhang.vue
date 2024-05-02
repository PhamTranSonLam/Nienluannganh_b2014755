<template>
  <section class="order-details shadow rounded-3 p-4 m-3">
    <div class="container">
      <h2 class="mt-3 mb-4">Đơn hàng của bạn</h2>
      <p>Kiểm tra trạng thái, quản lý trả lại, và khám phá sản phẩm tương tự.</p>

      <div v-for="(order, orderIndex) in filteredCarts" :key="orderIndex">
        <div class="order-item mb-4" >
          <div class="order-header d-flex justify-content-between align-items-center">
            <div>
              <h6 class="mb-1">Đơn hàng #{{ order.products.productId }}</h6>
              <p class="text-muted mb-0">
                Mua vào {{ order.paidAt }}
              </p>
            </div>
            <div class="d-flex">
              <a href="#" class="me-3">Quản lý đơn hàng</a>
              <a href="#">Xem hóa đơn</a>
            </div>
          </div>

          <hr />

          <div class="order-details-list">
            <div >
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                  <img
                    src="../assets/images/product-placeholder.png"
                    alt="Product Image"
                    style="width: 50px;"
                    class="me-3"
                  />
                  <div>
                    <h6 class="mb-1">{{ order.products.name }}</h6>
                    <p class="text-muted mb-0">{{ order.products.price }}</p>
                  </div>
                </div>
                <div class="quantity-actions">
                  <span class="badge bg-light text-dark me-2">{{ order.products.quantity }}</span>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div class="order-footer d-flex justify-content-between align-items-center">
            <div>
              <p class="text-danger mb-0 ">Trạng thái: {{ order.orderStatus }}</p>
            </div>
            <div class="d-flex">
              <button class="btn btn-primary me-2">Mua lại</button>
              <button class="btn btn-primary">Mua sắm tương tự</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import OrderService from "@/services/order.service";
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';
// import Thongtin from '../components/Thongtin.vue';

export default {
  components: {},
  component: {
    

  },
  data() {
    return {
      orders: [],
    };
  },
  created() {
    this.retrieveCarts();
  },
  computed: { 
    filteredCarts() {
      const userStore = useUserStore();
      const userId = userStore.userInfo ? userStore.userInfo.docgiaId : '';
      return this.orders.filter((order) => order.userId === userId);
      
    },
    
  },
    
  methods: {
    async retrieveCarts() {
  try {
  
    this.orders = await OrderService.getAll();
    console.log('Carts fetched:', this.orders);
    
  } catch (error) {
    console.log('Lỗi khi lấy giỏ hàng');
  }

    },
  },
};
</script>

  