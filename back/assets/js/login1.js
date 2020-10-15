
// 粒子插件
$(document).ready(function () {
    $('.layui-container').particleground({
        dotColor: '#7ec7fd',
        lineColor: '#7ec7fd'
    })
})

//TODO 加载layui内置模块
let form = layui.form

$('.layui-form').submit(function (e) {  //TODO 添加事件 
    e.preventDefault()
    let getFM = $(this).serialize();   //TODO  获取表单的值 变量保存利于发送请求
    // console.log(getFM);
    $.ajax({                           //TODO  发送请求
        type: "POST",
        url: 'api/login',
        data: getFM,
        success: (res) => {
            // console.log(res);
            if (res.status === 0) {
                layer.msg(res.message);  //TOdo 成功的提示
                localStorage.setItem('mytoken', res.token)
                location.href = './index.html'
            } else {
                layer.msg(res.message)  //TOdo 失败的提示
            }
        }

    })

})
