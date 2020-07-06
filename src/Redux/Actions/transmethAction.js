import Axios from "axios";
import { API_URL_1 } from "../../Helpers/API_URL";


export const getTransactionMethod = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL_1 + `transaction/metodeTransaction`)
            dispatch({
                type: 'TRANSACTION_METHOD_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            // console.log(err)
        }
    }
}
