import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import Swal from 'sweetalert2'
import { GoogleLogin } from 'react-google-login';

import {onLogin, googleLogin} from '../../actions/index'
import configAPI from '../../config/configAPI'

import '../../css/auth.css'

// import google from '../../images/google.png'

// On login-socmed branch, I want to integrate Login With SocialMedia + Login-Register manually.
class Login extends Component {

    pressEnter = (event) => {
        event.preventDefault()
        this.onButtonClick()
    }

    onButtonClick = async () => {
        const data_email = this.email.value
        const data_password = this.password.value
        if(data_email.length === 0) { return alert('Please input your email') } 
        if(data_password.length === 0) { return alert('Please input your password') } 

        const resdata = await this.props.onLogin(data_email, data_password)
        console.log(resdata)
        if(resdata === undefined){ return console.log('login failed') }
        if(resdata.username){
            window.location.reload()
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              })
              
              Toast.fire({
                type: 'success',
                title: 'Signed in successfully'
              })
        }   
    }

    googleResponse = async (response) => {
        console.log(response);

        let { googleId, name, email, imageUrl, givenName } = response.profileObj

        const resdata = await this.props.googleLogin( googleId, name, email, imageUrl, givenName)
        console.log(resdata)

        if(resdata.email){
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000
            })
            
            Toast.fire({
                type: 'success',
                title: 'Signed in via Google Success!'
            })
            window.location.reload()
        }

    };

    onFailure = (error) => {
        // alert(JSON.stringify(error));
        console.log('Google Authentication is cancelled by user')
        console.log(error)
    };


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

                                            <br/>
                                            <GoogleLogin
                                                clientId={configAPI.GOOGLE_CLIENT_ID}
                                                buttonText={<div style={centerPlease}>Login With Google</div>}
                                                onSuccess={this.googleResponse}
                                                onFailure={this.onFailure}
                                                className="btn-block"
                                                // render={renderProps => (
                                                //     <button className="btn btn-light btn-block" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                                //         <img src={google} alt="google" className="text-left" style={{ width: '30px' }} />Login with Google</button>
                                                // )}
                                            />

                                            <br/><br/>

                                            <center>OR</center>

                                            {/* <div className="line-custom">OR</div> */}

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
                                            
                                            <button className="btn btn-danger btn-block radius-custom" onClick={ () => this.onButtonClick()}>Login</button>
                                            <br/>
    
                                            <p className="lead">Don't have an account ? <Link to="/register"> Register Now !  </Link></p>
    
                                        </div>

                                        
                                        
                                    </div>
                                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
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

const centerPlease = {
    // fontWeight: 'bold',
    // fontSize: '1.5rem',
    color: 'black',
    fontFamily: 'Montserrat'
}

const mapStateToProps = state => {
    return {
        objectUser : state.auth // { id, name, username, email, phone_number, is_admin, avatar }
    }
}

export default connect(mapStateToProps,{ onLogin, googleLogin })(Login);