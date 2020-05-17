import * as types from './mutation-types'

export default {
    [types.changeSigninfo] (state, value) {
        state.signinfo=value;
    },
    [types.updateUserInfo] (state, value) {
        state.userInfo = value;
    }
}
