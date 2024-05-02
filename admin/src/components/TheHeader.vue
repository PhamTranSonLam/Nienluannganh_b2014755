<template>
 
    <div class="sidebar">
        <div class="logo"></div>
            <ul class="menu">
                <li class="active">
                    <a href="#" >
                        <i class="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li>
                      <a href="">
                      <i class="fas fa-house"></i>
                        <span><router-link class="" to="/">Trang Chủ</router-link></span>
                  </a>
                  
                </li>
                <li>
                    <a href="">
                    <i class="fa-solid fa-calendar-days"></i>
                        <span><router-link class="" to="/products">Quản lý sản phẩm</router-link></span>
                    </a>
                </li>
                <li>
                    <a href="">
                      <i class="fa-regular fa-clipboard"></i>
                      <span><router-link class="" to="/orders">Quản lý đơn hàng</router-link></span>
                    </a>
                </li>
                <li>
                    <a href="">
                    <i class="fa-solid fa-calendar-days"></i>
                        <span><router-link class="" to="/users">Quản lý khách hàng</router-link></span>
                    </a>
                </li>
                <li>
                    <a href="">
                    <i class="fa-solid fa-calendar-days"></i>
                        <span><router-link class="" to="/">Quản lý Nhân Viên</router-link></span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <i class="fas fa-question-circle"></i>
                        <span>FAQ</span>
                    </a>
                </li>
                
                <li class="logout">
                    <a href="" >
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </a>
                </li>
            </ul>
    </div>   
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");

*{
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    font-family: "Poppins", sans-serif;
   
}
.sidebar{
    position: sticky;
    top:0;
    left: 0;
    bottom: 0;
    width: 110px;
    height: 100vh;
    padding: 0 1.7rem;
    color: #ffffff;
    overflow: hidden;
    transition: all 0.5s linear;
    background: green;

}
.sidebar:hover{
    width: 240px;
    transition: 0.5s;
}
.logo{
    height: 80px;
    padding: 16px;
}
.menu{
    height: 88%;
    position: relative;
    list-style: none;
    padding: 0;
}
.menu li{
    padding: 1rem;
    margin: 8px 0;
    border-radius: 8px;
    transition: all 0.5s ease-in-out;
}
.menu li:hover, .active{
    background: #e0e0e058;
}
.menu a {
    color: #fff;
    font-size: 14px;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 1.5rem;
}
.menu a span{
    overflow: hidden;
}
.menu a i{
    font-size: 1.2rem;
}
.logout{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
}



/***main body**/
.main--content{
    position: relative;
    background: #e9eaeb;
    width: 100%;
    padding: 1rem;
}
.header--wrapper img{
    width: 50px;
    height: 50px;
    cursor: pointer;
    border-radius: 50%;

}
.header--wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    background: #fff;
    border-radius: 10px;
    padding: 10px 2rem;
    margin-bottom: 1rem;
}
.header--title{
    color: rgb(113,99,186,255);
}
.user--info{
    display: flex;
    align-items: center;
    gap: 1rem;
}
.user--info p{
    margin-bottom: 0;
}
.searh--box{
    background: rgb(237, 237,237);
    border-radius: 15px;
    color: rgb(113,99,186,255);
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 4px 12px;
}
.searh--box input{
    background: transparent;
    padding: 10px;

}
.searh--box i{
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
}
.searh--box i:hover{
    transform: scale(1.2);
}

/******** trang chủ ****/
</style>