import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
// import { connect } from 'react-redux' 
// import cookies from 'universal-cookie';

import Header from './components/Header'
import Home from './components/home/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Products from './components/Products'
import Cart from './components/Cart'
import Admin from './components/admin/Admin'
import Checkout from './components/Checkout'
import Profile from './components/Profile'

// New object cookies()

class App extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }


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
                    {/* Belom dikerjakan */}
                    <Route path='/cart' component={Cart} />
                    <Route path='/admin' component={Admin} />
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/profile' component={Profile} />


                </Switch>

            
            </BrowserRouter>
        )

    }
    

}

export default App;