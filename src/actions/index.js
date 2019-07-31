import axios from '../config/axios'
import cookies from 'universal-cookie'

const cookie = new cookies()

// LOGIN USER
export const onLogin = (inputEmail, inputPassword) => {
    // redux-thunk dispatch
    return async (dispatch) => {
        const res = await axios.post('/users/login', {
            email : inputEmail,
            password : inputPassword
        })

        try {
        // If email or password is incorrect , res = 'string' error
        if(typeof(res.data) === 'string' ){
            alert(res.data)
        } else {

            const { id, name, username, email, phone_number, is_admin, avatar } = res.data

            // const data_user = {
            //     id: res.data.id,
            //     name: res.data.name,
            //     username: res.data.username,
            //     email : res.data.email,
            //     phone_number : res.data.phone_number,
            //     is_admin : res.data.is_admin,
            //     avatar : res.data.avatar
            // }
            // set cookie


            // kirim data_user Object{} untuk 
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    id, name, username, email, phone_number, is_admin, avatar
                }
            });
        }
            
        } catch (err) {
            console.log(err)
        }


    }
}