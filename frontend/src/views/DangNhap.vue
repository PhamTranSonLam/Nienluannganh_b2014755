<template>
  <div class="container">
    <div class="row mt-3 mb-3">
      <div class="col-lg-4 bg-light m-auto rounded">
        <h2 class="text-center pt-3">Đăng Nhập</h2>
        <form @submit.prevent="loginUser">
          <div class="mb-3">
            <label class="form-label">Username</label>
            <input type="text" class="form-control" v-model="userdata.username">
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" v-model="userdata.password">
          </div>
          <div class="d-grid">
            <button type="submit" class="btn btn-primary center">Submit</button>
            <p class="text-center">
              Already Have an Account? <router-link to="/register/">Register</router-link>
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
import { useUserStore } from '../stores/userStore';
import axios from 'axios'; // Import axios for making HTTP requests

export default {
  setup() {
      const router = useRouter();
      const userStore = useUserStore();

      const userdata = {
        username: '',
        password: '',
      };

      const message = '';

      const loginUser = async () => {
        try {
         const user = await UserService.login(userdata);
         useUserStore().setUser(user);
        console.log('thành công ');
        router.push('/'); 
        } catch (error) {
          console.log('lỗi');
        }
      };

      return {
        userdata,
        message,
        loginUser,
      };
    },
};
</script>
