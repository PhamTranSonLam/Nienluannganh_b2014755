<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-3">
                <div class="bg-light text-center">
                    <h2>hello</h2>
                </div>
            </div>
            <div class="col-9">
                <div class="bg-light">
                    <table class="table">
                        <tbody>
                            <tr>
                                <th>Tên</th>
                                <td>{{ docgia.ten }}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{{ docgia.email }}</td>
                            </tr>
                            <tr>
                                <th>Số điện thoại</th>
                                <td>{{ docgia.phone }}</td>
                            </tr>
                            <tr>
                                <th>Địa chỉ</th>
                                <td>{{ docgia.diachi }}</td>
                            </tr>
                            <tr>
                                <th>Ngày tạo</th>
                                <td>{{ docgia.create_at }}</td>
                            </tr>
                             <button type="button" class="btn btn-success m-3" @click="editUser">Edit</button>
                        </tbody>
                    </table>
                </div>
               
            </div>
        </div>
    </div>
</template>

<script>
import DocgiaService from '../services/user.service';
// import { router } from '../router';


export default {
    
    data() {
        return {
            docgia: {} // Initialize user as an empty object
        };
    },
    created() {
        this.fetchUser();
    },
    methods: {
        async fetchUser() {
            try {
                this.docgia = await DocgiaService.get(this.$route.params.id);

            } catch (error) {
                console.log(error);
            }
        },
    }
}
</script>