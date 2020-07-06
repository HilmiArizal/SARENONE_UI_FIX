const INITIAL_STATE = {
    dataWeight: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'WEIGHT_SUCCESS':
            return {
                dataWeight: action.payload
            }
        case 'WEIGHT_FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}