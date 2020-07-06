import Axios from "axios"
import { API_URL_1 } from "../../Helpers/API_URL"


export const getPrice = () => {
    return async (dispatch) => {
        try{
            const res = await Axios.get(API_URL_1 + `price/getPrice`)
            dispatch({
                type: 'PRICE_SUCCESS',
                payload: res.data
            })
        }catch(err){
            // console.log(err)
        }
    }
}

export const addPrice = (dataprice) => {
    return async (dispatch) => {
        try{
            await Axios.post(API_URL_1 + `price/addPrice`, dataprice)
            const res = await Axios.get(API_URL_1 + `price/getPrice`)
            dispatch({
                type: 'PRICE_SUCCESS',
                payload: res.data
            })
        }catch(err){
            // console.log(err)
        }
    }
}

export const editPrice = (idprice, dataprice) => {
    return async (dispatch) => {
        try{
            await Axios.patch(API_URL_1 + `price/editPrice?idprice=${idprice}`, dataprice)
            const res = await Axios.get(API_URL_1 + `price/getPrice`)
            dispatch({
                type: 'PRICE_SUCCESS',
                payload: res.data
            })
        }catch(err){
            // console.log(err)
        }
    }
}

export const deletePrice = (idprice) => {
    return async (dispatch) => {
        try{
            if(window.confirm('Anda yakin menghapus list ini?')){
                await Axios.delete(API_URL_1 + `price/deletePrice?idprice=${idprice}`)
                const res = await Axios.get(API_URL_1 + `price/getPrice`)
                dispatch({
                    type: 'PRICE_SUCCESS',
                    payload: res.data
                })
            }
        }catch(err){
            // console.log(err)
        }
    }
}