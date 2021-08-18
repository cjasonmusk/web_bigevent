$(function() {
    // 点击“去注册账号”的链接
    $('.login-box .links').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 点击“去登录”的链接
    $('.reg-box .links').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        //从layui导入foorm
    var form = layui.form
    var layer = layui.layer
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须为6到12位，且不能有空格'],
            //校验两次密码是否一致
            repwd: function(value) {
                var pwd = $('.reg-box [name=password]').val()
                if (value !== pwd) {
                    return '两次密码不一致'
                }
            }

        })
        //监听表单注册事件
    $('#reg-form').on('submit', function(e) {
            e.preventDefault()
            var data = {
                username: $('#reg-form [name=username]').val(),
                password: $('#reg-form [name=password]').val()
            }
            $.post('/api/reguser', data,
                function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    console.log(res)
                    layer.msg('注册成功！请登陆！')
                    $('#link_login').click()
                })
        })
        //监听表单登陆事件
    $('#log-form').on('submit', function(e) {
            console.log($(this).serialize())
            e.preventDefault()
            $.ajax({
                url: '/api/login',
                method: 'POST',
                data: $(this).serialize(),
                success: function(res) {
                    console.log(res)
                    if (res.status !== 0) {
                        console.log(res)
                        return layer.msg('登录失败！')

                    }
                    layer.msg('登录成功！')
                    console.log(res)
                        // 将登录成功得到的 token 字符串，保存到 localStorage 中
                    localStorage.setItem('token', res.token)
                        // 跳转到后台主页
                    location.href = '/index.html'
                }
            })
        })
        // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})