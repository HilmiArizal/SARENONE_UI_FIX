import Axios from "axios"
import Swal from "sweetalert2"
import { API_URL_1 } from "../../Helpers/API_URL"


export const getWishList = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const res = await Axios.get(API_URL_1 + `wishlist/getWishList`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'WISHLIST_SUCCESS',
                payload: res.data
            })
            // console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }
}

export const addWishList = (iduser, idproduct) => {
    return async (dispatch) => {
        try {
            let dataWishListArr = []
            let idwishlist = null
            let userId = iduser
            let productId = idproduct
            let likedislike = 1
            let dataWishList = { idwishlist, userId, productId, likedislike }
            dataWishListArr.push(dataWishList)

            console.log(dataWishList)
            await Axios.post(API_URL_1 + `wishlist/addWishList`, dataWishListArr)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Berhasil disimpan!',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const getReviewDetail = (idproduct) => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL_1 + `wishlist/getReviewDetail?idproduct=${idproduct}`)
            dispatch({
                type: 'REVIEW_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            alert(err.response.data)
        }
    }
}

export const addReviewDetail = (dataReview) => {
    return async (dispatch) => {
        try {
            await Axios.post(API_URL_1 + `wishlist/addReviewDetail`, dataReview)
            const res = await Axios.get(API_URL_1 + `wishlist/getReviewDetail?idproduct=${dataReview.productId}`)
            dispatch({
                type: 'REVIEW_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            alert(err.response.data)
        }
    }
}

export const deleteReviewDetail = (idreview, idproduct) => {
    return async (dispatch) => {
        try {
            await Axios.delete(API_URL_1 + `wishlist/deleteReviewDetail?idreview=${idreview}`)
            const res = await Axios.get(API_URL_1 + `wishlist/getReviewDetail?idproduct=${idproduct}`)
            dispatch({
                type: 'REVIEW_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}