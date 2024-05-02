<template>
    <div class=" bg-light">
      <div class="row">
        <div class="col-lg-4 mt-3 bg-white m-auto rounded">
          <h2 class="text-center pt-3 mb-3">Thêm Nhân Viên</h2>
          <form @submit.prevent="addNhanvien(nhanvien)">
            <div class="mb-3">
              <label class="form-label">Tên nhân viên</label>
              <input type="text" class="form-control"
                v-model="nhanvien.hotennv">
            </div>
            <div class="mb-3">
              <label class="form-label">Chức vụ</label>
              <input type="text" class="form-control"
                v-model="nhanvien.chucvu">
            </div>
            
            <div class="mb-3">
              <label class="form-label">Địa chỉ</label>
              <input type="text" class="form-control"
                v-model="nhanvien.diachi">
            </div>
           
            <div class="mb-3">
              <label class="form-label">Số điện thoại</label>
              <input type="number" class="form-control"
                    v-model="nhanvien.dienthoai">
            </div>
            <div class="d-flex">
                <router-link to="/nhanvien" class="btn btn-primary center text-white">Thoát</router-link>

                <button type="submit" class="btn btn-primary center ml-3">Tạo</button>
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
import NhanvienService from '../services/nhanvien.service';

export default {
    data() {
        return {
        nhanvien: {
            hotennv: '',
            chucvu:'',
            diachi: '',
            dienthoai: '', 
        }
        };
    },
    methods: {
    async addNhanvien(data) {
            try {
                await NhanvienService.create(data);
                alert("Nhân viên đã thêm vào thành công.");
                // this.message = "Sản Phẩm đã thêm vào thành công.";
                this.resetForm(); 
                 // Redirect to another page
                 this.$router.push('/nhanvien'); // Assuming '/sach' is the route you want to redirect to
            } catch (error) {
                console.log('lỗi');
            }
        },
        //         handleImageChange(event) {
        //   const file = event.target.files[0];
          
        //   // Check if a file was selected
        //   if (!file) {
        //     return;
        //   }

        //   // Create a FileReader to read the selected file
        //   const reader = new FileReader();

        //   // When the FileReader loads the file
        //   reader.onload = () => {
        //     const img = new Image();

        //     // When the image loads
        //     img.onload = () => {
        //       const canvas = document.createElement('canvas');
        //       const ctx = canvas.getContext('2d');

        //       // Define the maximum dimensions for the resized image
        //       const maxWidth = 800; // Adjust as needed
        //       const maxHeight = 600; // Adjust as needed

        //       // Calculate the new dimensions while maintaining aspect ratio
        //       let newWidth = img.width;
        //       let newHeight = img.height;
        //       if (newWidth > maxWidth) {
        //         newHeight *= maxWidth / newWidth;
        //         newWidth = maxWidth;
        //       }
        //       if (newHeight > maxHeight) {
        //         newWidth *= maxHeight / newHeight;
        //         newHeight = maxHeight;
        //       }

        //       // Set the canvas dimensions
        //       canvas.width = newWidth;
        //       canvas.height = newHeight;

        //       // Draw the image onto the canvas with the new dimensions
        //       ctx.drawImage(img, 0, 0, newWidth, newHeight);

        //       // Convert the canvas content to a data URL
        //       const resizedDataURL = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality as needed

        //       // Set the resized image data URL to the item.image property
        //       this.item.image = resizedDataURL;
        //     };

        //     // Set the source of the image to the file data
        //     img.src = reader.result;
        //   };

        //   // Read the selected file as a data URL
        //   reader.readAsDataURL(file);
        // },
    // handleImageChange(event) {
    //   const file = event.target.files[0];
    //   // Đọc dữ liệu của file hình ảnh và lưu vào thuộc tính image của product
    //   if (file) {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //       this.item.image = reader.result;
    //     };
    //   }
    // },
    resetForm() {
      // Đặt lại giá trị của các trường trong product
      this.nhanvien.hotennv = '';
      this.nhanvien.chucvu = '';
      this.nhanvien.diachi = '';
      this.nhanvien.dienthoai = '';
    }
  }
}
</script>