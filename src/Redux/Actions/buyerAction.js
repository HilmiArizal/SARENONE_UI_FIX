import Axios from "axios"
import { API_URL_1 } from "../../Helpers/API_URL"


export const addProfileData = (profiledata) => {
    return async () => {
        try {
            await Axios.post(API_URL_1 + `buyer/addProfileData`, profiledata)
            console.log(profiledata)
        } catch (err) {
            console.log(err)
        }
    }
}

export const editProfileData = (profiledata) => {
    return async () => {
        await Axios.patch(API_URL_1 + `buyer/editProfileData?transactionId=${profiledata.transactionId}`, profiledata)
    }
}

export const editProfileBuyer = (idprofilebuyer) => {
    return async (dispatch) => {
        try {
            await Axios.patch(API_URL_1 + `buyer/editProfileBuyer?idprofilebuyer=${idprofilebuyer}`)
            const res = await Axios.get(API_URL_1 + `buyer/getProfileBuyerId?idprofilebuyer=${idprofilebuyer}`)
            dispatch({
                type: 'BUYER_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}