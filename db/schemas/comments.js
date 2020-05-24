var mongoose = require('mongoose');

//申明一个mongoons对象
var CommentSchema = new mongoose.Schema({
    questionID: String,
    emailPhone: String,
    content: String,
    like: Number,
    dislike: Number,
    PID: String,
    RootID: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        }
    }
})

//每次执行都会调用,时间更新操作
CommentSchema.pre('save', function(next) {
    this.meta.createAt = this.meta.updateAt = Date.now();
    next();
})

//查询的静态方法
CommentSchema.statics = {
    //根据问题ID查询所有数据
    fetchWithQID: function(qID,cb) {
        return this
        .find({
            questionID: qID
        }).sort({
            'meta.createAt': 1 //-1降序，1升序
        }).exec(cb);
    },
    // 小于  {<key>:{$lt:<value>}}
    // 小于或等于  {<key>:{$lte:<value>}}
    // 大于 {<key>:{$gt:<value>}}
    // 大于或等于  {<key>:{$gte:<value>}}
    // 不等于  {<key>:{$ne:<value>}}
    // $or或   $and与(也可省略)   $nor非
    fetchWithRootID: function(RootID,cb) { //查询回复详情
        return this
        .find({
            $or: [{
                _id: RootID
            }, {
                RootID: RootID
            }]
        }).sort({
            'meta.createAt': 1 //-1降序，1升序
        }).exec(cb) //回调
    },
    findByRootId: function(id, cb) {
        return this
        .findOne({_id: id})
        .exec(cb)
    },
    insert: function(document,cb){
        this.create(document,cb);
    },
    updateLike: function(id,like,cb){
        this.update({
            _id: id
        }, {
            $set : {
                like : like
            }
        }, cb);
    },
    updateDisLike: function(id,dislike,cb){
        this.update({
            _id: id
        }, {
            $set : {
                dislike : dislike
            }
        }, cb);
    },
    removeByQuestion: function(id,cb){//删除文章时全部删除
        this.remove({
            questionID: id
        }, cb)
    },
    removeComments: function(RootID,cb){//删除评论及其下面的评论
        this.remove({
            $or: [{
                _id: RootID
            }, {
                RootID: RootID
            }]
        }, cb)
    }
}

//暴露出去的方法
module.exports = CommentSchema