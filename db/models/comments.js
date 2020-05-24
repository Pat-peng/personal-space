var mongoose = require('mongoose')
var CommentSchema = require('../schemas/comments') //拿到导出的数据集模块
var Comments = mongoose.model('Comments', CommentSchema) // 编译生成Movie 模型

module.exports = Comments;