import axios from '../config/axios'
import cookies from 'universal-cookie'

const cookie = new cookies()

///////////////////////////////////////////////////////////////////////////////////
// USER ROUTER

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

                // Get addresses
                const resAddress = await axios.get(`/getaddress/${id}`)

                // console.log(resAddress.data)    // Array [ {}, {} ]
                const addresses = resAddress.data
                
                // set cookie
                cookie.set('streetcrownUser', { id, name, username, email, phone_number, is_admin, avatar, addresses } )


                // kirim data_user Object{} untuk 
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        id, name, username, email, phone_number, is_admin, avatar, addresses
                    }
            });
        }
            
        } catch (err) {
            console.log(err)
        }
    }
}

// KEEP LOGIN COOKIE
export const keepLogin = (objectUser) => {

    const { id, name, username, email, phone_number, is_admin, avatar, addresses } = objectUser

    return{
        type: 'LOGIN_SUCCESS',
        payload: {
            id, name, username, email, phone_number, is_admin, avatar, addresses
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

        const { id, name, username, email, phone_number, is_admin, avatar, addresses } = objectUser

        cookie.set('streetcrownUser', {id, name, username, email, phone_number, is_admin, addresses, avatar: res.data.filename} )


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
        const { id, name, username, email, phone_number, is_admin, avatar, addresses } = objectUser
        const res = await axios.delete('/users/avatar', { username } )

        cookie.remove('streetcrownUser')

        cookie.set('streetcrownUser', { id, name, username, email, phone_number, is_admin, addresses, avatar: null } )

        dispatch({
            type: 'DELETE_AVATAR',
        })
    }
}

// EDIT PROFILE 
export const editProfile = (newName, newEmail, newPhonenumber, objectUser) => {

    const { id, name, username, email, phone_number, is_admin, avatar, addresses } = objectUser

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
            avatar,
            addresses
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ADDRESS ROUTE


// Get All Addresses
export const getAddresses = (objectUser) => {
    const { id, name, username, email, phone_number, is_admin, avatar, addresses } = objectUser

    return async (dispatch) => {
        const res = await axios.get(`/getaddress/${objectUser.id}`)

        // cookie.set('streetcrownUser', { id, name, username, email, phone_number, is_admin, avatar, addresses } )

        // console.log(res.data)

        dispatch({
            type: 'GET_ADDRESSES',
            payload: res.data
        })
    }
}

// Add Address
export const addAddress = (newAddress, objectUser) => {

    const { id, name, username, email, phone_number, is_admin, avatar, addresses } = objectUser

    return async dispatch => {

        try {
            await axios.post(`/addaddress/${objectUser.id}`, { address: newAddress } )

            // Select addresses to get user_id and id of address column
            const resSelectAddreses = await axios.get(`/getaddress/${objectUser.id}`)

            console.log(resSelectAddreses.data);    // updated


            cookie.remove('streetcrownUser')

            cookie.set('streetcrownUser', { id, name, username, email, phone_number, is_admin, addresses : resSelectAddreses.data, avatar } )


            dispatch({
                type: 'ADD_ADDRESS',
                payload: resSelectAddreses.data
            })
            
            
        } catch (err) {
            console.error(err)
        }
    }
}

// DELETE ADDRESS
export const deleteAddress = (addressId, objectUser) => {

    return async dispatch => {

        try {

            const { id, name, username, email, phone_number, is_admin, avatar, addresses } = objectUser

            await axios.delete(`/deleteaddress/${addressId}`)

            // Select addresses to get user_id and id of address column
            const resSelectAddreses = await axios.get(`/getaddress/${objectUser.id}`)

            console.log(resSelectAddreses.data);    // updated


            cookie.remove('streetcrownUser')

            cookie.set('streetcrownUser', { id, name, username, email, phone_number, is_admin, addresses : resSelectAddreses.data, avatar } )

            dispatch({
                type: 'DELETE_ADDRESS',
                payload: resSelectAddreses.data
            })
            
            
        } catch (err) {
            console.error(err)
        }
    }
}




///////////////////////////////////////////////////////////////////////////////////////////////////////
// PRODUCT ROUTER

// INPUT PRODUCT
export const addProduct = (formData) => {
    return async () => {

        try {
            const res = await axios.post('/addproduct', formData )
            console.log(res.data)
            
        } catch (err) {
            console.error(err)
        }
    }
}

// GET ALL PRODUCTS
export const getProducts = () => {

    return async (dispatch) => {
        try {
            const res = await axios.get('/getproducts')

            console.log(res.data)   // array of objects


            dispatch({
                type: 'GET_PRODUCTS',
                payload: res.data
            })
            
        } catch (err) {
            console.error(err)
        }
    }
}

// DELETE PRODUCT
export const deleteProduct = (productID) => {
    return async () => {
        try {
            const res = await axios.delete(`/deleteproduct/${productID}`)

            console.log(res.data)

            alert(res.data)
        } catch (err) {
            console.error(err)
        }
    }
}

// EDIT PRODUCT
export const editProduct = (productID) => {
    return async () => {
        try {
            
        } catch (err) {
            console.error(err)
        }
    }
}

// READ A PRODUCT
// export const getSingleProduct = (productID) => {
//     return async () =>{ 

//     }
// }



/////////////////////////////////////////////////////////////////////////////////////////////////
// CART ROUTER

// GET USER CART
export const getCarts = (objectUser) => {

    return async dispatch => {
        const { id, name, username, email, phone_number, is_admin, avatar, addresses } = objectUser

        const res = await axios.get(`/getcarts/${id}`)

        // console.log(res.data)
        // cookie.set('streetCrownUserCart')

        dispatch({
            type: 'GET_CARTS',
            payload: res.data
        })
    }
}


// ADD CART
export const addCart = (productID, userID, quantity) => {

    return async () => {
        const res = await axios.post('/addcart', {
            product_id : productID,
            user_id : userID,
            quantity: quantity
        })

        console.log(res.data)

        if(res.data.insertId) {
            alert('Product has been added to your cart :)')
        }
    }
}


// PATCH QUANTITY CART
export const updateQuantity = (quantity, product_id, user_id) => {

    return async () => {
        const res = await axios.patch('/updatequantity', {
            quantity,
            product_id,
            user_id
        })

        console.log(res.data)

        if(res.data.insertId === 0) {
            alert('The product on your cart has been updated ! :) ')
        }
    }
}

// DELETE CART
export const deleteCart = (id) => {

    return async () => {
        try {
            const res = await axios.delete( `/deletecart/${id}` )
            console.log(res.data)
        } catch (err) {
            console.error(err)
        }
    }
}

// PATCH CART STATUS TO 'Checkout'
export const patchCartStatus = (user_id) => {

    return async () => {
        try {
            const res = await axios.patch(`/patchcart/${user_id}`)

            console.log(res.data)

        } catch (err) {
            console.error(err)
        }
    }
}



////////////////////////////////////////////////////////////////////////////////////
// CHECKOUT

// POST CHECKOUT
export const postCheckout = ( user_id, price_total, order_recipient, order_address, order_phone_number, allCartsArray ) => {

    return async () => {
        try {
            const res = await axios.post('/checkout', {
                user_id, price_total, order_recipient, order_address, order_phone_number, allCartsArray
            })
            console.log(res.data)

            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}

// GET TRANSACTION CHECKOUT FOR USER (Transaction.js)
export const getTransaction = (user_id) => {

    return async () => {
        try {
            const res = await axios.get(`/transaction/${user_id}`)

            return res.data
            
        } catch (err) {
            console.error(err)
        }
    }
}