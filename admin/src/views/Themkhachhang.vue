<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-lg-4 bg-light m-auto rounded">
        <h2 class="text-center pt-3">Thêm khách hàng</h2>
        <form @submit.prevent="addUser">
          <div class="mb-3">
            <label class="form-label">Họ và tên</label>
            <input type="text" class="form-control"
             v-model="nhanvien.username">
          </div>
          <div class="mb-3">
            <label class="form-label">Eamil</label>
            <input type="text" class="form-control"
             v-model="nhanvien.email">
          </div>
          <div class="mb-3">
            <label class="form-label">Số điện thoại</label>
            <input type="text" class="form-control"
             v-model="nhanvien.phone">
          </div>
          <div class="mb-3">
            <label class="form-label">Địa chỉ</label>
            <input type="text" class="form-control"
             v-model="nhanvien.address">
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control"
             v-model="nhanvien.password">
          </div>
          <div class="d-grid">
            <button type="submit" class="btn btn-primary center">Submit</button>
            <p class="text-center">
              Already Have an Account? <router-link to="/users/login">Login</router-link>
            </p>
          </div>
        </form>
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import UserService from '@/services/user.service'; // Import your UserService
  import { useRouter } from 'vue-router';

  export default {
  setup() {
    const router = useRouter();

    const nhanvien = {
      username: '',
      email: '',
      phone: '',
      address: '',
      password: '',
    };

    const message = '';

    const addUser = async () => {
      try {
        await UserService.createusers(nhanvien);
        router.push('/users');
        message.valueOf = 'User created successfully.';
      } catch (error) {
        console.log(error);
        message.valueOf = 'Error creating user.';
      }
    };

    return {
      nhanvien,
      message,
      addUser,
    };
  },
};
</script>