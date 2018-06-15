// 同步事件

let mutations = {
    updateLoadingStatus(state, payload) {
        state.isLoading = payload.isLoading
    },
    setUserinfo(state, val) {
        state.userInfo = val;
    }
}

export default mutations