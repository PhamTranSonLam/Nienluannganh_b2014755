<template>
    <div class="container mt-5 mb-5 ">
        <div class="row">
            <div class="col-6 bg-light">
                <img class="anh" src="../assets/bundle_set_cb36_f20b396bb9a74ea2a87f5ad6567d3b5b_master.webp" alt="">
            </div>
            <div class="col-6 ">
                <div>
                    <h2>{{ product.name }}</h2>
                    <p>Mã sản phẩm: BTPTB 351-14k<br>
                        Thiết kế đọc quyền từ hàn quốc
                    </p>
                    <p class="text-warning">Kho hàng: 99 / Đã bán: 0</p>
                    <h1>{{ product.price }} VND</h1>

                    <div class="d-flex">
                        <div>
                            <input class="number" type="number" name="" id="" min="1" max="10" placeholder="Số lượng" required step="1">
                        </div>
                        <select name="size" id="size">
                            <option value="small">S</option>
                            <option value="medium">M</option>
                            <option value="large">L</option>
                        </select>
                        
                        
                    </div>

                    <button type="button" class="btn btn-success mt-3">Thêm vào giỏ hàng</button>
                </div>

            </div>
        </div>


    </div>
</template>

<script>
import ProductService from '@/services/product.service';

export default {
    data() {
        return {
            product: [], // Đổi từ mảng products thành đối tượng product
        };
    },
    created() {
        this.showProduct(); // Gọi phương thức showProduct khi component được tạo
    },
    methods: {
        async showProduct() {
            try {
                // const productId = 'your_product_id'; // Thay 'your_product_id' bằng id sản phẩm cần hiển thị
                this.product = await ProductService.get(this.$route.params.id); // Lưu thông tin sản phẩm vào biến product
            } catch (error) {
                console.log("Lỗi khi lấy dữ liệu sản phẩm");
            }
        },
        addToCart() {
            // Thực hiện logic thêm sản phẩm vào giỏ hàng ở đây
            console.log("Thêm sản phẩm vào giỏ hàng");
            console.log("ID sản phẩm:", this.product.id);
        },
    },
    filters: {
        formatCurrency(value) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            });
            return formatter.format(value);
        },
    },
}
</script>



<style scoped>

.d-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.number {
    width: 100px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

select {
    width: 120px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.anh{
    width:350px;
}

</style>