const INITIAL_STATE = {
    dataBuyerProfile: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'BUYER_SUCCESS':
            return { dataBuyerProfile: action.payload }
        case 'BUYER_FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}