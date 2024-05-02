<template>
    <div class=" bg-light">
      <div class="row">
        <div class="col-lg-4 mt-3 bg-white m-auto rounded">
          <h2 class="text-center pt-3 mb-3">Chỉnh sửa sách</h2>
          <form @submit.prevent="updateProduct(item) ">
            <div class="mb-3">
              <label class="form-label">Tên sản phẩm</label>
              <input type="text" class="form-control"
                v-model="item.name">
            </div>
            <div class="mb-3">
              <label class="form-label">Thông tin sản phẩm</label>
              <input type="text" class="form-control"
                v-model="item.description">
            </div>
            <div class="mb-3">
              <label class="form-label">Giá tiền</label>
              <input type="text" class="form-control"
                v-model="item.price">
            </div>
            
            <div class="mb-3">
              <label class="form-label">Số lượng</label>
              <input type="number" class="form-control"
                v-model="item.quantity">
               
            </div>
            <div class="mb-3">
              <label class="form-label">Danh mục</label>
              <input type="text" class="form-control"
                v-model="item.category">
            </div>
           
            <div class="mb-3">
              <label class="form-label">Hình ảnh</label>
              <input type="file" class="form-control"  @change="handleImageChange">
            </div>
            <div class="d-flex">
                <router-link to="/products" class="btn btn-primary center text-white">Thoát</router-link>

                <button type="submit" class="btn btn-primary center ml-3">Lưu</button>
              <!-- <p class="text-center">
                Already Have an Account? <router-link to="/users/login">Login</router-link>
              </p> -->
            </div>
          </form>
          <p></p>
        </div>
      </div>
    </div>
   
</template>

<script>
import ProductService from '../services/product.service';
// import { router } from '../router';


export default {
    data() {
        
        return {
        item: {
            name: '',
            description: '',
            price: '',
            quantity: '',
            category: '',
            image: null // Chỉ định image là null ban đầu
        }
        };
    },
    
    created() {
    this.showProduct();
    },
    methods: {
        async showProduct() {
            try {
                this.item = await ProductService.get(this.$route.params.id);

            } catch (error) {
                console.log(error);
            }
        },
    async updateProduct(data) {
            try {
                await ProductService.update(this.item._id, data);
                alert("Sản Phẩm đã chỉnh sửa thành công.");
                // this.message = "Sản Phẩm đã sửa thành công.";
                this.$router.push('/products'); // Assuming '/sach' is the route you want to redirect to
            } catch (error) {
                console.log('lỗi');
            }
        },
        handleImageChange(event) {
          const file = event.target.files[0];
          
          // Check if a file was selected
          if (!file) {
            return;
          }

          // Create a FileReader to read the selected file
          const reader = new FileReader();

          // When the FileReader loads the file
          reader.onload = () => {
            const img = new Image();

            // When the image loads
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              // Define the maximum dimensions for the resized image
              const maxWidth = 800; // Adjust as needed
              const maxHeight = 600; // Adjust as needed

              // Calculate the new dimensions while maintaining aspect ratio
              let newWidth = img.width;
              let newHeight = img.height;
              if (newWidth > maxWidth) {
                newHeight *= maxWidth / newWidth;
                newWidth = maxWidth;
              }
              if (newHeight > maxHeight) {
                newWidth *= maxHeight / newHeight;
                newHeight = maxHeight;
              }

              // Set the canvas dimensions
              canvas.width = newWidth;
              canvas.height = newHeight;

              // Draw the image onto the canvas with the new dimensions
              ctx.drawImage(img, 0, 0, newWidth, newHeight);

              // Convert the canvas content to a data URL
              const resizedDataURL = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality as needed

              // Set the resized image data URL to the item.image property
              this.item.image = resizedDataURL;
            };

            // Set the source of the image to the file data
            img.src = reader.result;
          };

          // Read the selected file as a data URL
          reader.readAsDataURL(file);
        },
    resetForm() {
      // Đặt lại giá trị của các trường trong product
      this.item.name = '';
      this.item.description = '';
      this.item.price = '';
      this.item.quantity = '';
      this.item.category = '';
      this.item.image = null;
    }
  }
}
</script>