const init = {
    id:'',
    name: '',
    username: '',
    email:'',
    phone_number:'',
    is_admin:'',
    avatar:''
}

export default (state = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            const { id, name, username, email, phone_number, is_admin, avatar } = action.payload
            return {
                ...state,
                id, name, username, email, phone_number, is_admin, avatar
            }

        default:
            return state
    }
}