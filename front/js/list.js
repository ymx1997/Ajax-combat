var total = 16;
var params = {
    pagenum: 1,
    pagesize: 10,
}
var arr = [
    `
    <div class="kr_news_date">
    17 <span>08月</span>
  </div>
    `
];
function renderList() {
    if (total !== 0 && arr.length >= total) {
        return layer.msg('没有新闻了');
    }
    $.ajax({
        type: 'get',
        url: 'http://localhost:8888/api/articles',
        data: params,
        success: function (res) {
            // console.log(res);
            if (res.status === 0) {
                total = res.total;
                res.data.forEach(function (i) {
                    arr.push(
                        `
                        <div class="item">
                        <h4>
                          <a href="./detail.html?id=${i.id}">${i.title}</a>
                        </h4>
                        <p class="meta">
                          <span>15分钟前 分享至</span>
                          <a href="javascript:;" class="wechat"></a>
                          <a href="javascript:;" class="weibo"></a>
                        </p>
                        <p class="brief">${i.content}</p>
                      </div>
                        `
                    )
                });
                $('.kr_news_list').append(arr.join(''));
            }
        }
    })
};
renderList();

$('.kr_more').on('click', function () {
    params.pagenum = params.pagenum + 1;
    renderList();
})
