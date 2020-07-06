const INITIAL_STATE = {
    dataUsers_Admin: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'DATA_USERS_ADMIN':
            return {
                dataUsers_Admin: action.payload
            }
        case 'LOGIN_FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}