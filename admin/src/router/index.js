import { createWebHashHistory, createRouter } from "vue-router";

import Home from "@/views/Home.vue";

const routes = [
    // {
    //     path: "/",
    //     name: "contactbook",
    //     component: ContactBook,
    // },
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    // {
    //     path: "/contacts/:id",
    //     name: "contact.edit",
    //     component: () => import("@/views/ContactEdit.vue"),
    //     props: true // Truyền các biến trong $route.params vào làm props
    // },
    // {
    //     path: "/contacts/",
    //     name: "contact.add",
    //     component: () => import("@/views/ContactAdd.vue"),
    // },
    {
        path: "/users/add",
        name: "",
        component: () => import("@/views/DangKy.vue"),
    },
    {
        path: "/users/login",
        component: () => import("@/views/DangNhap.vue"),
    },
    {
        path: "/products/",
       component: () => import("@/views/SanPham.vue"),
    },
    {
        path: "/products/:id",
        name: "editProduct",
       component: () => import("@/views/EditProduct.vue"),
    },
    {
        path: "/products/Add",
       component: () => import("@/views/ProductAdd.vue"),
    },
    {
        path: "/users",
       component: () => import("@/views/KhachHang.vue"),
    },
    {
        path: "/docgia/:id",
        name: "chitiet",
       component: () => import("@/views/DetailUser.vue"),
    },
    {
        path: "/users/usersAdd",
       component: () => import("@/views/Themkhachhang.vue"),
    },
    {
        path: "/nhanvien",
       component: () => import("@/views/Nhanvien.vue"),
    },
    {
        path: "/nhanvien/Add",
       component: () => import("@/views/NhanvienAdd.vue"),
    },

    {
        path: "/carts",
        component: () => import("@/views/Cart.vue"),

    },
    {
        path: "/orders",
        component: () => import("@/views/Order.vue"),

    },
    {
        path: "/orders/:id",
        name: "editOrders",
       component: () => import("@/views/EditOrder.vue"),
    },
   
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;