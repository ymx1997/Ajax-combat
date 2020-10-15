$.ajax({
    url: 'http://localhost:8888/api/links',
    success: function (res) {
        let html = template('tpl-youqinglink', res);
        $('.kr_collaborator').append(html);
    }
});