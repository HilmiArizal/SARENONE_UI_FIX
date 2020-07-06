const INITIAL_STATE = {
    dataPrice: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PRICE_SUCCESS':
            return {
                dataPrice: action.payload
            }
        case 'WEIGHT_FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}