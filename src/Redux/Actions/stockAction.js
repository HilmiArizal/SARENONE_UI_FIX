import Axios from "axios"
import { API_URL_1 } from "../../Helpers/API_URL"


export const getStock = (idproduct) => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL_1 + `stock/getStock?productId=${idproduct}`)
            dispatch({
                type: 'STOCK_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            // console.log(err)
        }
    }
}

export const deleteStock = (idstock, idproduct) => {
    return async (dispatch) => {
        try {
            if (window.confirm('Anda yakin menghapus stock ini?')) {
                await Axios.delete(API_URL_1 + `stock/deleteStock?idstock=${idstock}`)
                const res = await Axios.get(API_URL_1 + `products/getProductById?idproduct=${idproduct}`)
                dispatch({
                    type: 'STOCK_SUCCESS',
                    payload: res.data
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}