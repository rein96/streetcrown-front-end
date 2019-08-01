import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'


import {onLogin} from '../../actions/index'

import '../../css/auth.css'

class Login extends Component {

    pressEnter = (event) => {
        event.preventDefault()
        this.onButtonClick()
    }

    onButtonClick = () => {
        const data_email = this.email.value
        const data_password = this.password.value

        this.props.onLogin(data_email, data_password)
    }


    render() {
        console.log(this.props.objectUser)

        if(this.props.objectUser.username === '') {
            return(
                <div class="container py-5">
                    <div class="row">
                        <div class="col-md-12">
                            <h2 class="text-center text-dark mb-4">Login Form</h2>
                            <div class="row">
                                <div class="col-md-6 mx-auto">
    
                                    <div class="card radius-custom">
    
                                        <div class="card-header radius4-custom" style={{ "border-radius": "25px 25px 0px 0px" }}>
                                            <h3 class="mb-0">Login</h3>
                                        </div>
    
                                        <div class="card-body">
    
                                        <form onSubmit={this.pressEnter}>
    
                                            <div class="form-group">
                                                <label for="uname1">Email</label>
                                                <form className="input-group">
                                                    <input ref={input => this.email = input} className="form-control radius-custom" type="email" placeholder="Email" required/>
                                                </form>
                                            </div>
    
                                            <div class="form-group">
                                                <label>Password</label>
                                                <form className="input-group">
                                                    <input ref={input => this.password = input} className="form-control radius-custom" type="password" placeholder="Password"  required />
                                                </form>
                                            </div>
    
                                        </form>
                                            
                                            <button className="btn btn-success btn-block radius-custom" onClick={ () => this.onButtonClick()}>Login</button>
    
                                            <p className="lead">Don't have an account ? <Link to="/register">Register Now!</Link></p>
    
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            )
        }

        // If user has already logged in
        return <Redirect to='/' />


    }
}

const mapStateToProps = state => {
    return {
        objectUser : state.auth // { id, name, username, email, phone_number, is_admin, avatar }
    }
}

export default connect(mapStateToProps,{ onLogin })(Login);