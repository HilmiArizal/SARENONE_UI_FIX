const INITIAL_STATE = {
    dataUsers: [],
    iduser: 0,
    username: '',
    email: '',
    role: '',
    status: '',
    registerdate: '',
    registertime: '',
    phonenumber: 0,
    address: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                iduser: action.payload.iduser,
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role,
                status: action.payload.status,
                registerdate: action.payload.registerdate,
                registertime: action.payload.registertime,
                phonenumber: action.payload.phonenumber,
                address: action.payload.address
            }
        case 'DATA_USERS':
            console.log('reducer', {dataUsers:action.payload})
            return {
                dataUsers: action.payload
            }
        case 'LOGIN_FAIL':
            return INITIAL_STATE
        default:
            return state
    }
}