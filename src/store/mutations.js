import state from './state'

const mutations = {
    changeMsg: (state, payload) => {
        state.defaultMsg = payload;
    },
    count: (state) => {
        ++state.editorTimes
    }
}

export default mutations