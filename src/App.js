import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux' 
import cookies from 'universal-cookie';

import Header from './components/home/Header'
import Home from './components/home/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Products from './components/product/Products'
import Cart from './components/user/Cart'
import Checkout from './components/user/Checkout'
import Profile from './components/user/Profile'
import ProductDetail from './components/product/ProductDetail'
import TransactionUser from './components/user/TransactionUser'
import Admin from './components/admin/Admin'
import ManageProducts from './components/admin/ManageProducts'
import ManageTransactions from './components/admin/ManageTransactions'
import ManageBooking from './components/admin/ManageBooking'
import ManageUsers from './components/admin/ManageUsers'
import EditProduct from './components/admin/EditProduct'
import CarDetailing from './components/services/CarDetailing'
import MotorcycleDetailing from './components/services/MotorcycleDetailing'
import BookingForm from './components/services/BookingForm'
import ScrollToTop from './components/ScrollToTop'

import { keepLogin } from './actions/index'
import HomeModal from './components/home/HomeModal'
import Footer from './components/home/Footer'

// New object cookies()
const cookie = new cookies()

class App extends Component {

    // fires immediately before the initial render -> cookie
    componentWillMount() {
        var user = cookie.get('streetcrownUser')

        console.log('user (streetcrownUser cookie):')
        console.log(user)

        // if cookie successfully get, it will become a object { ... }
        if(user) {
            this.props.keepLogin(user)
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Header />

                <Switch>
                    <ScrollToTop>
                        <Route path='/' exact component={Home}  />
                        {/* Auth */}
                        <Route path='/login' component={Login}  />
                        <Route path='/register' component={Register} />
                        {/* Products */}
                        <Route path='/products' component={Products} />
                        <Route path='/productdetail/:productID' component={ProductDetail} />
                        {/* Services */}
                        <Route path='/cardetailing' component={CarDetailing} />
                        <Route path='/motorcycledetailing' component={MotorcycleDetailing} />
                        <Route path='/bookingform/:servicename' component={BookingForm} />
                        {/* User */}
                        <Route path='/profile' component={Profile} />
                        <Route path='/cart' component={Cart} />
                        <Route path='/checkout' component={Checkout} />
                        <Route path='/transaction' component={TransactionUser} />
                        {/* Admin */}
                        <Route path='/admin' component={Admin} />
                        <Route path='/manageproducts' component={ManageProducts} />
                        <Route path='/managetransactions' component={ManageTransactions} />
                        <Route path='/managebooking' component={ManageBooking} />
                        <Route path='/manageusers' component={ManageUsers} />
                        <Route path='/editproduct/:productID' component={EditProduct} />

                    </ScrollToTop>
                </Switch>
                <Footer  />
                <HomeModal />

            
            </BrowserRouter>
        )
    }
}

export default connect(null, {keepLogin} )(App);