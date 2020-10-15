
$('#area-t').on('input', function () {
    let cc = $(this).val().length;
    $('#countCom').html(cc);
})




//URLSearchParams 接口定义了一些实用的方法来处理 URL 的查询字符串。
//URLSearchParams.get() 此方法 是 获得指定搜索参数的 第一个值
//search 是一个可读可写的字符串  可以设置或返回当前URL查询的 ? 之后的部分
var id = new URLSearchParams(location.search).get('id');

function renderPinglun() {

    $.ajax({
        url: 'http://localhost:8888/api/articles/' + id + '/comments',
        success: function (res) {
            console.log(res);
            if (res.status === 0) {
                var arr = [
                    `<h4><i class="sprites"></i>评论区</h4>
                    `];
                res.data.forEach(function (i) {
                    arr.push(`<div class="kr_comment_card">
<div class="img-wrap">
  <img src="./uploads/avatar_3.jpg" alt="">
</div>
<div class="info">
  <p>${i.uname} · <span>${i.cdate}</span></p>
  <p>${i.content}</p>
</div>
<a href="javascript:;" class="like">${i.count}</a>
</div>`)
                });
                $('#pinglun').html(arr.join(''));
            }
        }
    })

};
renderPinglun();

$('#submitFrom').submit(function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8888/api/articles/' + id + '/comments',
        data: data,
        success: function (res) {
            if (res.status === 0) {
                layer.msg('res.message');
                $('#submitFrom')[0].reset();
                renderPinglun();
            }
        }
    })
});





