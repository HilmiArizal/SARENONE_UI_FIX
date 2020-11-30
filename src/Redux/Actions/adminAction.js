import Axios from "axios";
import { API_URL_1 } from "../../Helpers/API_URL";


export const getAllUsers_Admin = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL_1 + `users/getAllUsers`)
            dispatch({
                type: 'DATA_USERS_ADMIN',
                payload: res.data
            })
        } catch (err) {
            // console.log(err)
        }
    }
}

export const deleteAccount = (iduser) => {
    return async (dispatch) => {
        try {
            if (window.confirm('Anda yakin menghapus akunnya?')) {
                await Axios.delete(API_URL_1 + `users/deleteAccount?iduser=${iduser}`)
                const res = await Axios.get(API_URL_1 + `users/getAllUsers`)
                dispatch({
                    type: 'DATA_USERS_ADMIN',
                    payload: res.data
                })
            }
        } catch (err) {
            // console.log(err)
        }
    }
}

export const getAllAdminOnly = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL_1 + `users/getAdminOnly?role=admin`)
            dispatch({
                type: 'ADMIN_ONLY_SUCCESS',
                payload: res.data
            })
        }catch(err){
            console.log(err)
        }
    }
}