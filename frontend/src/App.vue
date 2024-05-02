<script>
import ContactBook from './views/ContactBook.vue'
import Home from './views/Home.vue';
import AppHeader from "@/components/AppHeader.vue";
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import SanPham from './views/SanPham.vue';
import Product from './components/Product.vue';
import Cart from './views/Cart.vue';
export default {
  components: { 
    ContactBook,
  AppHeader,
  TheHeader,
  TheFooter,
  Home,
  SanPham,
  Product,
  Cart,

 },

};

</script>


<template>
  <div id="app">
      <!-- <AppHeader /> -->
      <TheHeader/>

      <div class="container">
            <router-view />
            
      </div>

      <TheFooter/>
  </div>
</template>


<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
