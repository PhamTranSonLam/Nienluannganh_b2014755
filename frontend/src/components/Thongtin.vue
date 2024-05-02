<template>
    <p class="mt-3">Tên khách hàng: <input type="text" v-model="username"></p>
    <p class="mt-3" >Số điện thoại: <input type="text" v-model="dienthoai"></p>
    <p class="mt-3" >Địa chỉ: <input type="text" v-model="diachi"></p>
</template>
<script>
import { computed } from 'vue';
import { useUserStore } from '../stores/userStore';

export default {
  setup() {
    const userStore = useUserStore();

    // Sử dụng computed để lấy giá trị isLoggedIn từ store
    const isLoggedIn = computed(() => userStore.isLoggedIn);// kiểm tra thông tin người dùng đã đăng nhập chưa.
    const userInfo = computed(() => userStore.userInfo); // láy thông tin
    const username = computed(() => userInfo.value ? userInfo.value.ten : null);
    const diachi = computed(() => userInfo.value ? userInfo.value.diachi : null);
    const email = computed(() => userInfo.value ? userInfo.value.email : null);
    const dienthoai = computed(() => userInfo.value ? userInfo.value.dienthoai : null);


    // Define the method to logout the user
    const logout = () => {
      userStore.clearUser(); // Call the logout method from the user store
    };

    return {
      isLoggedIn,
      username,
      diachi,
      email,
      dienthoai,
      logout,
    };
  }
};

</script>