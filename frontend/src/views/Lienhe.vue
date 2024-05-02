<template>
     <!---contact-->
     <div class="container">
        <h1 class="text">Liên hệ với chúng tôi</h1>
        <p>Chúng tôi rất vui lòng trả lời các câu hỏi của bạn và giúp bạn có trải nghiệm tốt nhất.<br> Hãy liên lạc với chúng tôi.</p>
        <div class="contact-box">
            <div class="contact-left">
                <h3>Gửi phản hồi của bạn</h3>
                <form action="" method="POST">
                    <div class="input-row">
                        <div class="input-group">
                            <label for="">Tên</label>
                            <input type="text" placeholder="Thanh Y" name="ten">
                        </div>
                        <div class="input-group">
                            <label for="">Số điện thoại</label>
                            <input type="text" placeholder="+123456789" name="phone">
                        </div>
                    </div>
                    <div class="input-row">
                        <div class="input-group">
                            <label for="">Email</label>
                            <input type="email" placeholder="lethanhy107@gmail.com" name="email">
                        </div>
                        <div class="input-group">
                            <label for="">Sản phẩm</label>
                            <input type="text" placeholder="Product demo" name="sanpham">
                        </div>
                    </div>


                    <label for="">Lời nhắn</label>
                    <textarea id="" cols="30" rows="5" placeholder="Your massage" name="tinnhan"></textarea>

                    <button class="nut" type="submit" name="Gui">Gửi</button>
                </form>
            </div>
            <div class="contact-right">
                <h3>Thông tin của chúng tôi</h3>

                <table>
                    <tr>
                        <td>Email</td>
                        <td>contactus@example.com</td>
                    </tr>
                    <tr>
                        <td>Số điện thoại</td>
                        <td>+123456789</td>
                    </tr>
                    <tr>
                        <td>Địa chỉ</td>
                        <td>#123 long hòa</td>
                    </tr>
                </table>


            
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>

.container{
    width: 80%;
    margin: 10px auto;
    /* margin-top: 100px; */
   
}
.contact-box{
    background: #fff;
    display: flex;
    border: 1px solid #070101;
}
.contact-left{
    flex-basis: 60%;
    padding: 40px 60px;
}
.contact-right{
    flex-basis: 40%;
    padding: 40px;
    background: #97f2f3;
    color:#070101;
}
h1{
    margin-bottom: 10px;
}
/* .container p{
    margin-bottom: 40px;
} */
.input-row{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}
.input-row .input-group{
    flex-basis: 45%;
}
 .input-group input{
    width: 100%;
    border: none;
    border-bottom: 1px solid #070101;
    outline: none;
    padding-bottom: 5px;
}
textarea{
    width: 100%;
    border: 1px solid #ccc;
    outline: none;
    padding: 10px;
    box-sizing: border-box;
}
label{
    margin-bottom: 6px;
    display: block;
    color: #1c00b5;
}
.nut{
    background: #1c00b5;
    width: 100px;
    border: none;
    outline: none;
    color: #fff;
    height: 35px;
    border-radius: 30px;
    margin-top: 20px;
}
.contact-left h3{
    color: #1c00b5;
    font-weight: 600;
    margin-bottom: 30px;
}
.contact-right h3{
    font-weight: 600;
    margin-bottom: 30px;
}
tr td:first-child{
    padding-right: 20px;
}
tr td{
    padding-top: 20px;
}
</style>