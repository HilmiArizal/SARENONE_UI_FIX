const INITIAL_STATE = {
    dataCategory : []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CATEGORIES_SUCCESS':
            // console.log({ categoryname: action.payload })
            return {
                dataCategory: action.payload
            }
        case 'CATEGORIES_FAIL':
            return INITIAL_STATE
        default:
            return state;
    }
}