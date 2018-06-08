import state from './state'

const actions = {
    countTimes({ dispatch, commit }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('count');
                resolve('成功更改一次');
            }, 2000);
        })
    }
}

export default actions