// import streetcrownlogodefault from '../images/streetcrown-logo.png'

const init = {
    id:'',
    name: '',
    username: '',
    email:'',
    phone_number:'',
    is_admin:'',
    avatar: '',
    addresses: [],
    login_via : ''
}

export default (state = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            const { id, name, username, email, phone_number, is_admin, avatar, addresses } = action.payload
            return {
                ...state,
                id, name, username, email, phone_number, is_admin, avatar, addresses
            }

        case 'LOGOUT' :
            return{
                id:'',
                name: '',
                username: '',
                email:'',
                phone_number:'',
                is_admin:'',
                avatar:'',
                addresses:[]
            }

        case 'UPLOAD_AVATAR' :
            return{
                ...state,
                avatar: action.payload
            }

        case 'DELETE_AVATAR' :
            return{
                ...state,
                avatar: null
            }

        case 'EDIT_PROFILE' :
            return{
                ...state,
                name: action.payload.newName,
                email : action.payload.newEmail,
                phone_number : action.payload.newPhonenumber
            }

        case 'GET_ADDRESSES' :
        case 'ADD_ADDRESS' :
        case 'DELETE_ADDRESS' :
            return {
                ...state,
                addresses : action.payload
            }

        default:
            return state
    }
}