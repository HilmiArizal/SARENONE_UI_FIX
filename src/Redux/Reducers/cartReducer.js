const INITIAL_STATE = {
    dataCart: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CART_SUCCESS':
            return { dataCart: action.payload }
        case 'CART_FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}