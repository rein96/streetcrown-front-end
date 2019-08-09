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
import Admin from './components/admin/Admin'
import Checkout from './components/Checkout'
import Profile from './components/Profile'
import ProductDetail from './components/ProductDetail'
import Transaction from './components/Transaction'

import { keepLogin } from './actions/index'

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

    // componentDidMount() {
    //     window.scrollTo(0, 0);
    // }


    // Initialize cookie componentDidMount() {}  

    render() {
        return (
            <BrowserRouter>
                <Header />

                <Switch>
                    <Route path='/' exact component={Home}  />
                    <Route path='/login' component={Login}  />
                    <Route path='/register' component={Register} />
                    <Route path='/products' component={Products} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/admin' component={Admin} />
                    <Route path='/productdetail/:productID' component={ProductDetail} />
                    <Route path='/cart' component={Cart} />
                    <Route path='/checkout' component={Checkout} />

                    {/* Belom dikerjakan */}
                    <Route path='/transaction' component={Transaction} />
                    


                </Switch>

            
            </BrowserRouter>
        )

    }
    

}

export default connect(null, {keepLogin} )(App);