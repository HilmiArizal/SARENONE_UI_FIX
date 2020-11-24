const INITIAL_STATE = {
    dataTransaction: [],
    dataProvince: [],
    dataCity: [],
    dataDistrics: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TRANSACTION_SUCCESS':
            return { ...state, dataTransaction: action.payload }
        case 'TRANSACTION_PROVINCE':
            return { ...state, dataProvince: action.payload }
        case 'TRANSACTION_CITY':
            return { ...state, dataCity: action.payload }
        case 'TRANSACTION_DISTRICT':
            return { ...state, dataDistrics: action.payload }
        case 'TRANSACTION_FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}