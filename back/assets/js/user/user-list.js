$(function () {
  // 获取用户列表
  var form = layui.form
  var laypage = layui.laypage

//   当前页码
var pagenum = 1
// 每页显示的条数
var pagesize = 3


// 获取用户信息
  function getlist(param) {

    $.ajax({
      type: "get",
      url: "admin/users",
      data: param,
      success: function (res) {
        // console.log(res);
        let html = template('app',res)
        $('tbody').html(html)

         // 初始化分页效果
         laypage.render({
            // 注意，这里的 articlePage 是 ID，不用加 # 号
            elem: 'articlePage',
            // 当前页码
            curr: pagenum,
            // 数据总数，从服务端得到
            count: res.total,
            // 每页显示的条数
            limit: pagesize,
            // 每页显示条数列表
            limits: [3, 10, 30, 40, 100],
            // 分页条布局效果
            layout: ['prev', 'page', 'next', 'skip', 'count', 'limit'],
            // 页面切换是触发的动作
            jump: function (obj, first) {
              // obj 表示分页的所有参数；first用于判断首次加载
              // 这里触发时，需要修改当前页码
              pagenum = obj.curr
              // 切换每页显示条数时，修改pagesize
              pagesize = obj.limit
              // 重新加载接口数据
              if (!first) {
                // 首次不触发，切换页码时触发
                getlist({
                  // 页码：必须从1开始
                  pagenum: pagenum,
                  // 每页显示多少条数据
                  pagesize: pagesize
                })
              }
            }
          });
      },
    });
  }

  getlist({
    // 页码：必须从1开始
    pagenum: pagenum,
    // 每页显示多少条数据
    pagesize: pagesize
  });

var index;
// 点击编辑弹出编辑弹出层
$('tbody').on('click','button:contains(编辑)', function () {
    // console.log(123);
    var data = $(this).data()
    // console.log(data);

    index = layer.open({
        type: 1,
        title: '编辑用户',
        area: ['500px', '300px'],
        content: $('#bianji').html()
      });
      form.val('fuzhi',data)
    
    //   关闭弹出层
    //   layer.close(index)     
        
})
$('body').on('submit','#bj', function(e) {
    e.preventDefault()
    var data = form.val('fuzhi')
    // console.log(data);
    $.ajax({
        type: 'put',
        url: 'admin/users',
        data: data,
        success: function (res) {
            // console.log(res);
            layer.msg(res.message)
            if (res.status === 0) {
                // layer.close(index)
                getlist({
                    // 页码：必须从1开始
                    pagenum: pagenum,
                    // 每页显示多少条数据
                    pagesize: pagesize
                  });
                  layer.close(index)
            }  //   关闭弹出层
              
        }
    })


})


// 重置密码
var num;
var id;
$('tbody').on('click','button:contains(重置密码)', function () {
    num = layer.open({
        type: 1,
        title: '重置密码',
        area: ['500px', '300px'],
        content: $('#chongzhi').html()
      });
      id = $(this).data('id')
      
})
form.verify({
  pass: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,
  cc: function (val) {
      var nn = $('#zz').val().trim()
      if (val !== nn) return '密码不一致'
  }
})

$('body').on('submit','#xiugai', function (e) {
  e.preventDefault()
  
        var word = $(' #xiugai input[name=password]').val()
        console.log(id);
        $.ajax({
            type:'put',
            url: 'admin/users/' + id,
            data: {password: word},
            success: function (res) {
              //  console.log(res);
              layer.msg(res.message)
              if (res.status === 0) layer.close(num)
            }
        })
})




// 删除
$('tbody').on('click','button:contains(删除)', function () {
  var mm = $(this).data('id')
  layer.confirm('确定要删除?', function(index){
      $.ajax({
        type: 'delete',
        url: 'admin/users/' + mm,
        success: function (res) {
          layer.msg(res.message)
          if (res.status === 0) {
            getlist({
              // 页码：必须从1开始
              pagenum: pagenum,
              // 每页显示多少条数据
              pagesize: pagesize
            });
          }
        }
      })
    
    layer.close(index);
  }); 
})









});


