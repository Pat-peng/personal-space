var mongoose = require('mongoose');

//申明一个mongoons对象
var QuestionsSchema = new mongoose.Schema({
    title: String,
    topics: Array,
    content: String,
    isAnonymous:Boolean,
    userId:String,
    // CollapseContent:String,
    like:Number,
    comment:Number,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

//每次执行都会调用,时间更新操作
QuestionsSchema.pre('save', function(next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }
    else {
        this.meta.updateAt = Date.now();
    }
    next();
})

//查询的静态方法
QuestionsSchema.statics = {
    //查询所有数据
    fetch(cb) {
        return this
            .find()
            .sort({
                'meta.updateAt': -1
            }) //-1降序，1升序
            .exec(cb) //回调
    },
    findById(id, cb) { //根据_id查询单条数据
        return this
            .findOne({
                _id: id
            })
            .exec(cb)
    },
    insert(document,cb){
        this.create(document, cb);
    },
    updateLike(id,like,cb){
        this.update({_id: id}, {$set : {like : like}}, cb)
    },
    updateComment(id,comment,cb){
        this.update({
            _id: id
        }, {
            $set : {
                comment : comment
            }
        }, cb);
    },
    remove(id,cb){
        this.findByIdAndRemove(id, cb)
    }
}

//暴露出去的方法
module.exports = QuestionsSchema