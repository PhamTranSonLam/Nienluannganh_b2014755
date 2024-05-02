<template>
    <div class="" >
      <div class="row mt-3 mb-3">
        <div class="col-lg-4 bg-light m-auto rounded bg-light">
          <h2 class="text-center pt-3">Thông tin tài khoản</h2>
          <form @submit.prevent="addUser">
            <div class="mb-3">
              <label class="form-label">Họ và tên</label>
              <input type="text" class="form-control"
               v-model="users.username">
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="text" class="form-control"
               v-model="users.email">
            </div>
            <div class="mb-3">
              <label class="form-label">Số điện thoại</label>
              <input type="text" class="form-control"
               v-model="users.phone">
            </div>
            <div class="mb-3">
              <label class="form-label">Địa chỉ</label>
              <input type="text" class="form-control"
               v-model="users.address">
            </div>

            <div class="d-grid">
                <router-link to="/" class="btn btn-dark">Quay lại</router-link>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  </template>
  
  <script>
import UserService from '@/services/user.service';

export default {
    data() {
        return {
            users: [], // Đổi từ mảng products thành đối tượng product
        };
    },
    created() {
        this.showProduct(); // Gọi phương thức showProduct khi component được tạo
    },
    methods: {
        async showProduct() {
            try {
                // const productId = 'your_product_id'; // Thay 'your_product_id' bằng id sản phẩm cần hiển thị
                this.users = await UserService.get(this.$route.params.id); // Lưu thông tin sản phẩm vào biến product
            } catch (error) {
                console.log("Lỗi khi lấy dữ liệu sản phẩm");
            }
        },
       
    },
}
</script>
