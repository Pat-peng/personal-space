import * as types from './mutation-types'
let reqUrl = location.origin.replace(location.port, '3000');

export default {
    //登录函数
    signIn({ state }, obj) {
        var $vm = obj['context'];
        let _emailPhone = state.loginForm.emailPhone;
        let _password = state.loginForm.password;
        var item = {
            ep: _emailPhone,
            pw: _password
        }
        $vm.$axios({
            url: reqUrl + '/users/user',
            method: 'get',
            params: item,
            withCredentials: true
        }).then(function (res) {
            // 处理成功的结果
            if (res.data.success) {
                $vm.$store.dispatch('updateUserInfo', res.data.userInfo);
                $vm.$router.replace("/home");
                return;
            }
            else {
                throw new Error(res.data.error);
            }
        },function (res) {
            // 处理失败的结果
            alert(res);
        });
    },
    //注册函数
    signUp({ state }, obj) {
        var $vm = obj['context'];
        let _name = state.loginForm.name;
        let _emailPhone = state.loginForm.emailPhone;
        let _password = state.loginForm.password;
        var item = {
            n:_name,
            ep:_emailPhone,
            pw:_password
        };
        $vm.$axios({
            url: reqUrl + '/users/insert',
            method: 'get',
            params: item,
            withCredentials: true
        }).then(function (res) {
            // 处理成功的结果
            if (res.data.success) {
                alert("注册成功，请登录！");
                return;
            }
            else {
                throw new Error(res.data.error);
            }
        }, function (res) {
            // 处理失败的结果
            alert(res);
        });
    },
    //更改登录信息函数
    changeSignInfo({ commit }, value) {
        commit(types.changeSigninfo, value);
    },
    //更改登录信息函数
    updateUserInfo({ commit }, value) {
        commit(types.updateUserInfo, value);
    }
}
