import { combineReducers } from 'redux'

import AuthReducer from './AuthReducer'
import ProductReducer from './ProductReducer'
import CartReducer from './CartReducer'

const carts = CartReducer

export default combineReducers({
    auth: AuthReducer,
    product: ProductReducer,
    carts
})