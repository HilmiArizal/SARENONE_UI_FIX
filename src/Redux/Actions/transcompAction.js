import Axios from "axios"
import { API_URL_1 } from "../../Helpers/API_URL"


export const getTransactionComplete = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL_1 + `transaction/getTransactionComplete`)
            dispatch({
                type: 'TRANSACTION_COMPLETE_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_COMPLETE_FAIL'
            })
        }
    }
}