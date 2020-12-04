const INITIAL_STATE = {
    dataWishList: [],
    dataReview: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'WISHLIST_SUCCESS':
            return {
                ...state, dataWishList: action.payload
            }
        case 'REVIEW_SUCCESS':
            return {
                ...state, dataReview: action.payload
            }
        case 'WISHLIST_FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}