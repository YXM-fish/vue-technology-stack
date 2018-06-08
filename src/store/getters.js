import state from './state'

const getters = {
    fullName: state => {
        return state.fName + state.lName;
    }
}

export default getters