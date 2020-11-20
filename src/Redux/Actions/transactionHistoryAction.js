import Axios from "axios"
import { API_URL_1 } from "../../Helpers/API_URL"


export const getTransactionHistory = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            const res = await Axios.get(API_URL_1 + `transaction/getHistoryTransaction`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'HISTORY_TRANSACTION_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            // console.log(err)
            dispatch({
                type: 'HISTORY_TRANSACTION_FAIL'
            })
        }
    }
}

export const addTransactionHistory = (datahistorytransaction) => {
    return async (dispatch) => {
        const res = await Axios.post(API_URL_1 + `transaction/addTransactionHistory`, datahistorytransaction)
        // console.log(res.data)
    }
}