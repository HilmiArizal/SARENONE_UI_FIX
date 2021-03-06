const INITIAL_STATE = {
    dataProduct: [],
    dataAllProduct: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PRODUCT_SUCCESS':
            return {
                ...state, dataProduct: action.payload
            }
        case 'PRODUCT_ALL_SUCCESS':
            return {
                ...state, dataAllProduct: action.payload
            }
        case 'PRODUCT_FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}