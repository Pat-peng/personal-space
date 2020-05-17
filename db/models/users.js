var mongoose = require('mongoose')
var UsersSchema = require('../schemas/users') //拿到导出的数据集模块
var Users = mongoose.model('Users', UsersSchema) // 编译生成Movie 模型

// exports.create =function (document, res) {
//   const user = new Users(document);
//   user.provider = 'local';
//   user.save();
//   res.json({"success":true});
// };
module.exports = Users;