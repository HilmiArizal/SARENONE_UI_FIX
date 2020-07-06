import Axios from "axios";
import { API_URL_1 } from "../../Helpers/API_URL";


export const getCategory = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get(API_URL_1 + `categories/getCategory`)
            dispatch({
                type: 'CATEGORIES_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            // console.log(err)
        }
    }
}

export const addCategory = (image, datacategory) => {
    return async (dispatch) => {
        try {
            let formData = new FormData();
            formData.append('imagecategory', (image))
            formData.append('datacategory', JSON.stringify(datacategory))

            await Axios.post(API_URL_1 + `categories/AddCategory`, formData)
            const res = await Axios.get(API_URL_1 + `categories/getCategory`)
            dispatch({
                type: 'CATEGORIES_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            // console.log(err)
        }
    }
}

export const editCategory = (idcategory, image, datacategory) => {
    return async (dispatch) => {
        try {
            if (window.confirm('Anda yakin mengedit ini?')) {

                let formData = new FormData();
                formData.append('imagecategory', (image))
                formData.append('datacategory', JSON.stringify(datacategory))

                await Axios.patch(API_URL_1 + `categories/editCategory?idcategory=${idcategory}`, formData)
                const res = await Axios.get(API_URL_1 + `categories/getCategory`)
                dispatch({
                    type: 'CATEGORIES_SUCCESS',
                    payload: res.data
                })
            }
        } catch (err) {
            // console.log(err)
        }
    }
}

export const deleteCategory = (idcategory, categoryimage) => {
    return async (dispatch) => {
        try {
            if (window.confirm('Anda yakin menghapus ini?')) {
                await Axios.delete(API_URL_1 + `categories/deleteCategory?idcategory=${idcategory}&categoryimage=${categoryimage}`)
                const res = await Axios.get(API_URL_1 + `categories/getCategory`)
                dispatch({
                    type: 'CATEGORIES_SUCCESS',
                    payload: res.data
                })
            }
        } catch (err) {
            // console.log(err)
        }
    }
}