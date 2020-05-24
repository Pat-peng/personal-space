const port = 3000;
var express = require('express');
// 数据库
require('../db/index');
var file = require('./routes/file');
var users = require('./routes/users');
var questions = require('./routes/questions');
var comments = require('./routes/comments');

var app = express();
app.listen(port, function (req) {
    console.log(req);
})

app.use((req, res, next) => {
    // 跨域设置
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Content-Type,Access-Token");
    res.header("Access-Control-Expose-Headers", "*");

    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use('/file', file);
app.use('/users', users);
app.use('/questions', questions);
app.use('/comments', comments);
