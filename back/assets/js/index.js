$(function () {
    // 检测是否有token，没有则返回登录页面
    var mytoken = localStorage.getItem('mytoken');
    if (!mytoken) {
        location.href = 'login1.html'
    }

    // 点击 退了 实现退出功能
    // 绑定点击事件
    $('#logout').on('click', function (e) {
        e.preventDefault();
        layer.confirm('真的要退出吗?', { icon: 3, title: '温馨提示', btn: ['狠心退出', '我再看看'] }, function (index) {
            // 清除token
            localStorage.removeItem('mytoken');
            // 关闭弹层
            layer.close(index);
            // 返回登录页面
            location.href = 'login1.html';
        }, function (index) {
            layer.close(index);
            return false;
        })
    })
})