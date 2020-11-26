import Axios from "axios"
import { API_URL_1 } from "../../Helpers/API_URL"


export const getTransaction = () => {
    return async (dispatch) => {
        try {
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
        } catch (err) {
            // console.log(err)
        }
    }
}

export const addTransaction = (datatransaction, image) => {
    return async () => {
        try {
            let formData = new FormData();

            formData.append('imagetransaction', image)
            formData.append('datatransaction', JSON.stringify(datatransaction))

            await Axios.post(API_URL_1 + `transaction/addTransaction`, formData)

        } catch (err) {
            // console.log(err)
        }
    }
}

export const editStatusTransaction = (datetime, datatransaction) => {
    return async (dispatch) => {
        try {
            await Axios.patch(API_URL_1 + `transaction/editStatusTransaction?datetime=${datetime}`, datatransaction)
            const res = await Axios.get(API_URL_1 + `transaction/getTransactionProcess`)
            dispatch({
                type: 'TRANSACTION_PROCESS_SUCCESS',
                payload: res.data
            })
            const res2 = await Axios.get(API_URL_1 + `transaction/getTransactionSuccess`)
            dispatch({
                type: 'TRANSACTION_SUCCESS',
                payload: res2.data
            })
            const res3 = await Axios.get(API_URL_1 + `transaction/getTransactionFail`)
            dispatch({
                type: 'TRANSACTION_FAIL_SUCCESS',
                payload: res3.data
            })
        } catch (err) {
            // console.log(err)
        }
    }
}

export const deleteTransaction = (datetime) => {
    return async (dispatch) => {
        try {
            if (window.confirm('Anda yakin menghapus transaksi ini?'))
                await Axios.delete(API_URL_1 + `transaction/deleteTransaction?datetime=${datetime}`)
            const res = await Axios.get(API_URL_1 + `transaction/getTransactionProcess`)
            dispatch({
                type: 'TRANSACTION_PROCESS_SUCCESS',
                payload: res.data
            })
            const res2 = await Axios.get(API_URL_1 + `transaction/getTransactionSuccess`)
            dispatch({
                type: 'TRANSACTION_SUCCESS',
                payload: res2.data
            })
            const res3 = await Axios.get(API_URL_1 + `transaction/getTransactionFail`)
            dispatch({
                type: 'TRANSACTION_FAIL_SUCCESS',
                payload: res3.data
            })
        } catch (err) {
            // console.log(err)
        }
    }
}

export const getProvince = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL_1 + `transaction/getProvince`)
            dispatch({
                type: 'TRANSACTION_PROVINCE',
                payload: res.data.rajaongkir.results
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const getCity = (id_province) => {
    return async (dispatch) => {
        try{
            const res = await Axios.get(API_URL_1 + `transaction/getCity/${id_province}`)
            dispatch({
                type: 'TRANSACTION_CITY',
                payload: res.data.rajaongkir.results
            })
        }catch(err){
            console.log(err)
        }
    }
}