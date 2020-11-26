import Axios from "axios"
import { API_URL_1 } from "../../Helpers/API_URL"


export const getTransactionProcess = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL_1 + `transaction/getTransactionProcess`)
            dispatch({
                type: 'TRANSACTION_PROCESS_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_FAIL'
            })
        }
    }
}

export const getTransactionSuccess = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL_1 + `transaction/getTransactionSuccess`)
            dispatch({
                type: 'TRANSACTION_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_FAIL'
            })
        }
    }
}

export const getTransactionFail = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL_1 + `transaction/getTransactionFail`)
            dispatch({
                type: 'TRANSACTION_FAIL_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_FAIL'
            })
        }
    }
}