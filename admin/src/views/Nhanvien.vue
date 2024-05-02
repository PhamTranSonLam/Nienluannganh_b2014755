<template>
    <div class="mt-5 container">

        <!-- Search Input -->
        <div class="col-md-10 mb-3">
            <input-search v-model="searchText" />
        </div>
   


        <div class="card">
            <div class="card-header">
                <h4>
                   Nhân Viên
                    <router-link to="/nhanvien/Add" class="btn btn-primary float-end">
                        Thêm Nhân Viên
                    </router-link>
                </h4>
            </div>
            <div class="card-body">
                <table class="table text-center ">
                    <thead class="table-warning">
                        <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên Nhân Viên</th>
                        <th scope="col">Chức Vụ</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="displayedProducts.length === 0">
                            <tr>
                                <td colspan="8" class="text-center mt-3">Không có nhân viên nào.</td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr v-for="(user, index) in displayedProducts" :key="user._id">
                                <th scope="row">{{ index + 1 }}</th>
                                <td>{{ user.hotennv }}</td>
                                <td>{{ user.chucvu }}</td>
                                <td>{{ user.dienthoai }}</td>
                                <td>{{ user.diachi }}</td>
                                <td>
                                    <router-link :to="{ name: 'chitiet', params: { id: user._id } }" class="btn btn-info">Chi tiết</router-link>
                                    <button type="button" class="btn btn-danger ml-3" @click="deleteUser(user._id)">Xóa</button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import NhanvienService from '@/services/nhanvien.service';
import InputSearch from '@/components/InputSearch.vue';

export default {
    components: {
        InputSearch
    },
    data() {
        return {
            nhanvien: [],
            searchText: '',
            displayedProducts: []
        };
    },
    created() {
        this.showUsers();
    },
    watch: {
        searchText() {
            this.displayedProducts = this.filteredProducts;
        },
    },
    computed: {
        filteredProducts() {
            const searchTerm = this.searchText.toLowerCase().trim();
            if (!searchTerm) return this.nhanvien;
            return this.nhanvien.filter(user => {
                return (
                    user.hotennv.toLowerCase().includes(searchTerm)
                    // user.dienthoai.toLowerCase().includes(searchTerm)
                );
            });
        },
    },
    methods: {
        async showUsers() {
            try {
                this.nhanvien = await NhanvienService.getAll();
                this.displayedProducts = this.nhanvien;
            } catch (error) {
                console.log(error);
            }
        },
        async deleteUser(id) {
            if (confirm("Bạn muốn xóa nhân viên này không ?")) {
                try {
                    await NhanvienService.delete(id);
                    // Reload the current page after successful deletion
                    // this.$router.go(); // Navigate back to the current page
                } catch (error) {
                    console.log(error);
                }
                this.showUsers();
            }
        }
    }
}
</script>
