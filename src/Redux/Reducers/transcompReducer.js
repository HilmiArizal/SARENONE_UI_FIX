const INITIAL_STATE = {
    dataTransactionComplete: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TRANSACTION_COMPLETE_SUCCESS':
            return { dataTransactionComplete: action.payload }
        case 'TRANSACTION_COMPLETE_ FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}