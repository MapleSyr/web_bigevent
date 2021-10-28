$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 将验证规则赋予哪个标签，value的值就等于该标签的内容
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致!'
            }
        }
    })
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为   
        e.preventDefault()
            // 发起ajax数据请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败！')
                }
                layer.msg('更新密码成功！')
                    // 通过[0],将jquery元素转换为原生dom元素，就可以调用form表单的reset方法重置表单。
                $('.layui-form')[0].reset()
                    //调用父页面中的方法，渲染用户的头像和信息
                window.parent.getUserInfo()
            }
        })
    })
})