import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux' 
import cookies from 'universal-cookie';

import Header from './components/Header'
import Home from './components/home/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Products from './components/Products'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Profile from './components/Profile'
import ProductDetail from './components/ProductDetail'
import TransactionUser from './components/TransactionUser'
import Admin from './components/admin/Admin'
import ManageProducts from './components/admin/ManageProducts'
import ManageTransactions from './components/admin/ManageTransactions'
import ManageUsers from './components/admin/ManageUsers'
import EditProduct from './components/admin/EditProduct'
import CarDetailing from './components/services/CarDetailing'
import MotorcycleDetailing from './components/services/MotorcycleDetailing'

import { keepLogin } from './actions/index'
import HomeModal from './components/home/HomeModal'
import Footer from './components/home/Footer'

// New object cookies()
const cookie = new cookies()

class App extends Component {

    // fires immediately before the initial render -> cookie
    componentWillMount() {
        window.scrollTo(0, 0);
        var user = cookie.get('streetcrownUser')

        console.log('user (streetcrownUser cookie):')
        console.log(user)

        // if cookie successfully get, it will become a object { ... }
        if(user) {
            this.props.keepLogin(user)
        }
    }

    // Initialize cookie componentDidMount() {}  

    render() {
        return (
            <BrowserRouter>
                <Header />

                <Switch>
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
                    {/* User */}
                    <Route path='/profile' component={Profile} />
                    <Route path='/cart' component={Cart} />
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/transaction' component={TransactionUser} />
                    {/* Admin */}
                    <Route path='/admin' component={Admin} />
                    <Route path='/manageproducts' component={ManageProducts} />
                    <Route path='/managetransactions' component={ManageTransactions} />
                    <Route path='/manageusers' component={ManageUsers} />
                    <Route path='/editproduct/:productID' component={EditProduct} />

                </Switch>
                <Footer  />
                <HomeModal />

            
            </BrowserRouter>
        )

    }
}

export default connect(null, {keepLogin} )(App);