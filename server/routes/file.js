const PICS_PATH = './static/';
const PICS_URL = `http://localhost:3000/static/`;
var express = require('express');
var router = express.Router();

var multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, PICS_PATH);
    },
    filename: function (req, file, cb) {
        cb(null, 'pic' + Date.now() + '.png');
    }
})
const upload = multer({ storage: storage });

// 文件上传
router.post('/fileUpload', upload.single('file'), (req, res, next) => {
    //req.file文件 req.body获取除文件外其他参数
    let file = req.file;
    let name = file.path.replace(PICS_PATH, '')
    res.json({
        success: true,
        name: name,
        url: PICS_URL + name
    });
})

router.get('/fileUpload1', (req, res, next)=>{
    console.log('body', req.body);//获取到的age和name
    console.log('file', req.file);//获取到的文件
    res.send({
        'success': true
    });
})

module.exports = router;