$.ajax({
    url: 'http://localhost:8888/api/swipers',
    success: function (res) {
        // console.log(res);
        let html = template('tpl-lunbotu', res);
        $('#lunbotu').html(html);
    }
});