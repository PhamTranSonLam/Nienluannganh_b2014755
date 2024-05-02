import { defineStore } from 'pinia';
// import DocgiaService from '@/services/user.service'; 

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: null, // To store retrieved user information
      isLoggedIn: false, // To track login status
    };
  },
  actions: {
     setUser(user) {
      this.userInfo = user;
      this.isLoggedIn = true;
    },

    // Hành động để đăng xuất người dùng
    clearUser() {
      this.userInfo = null;
      this.isLoggedIn = false;
    },
  },
  mutations: {
    setUser(userInfo) {
      this.userInfo = userInfo;
    },
    clearUser() {
      this.userInfo = null;
      this.isLoggedIn = false;
    },
  },
});