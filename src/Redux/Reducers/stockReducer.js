const INITIAL_STATE = {
    dataStock: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'STOCK_SUCCESS':
            return {
                dataStock: action.payload
            }
        case 'STOCK_FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}