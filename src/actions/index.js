import axios from '../config/axios'
import cookies from 'universal-cookie'

const cookie = new cookies()

///////////////////////////////////////////////////////////////////////////////////
// USER ROUTER

// LOGIN USER (manual)
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
                return res.data
        }
            
        } catch (err) {
            console.log(err)
        }
    }
}

// LOGIN/REGISTER VIA GOOGLE
export const googleLogin = ( googleId, googleName, googleEmail, imageUrl, givenName ) => {

    return async (dispatch) => {
        try {
            const res = await axios.patch('/users/google', {
                name : googleName,
                email : googleEmail,
                avatar : imageUrl,
                social_media_id : googleId,
                username: givenName,
                login_via : 'google'
            })

            console.log(res.data)

            const { id, name, username, email, phone_number, is_admin, avatar } = res.data

            // Get addresses
            const resAddress = await axios.get(`/getaddress/${id}`)

            // console.log(resAddress.data)    // Array [ {}, {} ]
            const addresses = resAddress.data

            cookie.set('streetcrownUser', { id, name, username, email, phone_number, is_admin, avatar, addresses } )

            // kirim data_user Object{} untuk 
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    id, name, username, email, phone_number, is_admin, avatar, addresses
                }
            });
            return res.data
            
        } catch (err) {
            console.error(err)
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
   

    return async (dispatch) => {
        try {
             // remove cookie here
            await cookie.remove('streetcrownUser')
            dispatch({
                type: 'LOGOUT'
            })
        } catch (err) {
            console.error(err)
        }
    }
}

// UPDATE AVATAR
export const updateAvatar = (formData, objectUser) => {
    return async dispatch => {
        // formData = Object {}
        const { id, name, username, email, phone_number, is_admin, avatar, addresses } = objectUser
        const res = await axios.patch(`/users/avatar/${id}`, formData)
        console.log(res.data)

        cookie.remove('streetcrownUser')



        cookie.set('streetcrownUser', {id, name, username, email, phone_number, is_admin, addresses, avatar: res.data.filename} )


        console.log(res.data.message)       

        dispatch({
            type: 'UPLOAD_AVATAR',
            payload: res.data.filename
        })
    }
}

