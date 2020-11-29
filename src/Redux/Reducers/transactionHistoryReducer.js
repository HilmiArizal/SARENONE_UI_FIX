const INITIAL_STATE = {
    dataTransactionHistory: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'HISTORY_TRANSACTION_SUCCESS':
            return { dataTransactionHistory: action.payload }
        case 'HISTORY_TRANSACTION_FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}