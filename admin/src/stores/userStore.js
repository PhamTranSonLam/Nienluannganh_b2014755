import { defineStore } from 'pinia';
// import DocgiaService from '@/services/docgia.service'; 

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: null, // To store retrieved user information
      isLoggedIn: false, // To track login status
    };
  },
  actions: {
    // async login(docgia) {
    //   // Implement login logic using your DocgiaService
    //   // Assuming successful login, extract and store user information
    //   const userInfo = await DocgiaService.login(docgia);
    //   this.userInfo = userInfo;
    //   this.isLoggedIn = true;

    //   // Optionally, commit a mutation to update the state
    //   this.commit('setUser', userInfo);
    // },
     // Hành động để cập nhật thông tin người dùng sau khi đăng nhập
     setUser(user) {
      this.userInfo = user;
      this.isLoggedIn = true;
    },

    // Hành động để đăng xuất người dùng
    clearUser() {
      this.userInfo = null;
      this.isLoggedIn = false;
    },



    // logout() {
    //   // Clear user information and update login status
    //   this.userInfo = null;
    //   this.isLoggedIn = false;

    //   // Optionally, commit a mutation to update the state
    //   this.commit('clearUser');
    // },
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