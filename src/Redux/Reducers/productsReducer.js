const INITIAL_STATE = {
    dataProduct: [] 
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PRODUCT_SUCCESS':
            return {
                dataProduct: action.payload
            }
        case 'PRODUCT_FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}