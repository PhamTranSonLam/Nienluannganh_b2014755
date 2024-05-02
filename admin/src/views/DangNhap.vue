<template>
  <div class="container">
    <div class="row mt-3 mb-3">
      <div class="col-lg-4 bg-light m-auto rounded">
        <h2 class="text-center pt-3">Đăng Nhập</h2>
        <form @submit.prevent="loginUser">
          <div class="mb-3">
            <label class="form-label">Họ tên</label>
            <input type="text" class="form-control" v-model="nhanvien.username">
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" v-model="nhanvien.password">
          </div>
          <div class="d-grid">
            <button type="submit" class="btn btn-primary center">Submit</button>
            <p class="text-center">
              Already Have an Account? <router-link to="/users/Add">Register</router-link>
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

      const nhanvien = {
        username: '',
        password: '',
      };

      const message = '';

      const loginUser = async () => {
        try {
         const user = await UserService.login(nhanvien);
         useUserStore().setUser(user);
        console.log('thành công ');
        router.push('/'); 
        } catch (error) {
          console.log('lỗi');
          // this.message = 'Error creating user.';
        }
      };

      return {
        nhanvien,
        message,
        loginUser,
      };
    },
};
</script>
<!-- 

<template>

  <div class="container">
      <div class="row mt-5">
          <div class="col-lg-4 bg-light m-auto rounded">
              <h2 class="text-center pt-3">Đăng Nhập</h2>
              <form :user="user" @submit.user="addUser">
                  <div class="mb-3">
                      <label class="form-label">username</label>
                      <input type="text" class="form-control" >
                  </div>
                  <div class="mb-3">
                      <label class="form-label">Password</label>
                      <input type="password" class="form-control ">
                  </div>
                  <div class="d-grid">
                  <button type="submit" class="btn btn-primary center" >Submit</button>
                  <p class="text-center">
                      Already Have an Account ? <router-link to="/dangky"></router-link>

                  </p>
                  </div>
              </form>
              <p>{{ message }}</p>
          </div>
      </div>
  </div>

  
</template>
<script>
  export default {
      props: {
          id: { type: String, required: true },
      },
      data() {
          return {
              user: {},
              message: "",

          };
      },
      methods: {
          async addUser(data) {
              try {
                  await UserService.create(data);
                  console.log('thành công');

              } catch (error) {
                  console.log(error);
              }
          }
      }


  }
</script> -->