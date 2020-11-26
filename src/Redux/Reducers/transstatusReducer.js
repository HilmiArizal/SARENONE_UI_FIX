const INITIAL_STATE = {
    dataTransactionProcess: [],
    dataTransactionSuccess: [],
    dataTransactionFail: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TRANSACTION_PROCESS_SUCCESS':
            return { ...state, dataTransactionProcess: action.payload }
        case 'TRANSACTION_SUCCESS':
            return { ...state, dataTransactionSuccess: action.payload }
        case 'TRANSACTION_FAIL_SUCCESS':
            return { ...state, dataTransactionFail: action.payload }
        case 'TRANSACTION_ FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}