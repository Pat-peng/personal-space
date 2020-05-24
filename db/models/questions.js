var mongoose = require('mongoose');
var QuestionsSchema = require('../schemas/questions'); //拿到导出的数据集模块
var Questions = mongoose.model('Questions', QuestionsSchema); // 编译生成Movie 模型
var Users = require('./users');//导入用户模块

exports.create =function (document, res) {
    const questions = new Questions(document);
    questions.provider = 'local';
    questions.save();
    Users.findById(questions.userId, function(err, users) {
        if(err) {
            console.log(err);
        }
        var item = {};
        item['_id'] = questions._id;
        item['title'] = questions.title;
        item['topic'] = questions.topics[0];
        item['like'] = questions.like;
        item['comment'] = questions.comment;
        item['comments'] = [];
        item['content'] = questions.content;
        item['editDate'] = questions.meta.updateAt.toLocaleString();
        item['isCollapsed'] = true;
        item['CollapseContent'] = questions.content.slice(0,294)+'...';
        if (!questions.isAnonymous) {
            item['name'] = users.name;
            item['sign'] = '没有最好，只有更好！';
            item['image'] = '/img/admin.151d6ac8.jpg';
        }
        else {
            item['name'] = "匿名用户";
            item['sign'] = '';
            item['image'] = '/img/admin.151d6ac8.jpg';
        }
        item['likeSelected'] = false;
        item['unlikeSelected'] = false;
        res.json({
            "success": true,
            "question": item
        });
    })
};

exports.Questions = Questions