<template>
    <div class="mt-5 container">

        <!-- Search Input -->
        <div class="col-md-10 mb-3">
            <input-search v-model="searchText" />
        </div>
   


        <div class="card">
            <div class="card-header">
                <h4>
                    Khách Hàng
                    <router-link to="/users/usersAdd" class="btn btn-primary float-end">
                        Thêm Khách Hàng
                    </router-link>
                </h4>
            </div>
            <div class="card-body">
                <table class="table text-center ">
                    <thead class="table-warning">
                        <tr>
                        <th scope="col">STT</th>
                        
                        <th scope="col">Tên</th>
                       
                        <th scope="col">Email</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="displayedProducts.length === 0">
                            <tr>
                                <td colspan="8" class="text-center mt-3">You no users found.</td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr v-for="(user, index) in displayedProducts" :key="user._id">
                                <th scope="row">{{ index + 1 }}</th>
                                <td>{{ user.username }}</td>
                                <!-- <td>{{ user.holot }}</td> -->
                                <td>{{ user.email }}</td>
                                <!-- <td>{{ user.phai }}</td> -->
                                <td>{{ user.address }}</td>
                                <td>{{ user.phone }}</td>
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
import UserService from '@/services/user.service';
import InputSearch from '@/components/InputSearch.vue';

export default {
    components: {
        InputSearch
    },
    data() {
        return {
            users: [],
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
            if (!searchTerm) return this.users;
            return this.users.filter(user => {
                return (
                    user.username.toLowerCase().includes(searchTerm)
                    // user.dienthoai.toLowerCase().includes(searchTerm)
                );
            });
        },
    },
    methods: {
        async showUsers() {
            try {
                this.users = await UserService.getAll();
                this.displayedProducts = this.users;
            } catch (error) {
                console.log(error);
            }
        },
        async deleteUser(id) {
            if (confirm("Bạn muốn xóa sản phẩm này không ?")) {
                try {
                    await UserService.delete(id);
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
