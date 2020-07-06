import Axios from "axios"
import { API_URL_1 } from "../../Helpers/API_URL"


export const getWeight = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL_1 + `weight/getWeight`)
            dispatch({
                type: 'WEIGHT_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            // console.log(err)
        }
    }
}

export const addWeight = (dataweight) => {
    return async (dispatch) => {
        try {
            await Axios.post(API_URL_1 + `weight/addWeight`, dataweight)
            const res = await Axios.get(API_URL_1 + `weight/getWeight`)
            dispatch({
                type: 'WEIGHT_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            // console.log(err)
        }
    }
}

export const editWeight = (idweight, dataweight) => {
    return async (dispatch) => {
        try {
            await Axios.patch(API_URL_1 + `weight/editWeight?idweight=${idweight}`, dataweight)
            const res = await Axios.get(API_URL_1 + `weight/getWeight`)
            dispatch({
                type: 'WEIGHT_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            // console.log(err)
        }
    }
}

export const deleteWeight = (idweight) => {
    return async (dispatch) => {
        try {
            if (window.confirm('Anda yakin menghapus list ini ?')) {
                await Axios.delete(API_URL_1 + `weight/deleteWeight?idweight=${idweight}`)
                const res = await Axios.get(API_URL_1 + `weight/getWeight`)
                dispatch({
                    type: 'WEIGHT_SUCCESS',
                    payload: res.data
                })
            }
        } catch (err) {
            // console.log(err)
        }
    }
}