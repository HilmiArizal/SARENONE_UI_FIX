import Axios from "axios";
import { API_URL_1 } from "../../Helpers/API_URL";
import Swal from 'sweetalert2';


export const getAllUsers = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL_1 + `users/getAllUsers`)
            dispatch({
                type: 'DATA_USERS',
                payload: res.data
            })
        } catch (err) {
            // console.log(err)
        }
    }
}

export const registerUser = (dataRegister) => {
    return async () => {
        try {
            await Axios.post(API_URL_1 + `users/registerUser`, dataRegister)
        } catch (err) {
            // console.log(err)
        }
    }
}

export const verifiedAccount = (token, headers) => {
    return async () => {
        try {
            await Axios.patch(API_URL_1 + `users/emailVerification`, {}, headers)
            localStorage.setItem('token', token)

        } catch (err) {
            // console.log(err)
        }
    }
}

export const loginUser = (dataLogin) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post(API_URL_1 + `users/loginUser`, dataLogin)
            if (res.data.role === 'user') {
                if (res.data.length !== 0) {
                    localStorage.setItem('token', res.data.token)
                    Swal.fire({
                        showConfirmButton: false,
                        timer: 1000,
                        title: `Hi, ${dataLogin.username}`
                    })
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: res.data
                    })
                }
            } else if (res.data.role === 'admin') {
                Swal.fire({
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 1000,
                    title: 'Username tidak terdaftar'
                })
            }
        } catch (err) {
            localStorage.removeItem('token')
            Swal.fire({
                icon: 'warning',
                showConfirmButton: false,
                timer: 1000,
                title: err.response.data
            })
            dispatch({
                type: 'LOGIN_FAIL'
            })
        }
    }
}

export const loginAdmin = (dataLogin) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post(API_URL_1 + `users/loginUser`, dataLogin)
            if (res.data.role === 'admin') {
                if (res.data.length !== 0) {
                    localStorage.setItem('token', res.data.token)
                    Swal.fire({
                        showConfirmButton: false,
                        timer: 1000,
                        title: `Hi, ${dataLogin.username}`
                    })
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: res.data
                    })
                }
            } else if (res.data.role === 'user') {
                Swal.fire({
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 1000,
                    title: 'Username tidak terdaftar'
                })
            }
        } catch (err) {
            localStorage.removeItem('token')
            Swal.fire({
                icon: 'warning',
                showConfirmButton: false,
                timer: 1000,
                title: err.response.data
            })
            dispatch({
                type: 'LOGIN_FAIL'
            })
        }
    }
}

export const keepLogin = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const headers = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                const res = await Axios.post(API_URL_1 + `users/keepLogin`, {}, headers)
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: res.data
                })
            }
        } catch (err) {
            dispatch({
                type: 'LOGIN_FAIL'
            })
        }
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        try {
            localStorage.removeItem('token')
            Swal.fire({
                showConfirmButton: false,
                timer: 2000,
                title: `Terimakasih`
            })
            dispatch({
                type: 'LOGIN_FAIL'
            })
        } catch (err) {
            // console.log(err)
        }
    }
}