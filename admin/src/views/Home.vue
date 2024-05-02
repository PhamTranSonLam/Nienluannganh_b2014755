
 <style>
    /******** trang chủ ****/
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");
    .card--container{
        background: #fff;
        padding: 2rem;
        border-radius: 10px;
    }

    .card--wrapper{
        display: flex;
        flex-wrap: wrap;
        gap:1rem;
    }
    .main--title{
        color: rgba(113, 99, 186, 255);
        padding-top: 10px;
        font-size: 15px;
    }

    .payment--card{
        background: rgb(229, 223,223);
        border-radius:10px;
        padding: 1.2rem;
        width: 290px;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: all 0.5s ease-in-out;

    }

    .payment-card:hover{
        transform: translateY(-5px);
    }
    .card--header{
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        align-items: center;
        margin-bottom:20px;
        

    }
    .amount{
        display: flex;
        flex-direction: column;
    }
    .title{
        font-size: 20px;
        font-weight: 200;
    }

    .amount--value{
        font-size: 24px;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
    }

    .icon{
        color: #fff;
        padding: 1rem;
        height: 60px;
        width: 60px;
        text-align: center;
        border-radius: 50%;
        font-size: 1.5rem;
        background: red;
    }

    .light-red{
        background: rgb(251,233,233);
    }
    .light-purple{
        background: rgb(254,226,254);
    }
    .light-green{
        background: rgb(235,254,235);
    }
    .light-blue{
        background: rgb(236,236,254);
    }
    .dark-red{
        background: red;
    }
    .dark-purple{
        background: rgb(11, 128, 0);
    }
    .dark-green{
        background: green;
    }
    .dark-blue{
        background: blue;
    }

</style>
<template>
<div class="card--container">
    <h3 class="main--title">Today</h3>
    <div class="card--wrapper">
        <div class="payment--card light-red">
            <div class="card--header">
                <div class="amount">
                    <span class="title">
                        Sản Phẩm
                    </span>
                    <span class="amount--value">{{ totalProduct }}</span>
                </div>
                <i class="fa-solid fa-calendar-days icon"></i>
            </div>
            <span class="card--detail"></span>
        </div>

        <div class="payment--card light-purple">
            <div class="card--header">
                <div class="amount">
                    <span class="title">
                      Đơn Hàng
                    </span>
                    <span class="amount--value"></span>
                </div>
                <i class="fa-regular fa-clipboard icon dark-purple"></i>
            </div>
            <span class="card--detail"></span>
        </div>

        <div class="payment--card light-green">
            <div class="card--header">
                <div class="amount">
                    <span class="title">
                       Khách Hàng
                    </span>
                    <span class="amount--value">{{ totalDocgia }}</span>
                </div>
                <i class="fa-regular fa-address-book icon dark-green"></i>
            </div>
            <span class="card--detail"></span>
        </div>

        <div class="payment--card light-blue">
            <div class="card--header">
                <div class="amount">
                    <span class="title">
                        Nhân viên
                    </span>
                    <span class="amount--value"></span>
                </div>
                <i class="fas fa-question-circle icon dark-blue"></i>
            </div>
            <span class="card--detail"></span>
        </div>
    </div>
</div>

</template>

<script>
import ProductService from "../services/product.service";
import UserService from "../services/user.service";
// import NhanvienService from "../services/nhanvien.service"

export default {
  data() {
    return {
      products: [], // Thêm mảng products vào data
      users: [], // Thêm mảng products vào data
      // nhanvien: [] // Thêm mảng products vào data
    };
  },
  created() {
    this.getProducts(); // Gọi phương thức getProducts() khi component được tạo
    this.getDocgia();;
    // this.getNhanvien();
  },
  methods: {
    async getProducts() {
      try {
        this.products = await ProductService.getAll(); // Lấy danh sách sản phẩm từ service và cập nhật vào products
      } catch (error) {
        console.log('lỗi');
      }
    },
    async getDocgia() {
      try {
        this.users = await UserService.getAll(); // Lấy danh sách sản phẩm từ service và cập nhật vào products
      } catch (error) {
        console.log('lỗi');
      }
    },
    // async getNhanvien() {
    //   try {
    //     this.nhanvien = await NhanvienService.getAll(); // Lấy danh sách sản phẩm từ service và cập nhật vào products
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
  computed: {
    totalProduct() {
      // Tính tổng số sản phẩm từ mảng products
      // return this.products.reduce((total, product) => total + product.amount, 0);
      return this.products.length;
    },
    totalDocgia() {
      // Tính tổng số sản phẩm từ mảng products
      // return this.products.reduce((total, product) => total + product.amount, 0);
      return this.users.length;
    },
    // totalNhanvien() {
    //   // Tính tổng số sản phẩm từ mảng products
    //   // return this.products.reduce((total, product) => total + product.amount, 0);
    //   return this.nhanvien.length;
    // },
  }
}
</script>