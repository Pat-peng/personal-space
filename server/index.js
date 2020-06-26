const PORT = 3000;
let reqUrl, resUrl;
var express = require('express');
// 数据库
require('../db/index');
var file = require('./routes/file');
var users = require('./routes/users');
var questions = require('./routes/questions');
var comments = require('./routes/comments');

var app = express();
app.listen(PORT, function (req) {
    console.log(req);
})

app.use((req, res, next) => {
    let host = req.headers.host;
    reqUrl = `http://${host}`;
    resUrl = `http://${host}`.replace(PORT, '8080');
    // 跨域设置
    res.header('Access-Control-Allow-Origin', resUrl);
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
