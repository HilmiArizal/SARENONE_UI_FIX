const INITIAL_STATE = {
    dataTransaction: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TRANSACTION_SUCCESS':
            return { dataTransaction: action.payload }
        case 'TRANSACTION_FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}