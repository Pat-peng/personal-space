var express = require('express');
var router = express.Router();
var {create,Questions} = require('../../db/models/questions');//导入模型数据模块
var Users = require('../../db/models/users');//导入用户模块
var Comments = require('../../db/models/comments');//导入评论模块

/* GET questions listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a question');
});

//查询所有问题清单
router.get('/questions', function(req, res, next) {
    Questions.fetch(function(err, questions) {
        if(err) {
            console.log(err);
        }
        var items = [];
        //此处必须用let，使i在块级作用域中有效
        for (let i = 0, len=questions.length; i < len; i++) {
            Users.findById(questions[i].userId, function(err, users) {
                if(err) {
                    console.log(err);
                }
                var item={};
                item['_id']=questions[i]._id;
                item['title']=questions[i].title;
                item['topic']=questions[i].topics[0];
                item['like']=questions[i].like;
                item['comment']=questions[i].comment;
                item['comments']=[];
                item['expand']=false;//评论是否展开
                item['content']=questions[i].content;
                item['editDate']=questions[i].meta.updateAt.toLocaleString();
                item['isCollapsed']=true;
                item['CollapseContent']=questions[i].content.slice(0,294)+'...';
                if (!questions[i].isAnonymous) {
                    item['name']=users.name;
                    item['sign']='没有最好，只有更好！';
                    item['image']='/img/admin.151d6ac8.jpg';
                }
                else {
                    item['name']="匿名用户";
                    item['sign']='';
                    item['image']='/img/admin.151d6ac8.jpg';
                }
                item['likeSelected']=false;
                item['unlikeSelected']=false;
                items.push(item);
                if (i===len-1) {
                    res.json({"success":true,"questions":items});
                }
            })
        }
    })
});

//插入新问题
router.post('/insert', function(req, res, next) {
    create({
        title: req.query.title,
        topics: req.query.topics,
        content: req.query.content,
        isAnonymous: req.query.isAnonymous,
        userId: req.query.userId,
        like: 0,
        comment: 0
    }, res);
});

//删除文章
router.post('/delete', function(req, res, next) {
    var id = req.query._id;
    Questions.remove(id,function(err){
        if(err) {
            res.json({"success":false, "error":err});
        }
        Comments.removeByQuestion(id,function(err){
            if(err) {
                res.json({"success":false,"error":err});
            }
            res.json({"success":true});
        })
    })
});

//更新赞的条数
router.post('/updateAtLike', function(req, res, next) {
    var id=req.query._id;
    var like=req.query.like;
    Questions.updateLike(id,like,function(err){
        if(err) {
            res.json({"success":false,"error":err});
        }
        res.json({"success":true});
    })
});

module.exports = router;
