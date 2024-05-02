<template>
    <div class="container-fluid">
    <div class="row">
      <!-- Sidebar -->
      <div class="col-sm-3 mt-5">
        <h4 class="mb-4">Danh Mục</h4>
        <div class="list-group" v-for="(item, index) in category" :key="item._id">
          <a href="#" class="list-group-item list-group-item-action"  @click="findCategory(item)">{{ item.name }}</a>
        </div>
      </div>

      <!-- Main Content -->
      <div class="col-sm-9">
        <Product :products="products"  @click="addToCart(products)"/>
      </div>
    </div>
  </div>
</template>

<script>
import Product from "@/components/Product.vue";
import productService from "@/services/product.service";
import InputSearch from '../components/InputSearch.vue';
import categoryService from '@/services/category.service';
export default {
    components: {
        Product,
        InputSearch,
       
    },
    data() {
        return {
            products: [],
            category: [],
            selectCategoryId: null,
            cart: [],
            // activeIndex: -1,
            // searchText: "",
        };
    },
    created() {
        this.retrieveProducts();
        this.retrieveCategory();
        
    },
    methods: {
        async retrieveProducts() {
            try {
                this.products = await productService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveCategory() {
            try {
                this.category = await categoryService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

    },
   

}
</script>

<style scoped>
.container-fluid {
  padding: 20px 0;
}

.list-group-item-action {
  cursor: pointer;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.card-text {
  color: #777;
}

.btn-dark {
  width: 100%;
}
</style>

<!-- <style scoped>
.container-fluid {
  padding: 20px 0;
}

.list-group-item-action {
  cursor: pointer;
}

.mb-4 {
  margin-bottom: 1.5rem;
}
</style> -->