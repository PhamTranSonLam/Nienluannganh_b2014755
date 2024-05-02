<template>
    <div class="" >
      <div class="row mt-3 mb-3">
        <div class="col-lg-4 bg-light m-auto rounded bg-light">
          <h2 class="text-center pt-3">Đăng Ký</h2>
          <form @submit.prevent="addUser">
            <div class="mb-3">
              <label class="form-label">Họ và tên</label>
              <input type="text" class="form-control"
               v-model="user.username">
            </div>
            <div class="mb-3">
              <label class="form-label">email</label>
              <input type="email" class="form-control"
               v-model="user.email">
            </div>
            <div class="mb-3">
              <label class="form-label">Số điện thoại</label>
              <input type="text" class="form-control"
               v-model="user.phone">
            </div>
            <div class="mb-3">
              <label class="form-label">Địa chỉ</label>
              <input type="text" class="form-control"
               v-model="user.address">
            </div>
            <div class="mb-3">
              <label class="form-label">Mật khẩu</label>
              <input type="password" class="form-control"
               v-model="user.password"> 
            </div>
            <div class="d-grid">
              <button type="submit" class="btn btn-primary center">Submit</button>
              <p class="text-center">
                Already Have an Account? <router-link to="/login">Login</router-link>
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

      const user = {
        username: '',
        email: '',
        phone: '',
        address: '',
        password: '',
      };

      const message = '';

      const addUser = async () => {
        try {
          await UserService.create(user);
          router.push('/login');
         this.message = 'User created successfully.';
        } catch (error) {
          console.log(error);
          this.message = 'Error creating user.';
        }
      };

      return {
        user,
        message,
        addUser,
      };
    },
  };
  </script>