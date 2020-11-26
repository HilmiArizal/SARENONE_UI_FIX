import Axios from "axios"
import { API_URL_1 } from "../../Helpers/API_URL"


export const getAllProductComplete = (newoffset, choosenOffset) => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL_1 + `products/getAllProductComplete?limit=5&offset=${choosenOffset === undefined ? newoffset : choosenOffset}`)
            dispatch({
                type: 'PRODUCT_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            // console.log(err)
        }
    }
}

export const getProductById = (idproduct) => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL_1 + `products/getProductById?idproduct=${idproduct}`)
            dispatch({
                type: 'PRODUCT_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            // console.log(err)
        }
    }
}

export const getGroupByProduct = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL_1 + `products/getGroupByProduct`)
            dispatch({
                type: 'PRODUCT_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            // console.log(err)
        }
    }
}

export const getBestProduct = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL_1 + `products/getBestProduct`)
            dispatch({
                type: 'PRODUCT_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            // console.log(err)
        }
    }
}

export const deleteProduct = (idproduct, newoffset, choosenOffset) => {
    return async (dispatch) => {
        try {
            if (window.confirm('Anda yakin menghapus produk ini?')) {
                await Axios.delete(API_URL_1 + `products/deleteProduct?idproduct=${idproduct}`)
                await Axios.delete(API_URL_1 + `stock/deleteStockProduct?idproduct=${idproduct}`)
                const res = await Axios.get(API_URL_1 + `products/getAllProductComplete?limit=5&offset=${choosenOffset === undefined ? newoffset : choosenOffset}`)
                dispatch({
                    type: 'PRODUCT_SUCCESS',
                    payload: res.data
                })
            }
        } catch (err) {
            // console.log(err)
        }
    }
}

export const addProducts = (data, image) => {
    return async (dispatch) => {
        try {
            let formData = new FormData();
            formData.append('data', JSON.stringify(data))
            formData.append('imageproduct', (image))

            await Axios.post(API_URL_1 + `products/addProduct`, formData)
            alert('Produk berhasil ditambahkan')
            const res = await Axios.get(API_URL_1 + `products/getGroupByProduct`)
            dispatch({
                type: 'PRODUCT_ALL_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const editProducts = (data, image, productId) => {
    return async (dispatch) => {
        try {
            let formData = new FormData();
            formData.append('data', JSON.stringify(data))
            formData.append('imageproduct', (image))

            const res = await Axios.patch(API_URL_1 + `products/editProduct?idproduct=${productId}`, formData)
            // console.log(res.data)
        } catch (err) {
            // console.log(err)
        }
    }
}