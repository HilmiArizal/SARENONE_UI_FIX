const INITIAL_STATE = {
    dataUsers_Admin: [],
    dataAdmin_Only: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'DATA_USERS_ADMIN':
            return {
                ...state, dataUsers_Admin: action.payload
            }
        case 'ADMIN_ONLY_SUCCESS':
            console.log('masuk', {dataUsers_Admin: action.payload})
            return {
                ...state, dataAdmin_Only: action.payload
            }
        case 'LOGIN_FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}