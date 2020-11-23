import Axios from "axios"
import Swal from "sweetalert2"
import { API_URL_1 } from "../../Helpers/API_URL"



export const addCart = (datacart) => {
    return async () => {
        try {
            await Axios.post(API_URL_1 + `cart/addCart`, datacart)
        } catch (err) {
            // console.log(err)
        }
    }
}

export const getCart = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const res = await Axios.get(API_URL_1 + `cart/getCart`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'CART_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            // console.log(err)
        }
    }
}

export const deleteCart = (idcart) => {
    return async (dispatch) => {
        try {
            if (window.confirm('Anda yakin menghapus cart ini?'))
                await Axios.delete(API_URL_1 + `cart/deleteCart?idcart=${idcart}`)
            const token = localStorage.getItem('token')
            const res = await Axios.get(API_URL_1 + `cart/getCart`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'CART_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            // console.log(err)
        }
    }
}

export const editCart = (idcart, dataCart) => {
    return async (dispatch) => {
        try {
            await Axios.patch(API_URL_1 + `cart/editCart?idcart=${idcart}`, dataCart)
            const token = localStorage.getItem('token')
            const res = await Axios.get(API_URL_1 + `cart/getCart`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'CART_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            // console.log(err)
        }
    }
}

export const deleteCartUser = (userId) => {
    return async (dispatch) => {
        try {
            await Axios.delete(API_URL_1 + `cart/deleteCartUser?userId=${userId}`)
            const token = localStorage.getItem('token')
            const res = await Axios.get(API_URL_1 + `cart/getCart`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'CART_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            // console.log(err)
        }
    }
}