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
            
            // set cookie
            cookie.set('streetcrownUser', { id, name, username, email, phone_number, is_admin, avatar } )


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

export const keepLogin = (objectUser) => {

    const { id, name, username, email, phone_number, is_admin, avatar } = objectUser

    return{
        type: 'LOGIN_SUCCESS',
        payload: {
            id, name, username, email, phone_number, is_admin, avatar
        }
    }
}

// LOGOUT USER
export const onLogout = () => {
    // remove cookie here
    cookie.remove('streetcrownUser')

    return{
        type:'LOGOUT'
    }
}

// UPDATE AVATAR
export const updateAvatar = (formData, objectUser) => {
    return async dispatch => {
        // formData = Object {}
        const res = await axios.post('/users/avatar', formData)

        cookie.remove('streetcrownUser')

        const { id, name, username, email, phone_number, is_admin, avatar } = objectUser

        cookie.set('streetcrownUser', {id, name, username, email, phone_number, is_admin, avatar: res.data.filename} )


        alert(res.data.message)       

        dispatch({
            type: 'UPLOAD_AVATAR',
            payload: res.data.filename
        })
    }
}

// DELETE AVATAR (avatar on database change to null, and delete .jpg on userAvatar folder)
export const deleteAvatar = ( objectUser ) => {
    return async dispatch => {
        const { id, name, username, email, phone_number, is_admin, avatar } = objectUser
        const res = await axios.delete('/users/avatar', { username } )

        cookie.remove('streetcrownUser')

        cookie.set('streetcrownUser', { id, name, username, email, phone_number, is_admin, avatar: null } )

        dispatch({
            type: 'DELETE_AVATAR',
        })
    }
}

export const editProfile = (newName, newEmail, newPhonenumber, objectUser) => {

    const { id, name, username, email, phone_number, is_admin, avatar } = objectUser

    return async dispatch => {
        const res = await axios.patch(`/users/profile/${objectUser.username}`, {
            name : newName,
            email : newEmail,
            phone_number: newPhonenumber
        });

        cookie.remove('streetcrownUser')

        cookie.set('streetcrownUser', {
            id,
            name: newName, 
            username,
            email : newEmail, 
            phone_number : newPhonenumber,
            is_admin,
            avatar 
        })

        alert('Profile has been updated !')

        dispatch({
            type: 'EDIT_PROFILE',
            payload: {
                newName,
                newEmail,
                newPhonenumber
            }
        })



    }
}