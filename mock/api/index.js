const Mock = require('mockjs');
let data = Mock.mock({
    result : 0,
    result_string: ''
})

module.exports = (req, res) => {
    setTimeout(() => {
        res.send(data);
    }, 500);
}
