var express = require('express');
var router = express.Router();
var Users = require('../../db/models/users');//导入模型数据模块

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// 查询所有用户数据 http://localhost:3000/users/users
router.get('/users', function(req, res, next) {
    Users.fetch(function(err, users) {
        if(err) {
            console.log(err);
        }
        res.json({
            "users": users
        });
    })
});

// 按emailPhone查询用户信息是否正确 http://localhost:3000/users/user?ep=1940796332@qq.com&pw=888888
router.get('/user', function(req, res, next) {
    // post请求req.body，get请求req.query
    var emailPhone = req.query.ep;
    var password = req.query.pw;
    Users.findById(emailPhone, function(err, user) {
        if(err) {
            console.log(err);
        }
        if (user && user.password === password) {
            res.send({
                "success": true,
                "userInfo": {
                    "name": user.name,
                    "emailPhone": user.emailPhone,
                    "password": user.password,
                    "image": "/static/admin.jpg"
                }
            })
            return;
        }
        res.send({
            "success": false,
             "error": "用户名密码有误，请重新登录"
        })
    });
});

//插入用户数据
// http://localhost:3000/users/insert?n=admin&ep=1940796332@qq.com&pw=888888
router.get('/insert', function(req, res, next) {
    // var userinfo=req.body;
    // // 两种方式均可
    // create({
    //    name:'xutt',
    //    emailPhone:'1940796332@qq.com',
    //    password:'888888'
    //   },res);
    // post请求req.body，get请求req.query
    var name = req.query.n;
    var emailPhone = req.query.ep;
    var password = req.query.pw;
    Users.fetch(function(err, users) {
        if(err) {
            console.log(err);
        }
        for (var user of users) {
            if (user.emailPhone === emailPhone) {
                res.send({"success":false,"error":"该邮箱或手机号已经注册！"})
                return;
            }
            else if (user.name === name) {
                res.send({"success":false,"error":"该用户名已经注册！"})
                return;
            }
        }
        Users.insert({
            name: name,
            emailPhone: emailPhone,
            password: password
        }, function() {
            res.json({
                "success":true
            });
        });
    })
})

// 删除所有用户数据 http://localhost:3000/users/del?ep=1940796332@qq.com
router.get('/del', function(req, res, next) {
    var emailPhone = req.query.ep;
    Users.remove(emailPhone, function(err, user) {
        if(err) {
            res.send({
                "success": false,
                "error": err
            })
        }
        res.send({
            "success": true
        })
        return;
    });
});

module.exports = router;
