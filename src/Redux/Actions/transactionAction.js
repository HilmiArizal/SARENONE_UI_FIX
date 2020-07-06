import Axios from "axios"
import { API_URL_1 } from "../../Helpers/API_URL"


export const getTransaction = () => {
    return async (dispatch) => {
        try{
            const token = localStorage.getItem('token');
            const res = await Axios.get(API_URL_1 + `transaction/getTransaction`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch({
                type: 'TRANSACTION_SUCCESS',
                payload: res.data
            })
        }catch(err){
            // console.log(err)
        }
    }
}

export const addTransaction = (datatransaction, image) => {
    return async () => {
        try{
            let formData = new FormData();

            formData.append('imagetransaction', image)
            formData.append('datatransaction', JSON.stringify(datatransaction))

            await Axios.post(API_URL_1 + `transaction/addTransaction`, formData)
            
        }catch(err){
            // console.log(err)
        }
    }
}

export const editStatusTransaction = (idtransaction, datatransaction) => {
    return async (dispatch) => {
        try{
            await Axios.patch(API_URL_1 + `transaction/editStatusTransaction?idtransaction=${idtransaction}`, datatransaction)
            const res = await Axios.get(API_URL_1 + `transaction/getTransactionComplete`)
            dispatch({
                type: 'TRANSACTION_COMPLETE_SUCCESS',
                payload: res.data
            })
        }catch(err){
            // console.log(err)
        }
    }
}