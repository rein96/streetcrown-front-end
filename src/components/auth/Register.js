import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha";
import axios from '../../config/axios'
import {connect} from 'react-redux'


import '../../css/auth.css'

// const recaptchaRef = React.createRef();

class Register extends Component {

    state = {
        register : false,
        recaptcha : ''
    }

    pressEnter = (event) => {
        event.preventDefault();
        this.onButtonClick()
    }

    onButtonClick = async () => {
        const data_name = this.name.value;
        const data_username = this.username.value;
        const data_email = this.email.value;
        const data_phone_number = this.phone_number.value;
        const data_password = this.password.value;
        const data_retype_password = this.retype_password.value;

        // console.log(data_name,data_username,data_email,data_phone_number,data_password,data_retype_password);
        // name minimum 3, username minimum 3, email, phone_number ?, password minimum 6 string
        console.log(data_name)
        if(data_name.length < 3){ return alert('Please input minimum 3 characters for name :)') }
        if(data_username.length < 3){ return alert('Please input minimum 3 characters for username :)') }
        if(data_password !== data_retype_password) {
            return alert('Password is not match :(');
        }

        if(this.state.recaptcha === '') { return alert('Please verify that you are not a robot !') }

        try {
            const res = await axios.post('/users', {
                name: data_name,
                username: data_username,
                email: data_email,
                phone_number : data_phone_number,
                password: data_password        
            })

            console.log(res.data)
            console.log(typeof(res.data))

            if( typeof(res.data) === 'string' ) {
                return alert(res.data)
            }

            if( res.data.sqlMessage ) {
                return alert(res.data.sqlMessage)
            }

            if (typeof(res.data) === 'object' ) {
                alert('Registration Success! Please login now :)')
                this.setState( { register: true } )
            }
            
        } catch (err) {
            console.log(err)
            alert(err);
        }
    }

    onChangeRecaptcha = (value) => {
        console.log("Captcha value:", value)
        this.setState( { recaptcha : value } )
    }

    render() {

        // if user has already logged in, cannot access register form
        if (this.props.objectUser.username !== '') {
            return <Redirect to='/' />
        }

        // if user has registered, then redirect to login form
        if (this.state.register === true) {
            return <Redirect to='/login' />
        }

        if(this.state.register === false || this.props.objectUser.username === '') {

            return (
                <div class="container py-5">
                <div class="row">
                    <div class="col-md-12">
                        <h2 class="text-center text-dark mb-4">Register Form</h2>
                        <div class="row">
                            <div class="col-md-6 mx-auto">
    
                                {/* Form Card Login */}
                                <div class="card radius-custom">
                                    <div class="card-header radius4-custom" style={{ "border-radius": "25px 25px 0px 0px" }}>
                                        <h3 class="mb-0">Register</h3>
                                    </div>
                                    <div class="card-body" >
    
                                        <form onSubmit={this.pressEnter}>
    
                                            <div class="form-group">
                                                <label for="uname1">Name</label>
                                                <form className="input-group">
                                                    <input ref={input => this.name = input} className="form-control" type="text" placeholder="Name" required />
                                                </form>
                                                <small class="form-text text-muted">Minimum 3 characters.</small> 
                                            </div>
    
                                            <div class="form-group">
                                                <label for="uname1">Username</label>
                                                <form className="input-group">
                                                    <input ref={input => this.username = input} className="form-control" type="text" placeholder="Username" required />
                                                </form> 
                                                <small class="form-text text-muted">Minimum 3 characters.</small>
                                            </div>
                                        
                                            <div class="form-group">
                                                <label for="uname1">Email</label>
                                                <form className="input-group">
                                                    <input ref={input => this.email = input} className="form-control" type="email" placeholder="Email" required />
                                                </form>
                                                <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                                            </div>
    
                                            <div class="form-group">
                                                <label for="uname1">Phone Number</label>
                                                <form className="input-group">
                                                    <input ref={input => this.phone_number = input} className="form-control" type="number" placeholder="Phone Number" required />
                                                </form>
                                            </div>
    
                                            <div class="form-group">
                                                <label>Password</label>
                                                <form className="input-group">
                                                    <input ref={input => this.password = input} className="form-control" type="password" placeholder="Password" minimum="1" required  />
                                                </form>
                                                <small class="form-text text-muted">Minimum 6 characters. Don't worry, your password is hashed.</small>
                                            </div>
    
                                            <div class="form-group">
                                                <label>Re-Type Password</label>
                                                <form className="input-group">
                                                    <input ref={input => this.retype_password = input} className="form-control" type="password" placeholder="Re-Type Password" required />
                                                </form>
                                                <small class="form-text text-muted">Minimum 6 characters. Don't worry, your password is hashed.</small>
                                            </div>
                                            
                                            <center>

                                            <ReCAPTCHA
                                                ref={ input => this.recaptchaRef = input }
                                                sitekey="6LfM0bUUAAAAAIr8RfeawSezD-ma0Uow0flOP0Dy"
                                                onChange={this.onChangeRecaptcha}
                                                theme="light"
                                                size="normal"
                                            />
                                            <br/>
                                            </center>
    
                                        </form>
                                            <button className="btn btn-danger btn-block radius-custom" onClick={this.onButtonClick}>Register</button>
                                            <br/>
    
                                            <p className="lead">Do you have an account ? <Link to="/login">Login Now!</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

            )
        } 
        
    }
}

const mapStateToProps = state => {
    return {
        objectUser: state.auth  // { id, name, username, email, phone_number, is_admin, avatar }
    }
}

export default connect(mapStateToProps)(Register);