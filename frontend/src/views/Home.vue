<template>
    
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="../assets/anh-8.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="../assets/anh-9.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="../assets/anh-10.jpg" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>


      

      <Product :products="products" @click="addToCart(item)"/>
</template>

<script>
import Product from "../components/Product.vue";
import productService from "@/services/product.service";


export default{
    components: {
        Product,
    },
    data() {
      return {
        products: [],
      }

    },
    created() {
      this.retrieveProducts();
    },
    methods: {
      // goToAddUser() {
      //   this.$router.push({ name: "user.add" });
      // },
      async retrieveProducts() {
            try {
                this.products = await productService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        

    }

}
</script>

<style>
/* *{
    font-family: montsrrat;

} */
body{
    background: f1fbff;
}
.header{
  background: #F0EBD2;
}
.section-padding{
    padding: 20px 0;
}
#about{
  background-color:#F3F2EB ;
}



.about-product img{
  background-color:#EEECE2;
  width: 150px;
}

</style>