const INITIAL_STATE = {
    dataTransactionMethod: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TRANSACTION_METHOD_SUCCESS':
            return { dataTransactionMethod: action.payload }
        case 'TRANSACTION_METHOD_FAILED':
            return INITIAL_STATE
        default:
            return state
    }
}