// DELETE AVATAR (avatar on database change to null, and delete .jpg on userAvatar folder)
export const deleteAvatar = ( objectUser ) => {
    return async dispatch => {

        try {
            const { id, name, username, email, phone_number, is_admin, avatar, addresses } = objectUser
            const res = await axios.delete(`/users/avatar/${id}` )
            console.log(res.data)
    
            cookie.remove('streetcrownUser')
    
            cookie.set('streetcrownUser', { id, name, username, email, phone_number, is_admin, addresses, avatar: null } )
    
            dispatch({
                type: 'DELETE_AVATAR',
            })
            
        } catch (err) {
            console.error(err)
        }

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


// COUNT ALL REGISTERD USERS
export const countUsers = () => {

    return async () => {
        const res = await axios.get('/countusers/')
        return res.data
    }
}

// COUNT ALL REGISTERD USERS
export const getAllUsers = () => {

    return async () => {
        const res = await axios.get('/allusers/')
        return res.data
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
            const resdata = await axios.post(`/addaddress/${objectUser.id}`, { address: newAddress } )
            console.log(resdata)

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
            
            return res.data
            
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
export const editProduct = (productID, name, category, price, description) => {
    return async () => {
        try {
            const res = await axios.patch(`/editproduct/${productID}`, {
                name, category, price, description
            })
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}




// DELETE PRODUCT IMAGE (PRE-EDIT)
export const deleteProductImage = (id) => {
    return async () => {
        try {
            const res = await axios.delete(`/deleteproductimage/${id}`)
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}
















// EDIT PRODUCT IMAGE
export const editProductImage = (id, formData) => {
    return async () => {
        try {
            const res = await axios.post(`/editproductimage/${id}`, formData )
            return res.data
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

        const res = await axios.get(`/getcarts/${objectUser.id}`)

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

        return res.data
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
        return res.data

    }
}

// CHANGE QUANTITY
export const changeQuantity = (id, quantity) => {

    return async () => {
        const res = await axios.patch(`/changequantity/${id}`, { quantity : quantity } )
        return res.data
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

export const deleteCartsAfterCheckout = (user_id) => {
    return async () => {
        try {
            const res = await axios.delete(`/deletecarts/${user_id}`)
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

// UPLOAD TRANSACTION PROOF BY USER (Transaction.js)
export const uploadProof = (formData) => {

    return async () => {
        try {
            const res = await axios.patch('/uploadproof', formData )

            console.log(res.data)
        } catch (err) {
            console.error(err)
        }
    }
}


//////////////////////////////////////////////////////////////////////////////////////////
//      ADMIN ROLE
export const getAllTransactions = () => {

    return async () => {
        try {
            const res = await axios.get('/alltransactions')

            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}

export const specificTransaction = (checkout_id) => {

    return async () => {
        try {
            const res = await axios.get(`/specifictransaction/${checkout_id}`)

            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}

export const addResiNumber = (id, resi) => {

    return async () => {
        try {
            const res = await axios.patch(`/addresi/${id}`, { order_resi_number : resi } )

            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}

export const deleteResiNumber = (id) => {

    return async () => {
        try {
            const res = await axios.patch(`/deleteresi/${id}`)

            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}

export const finishTransaction = (id) => {

    return async () => {
        try {
            const res = await axios.patch(`/finishtransaction/${id}`)
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}

export const unfinishedTransaction = (id) => {

    return async () => {
        try {
            const res = await axios.patch(`/unfinishedtransaction/${id}`)
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}

export const rejectTransaction = (id, proof_of_payment, order_message) => {

    return async () => {
        try {
            const res = await axios.patch(`/rejecttransaction/${id}`, { proof_of_payment, order_message } )
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}

export const deleteTransaction = (id, proof_of_payment) => {

    return async () => {

        try {
            // To delete if there is no proof_of_payment image
            console.log(proof_of_payment)
            if(proof_of_payment == null) {
                const res = await axios.delete(`/deleteTransaction/${id}`)
                return res.data
            } else {
                const res = await axios.delete(`/deletetransactionwithimage/${id}/${proof_of_payment}` )
                return res.data
            }

        } catch (err) {
            console.error(err)
        }
    }
}


export const proofImageNotificationMail = () => {

    return async () => {

        try {
            await axios.post('/notifadmins')

        } catch (err) {
            console.error(err)
        }
    }
}


//////////////////////////////////////////////////////////////////////////////////////////
//  CAR-DETAILING ROUTER


export const getDetailingData = (urlcode) => {
    // cdid = cardetailing_id
    return async () => {

        try {
            const res = await axios.get(`/cardetailing/${urlcode}`)
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}


export const carDetailingBooking = (user_id, car_detailing_id, car_brand, car_name, car_size, location_type, location_address, booking_date, contact_number, car_year, car_color) => {

    return async () => {

        try {
            const res = await axios.post('/cardetailingbooking/', {
                user_id, car_detailing_id, car_brand, car_name, car_size, location_type, location_address, booking_date, contact_number, car_year, car_color
            })
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}

export const carDetailingBooking_Guest = (name, car_detailing_id, car_brand, car_name, car_size, location_type, location_address, booking_date, contact_number, car_year, car_color) => {

    return async () => {

        try {
            const res = await axios.post('/cardetailingguestbooking/', {
                name, car_detailing_id, car_brand, car_name, car_size, location_type, location_address, booking_date, contact_number, car_year, car_color
            })
            return res.data
        } catch (err) {
            console.error(err)
        }
    }

}

export const addBookingManually_Guest = (name, car_detailing_id, car_brand, car_name, car_size, location_type, location_address, booking_date, contact_number, car_year, car_color) => {

    return async () => {

        try {
            const res = await axios.post('/addbookingmanually', {
                name, car_detailing_id, car_brand, car_name, car_size, location_type, location_address, booking_date, contact_number, car_year, car_color
            })
            return res.data
        } catch (err) {
            console.error(err)
        }
    }

}


export const getAllBooking = () => {
    return async () => {
        try {
            const res = await axios.get('/allbooking')
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}

export const getAllBooking_Guest = () => {
    return async () => {
        try {
            const res = await axios.get('/allguestbooking')
            console.log(res.data)
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}



export const editDetailingBooking = ( id, car_brand, car_name, car_year, car_color, car_size, location_address, booking_price, booking_date ) => {
    return async () => {
        try {
            const res = await axios.patch(`/booking/${id}`, {
                car_brand, car_name, car_year, car_color, car_size, location_address, booking_price, booking_date
            })
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}

export const editDetailingBooking_Guest = ( id, car_brand, car_name, car_year, car_color, car_size, location_address, booking_price, booking_date ) => {
    return async () => {
        try {
            const res = await axios.patch(`/guestbooking/${id}`, {
                car_brand, car_name, car_year, car_color, car_size, location_address, booking_price, booking_date
            })
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}

export const updateBookingStatus = (id, booking_status) => {
    return async () => {
        try {
            console.log(booking_status)
            const res = await axios.patch(`/bookingstatus/${id}`, { booking_status })
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}

export const updateBookingStatus_Guest = (id, booking_status) => {
    return async () => {
        try {
            console.log(booking_status)
            const res = await axios.patch(`/guestbookingstatus/${id}`, { booking_status })
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}

export const deleteBooking = (id) => {
    return async () => {
        try {
            const res = await axios.delete(`/booking/${id}`)
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}

export const deleteBooking_Guest = (id) => {
    return async () => {
        try {
            const res = await axios.delete(`/guestbooking/${id}`)
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}

export const getDetailingServices = () => {
    return async () => {
        try {
            const res = await axios.get('/detailingservices')
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}




