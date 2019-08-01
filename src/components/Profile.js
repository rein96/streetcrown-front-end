import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateAvatar, deleteAvatar, editProfile } from '../actions/index' 
// import axios from '../config/axios';

class Profile extends Component {

    updateProfile = () => {
        const newName   = this.name.value
        const newEmail = this.email.value
        const newPhonenumber = this.phone_number.value

        this.props.editProfile(newName, newEmail, newPhonenumber, this.props.objectUser)
    }

    pressEnterUpdate = (event) => {
        event.preventDefault()
        this.updateProfile()
    }

    deleteAvatar = () => {
        this.props.deleteAvatar(this.props.objectUser)
    }

    uploadAvatar = () => {
        // console.log(this.avatar);
        /*  [Array]
            files: 
            FileList(1)
            0: File
            lastModified: 1564489278732         ​​​
            name: "doge.jpg"  ​​​
            size: 3668
            type: "image/jpeg"
            webkitRelativePath: ""
        */
       this.props.deleteAvatar(this.props.objectUser)

       const formData = new FormData()
       
       const newAvatar = this.avatar.files[0]
       console.log(newAvatar);

       formData.append('username', this.props.objectUser.username)
       formData.append('avatar', newAvatar )
       console.log(formData)

       this.props.updateAvatar(formData, this.props.objectUser)
    }




    render() {

        if (this.props.objectUser.username === '') {
            return <center> <h1> Please login first ! :) </h1> </center>
        }
        else {
            const { username, avatar, email, phone_number, name, is_admin } = this.props.objectUser

            return (
                <div>
                    {/* Jumbotron */}
                    <div className="jumbotron container">
                        
                        <div className="row">
                            <div className="col">
                                <img src={`http://localhost:2019/users/avatar/${avatar}`} style={ { width: "200px" } }  alt="Please choose your avatar" key={ new Date() } />

                                <input type='file' className="custom-file" ref={input => this.avatar = input}  /> 

                                <button className="btn btn-primary" onClick={this.uploadAvatar} >{ avatar === null ? 'Upload Avatar' : 'Change Avatar'}</button>

                                {/* if user has an avatar, Button Delete Avatar will be appeared */}
                                {  avatar !== null ? <button className="btn btn-danger" onClick={this.deleteAvatar} >Delete Avatar</button> : ''  }
                                

                            </div>

                            <div className="col">
                                { is_admin === 1 ? <span class="badge badge-success">admin</span> : '' }

                                <h4> Name : {name} </h4>
                                <h5> Username    : {username}</h5>
                                <h5> Email       : {email} </h5>
                                <h5> Phone Number: {phone_number} </h5>
                                <br/>

                                { is_admin === 1 ? (

                                    <Link to='/admin'>
                                        <button className="btn btn-success">Dashboard Admin</button>
                                    </Link>

                                ) : '' }
                            </div>

                        </div>

                    </div>

                    {/* Edit Profile */}
                    <div className='jumbotron container'>
                        <form onSubmit={this.pressEnterUpdate}>
                            <h1>Edit Profile</h1>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input ref={input => this.name = input} type="text" className="form-control" id="name" defaultValue={name}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input ref={input => this.email = input} type="email" className="form-control" id="email" defaultValue={email}/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="age">Phone Number</label>
                                <input ref={input => this.phone_number = input} type="number" className="form-control" id="age" defaultValue={phone_number}/>
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input ref={input => this.password = input} type="password" className="form-control" id="password"/>
                            </div> */}
                            {/* <div className='custom-file'>
                                <input type='file' ref={input => {this.avatar = input}}/>
                            </div> */}
                        </form>
                        
                        <button
                            className='btn btn-primary'
                            onClick={this.updateProfile}
                        >Update Profile</button>


                    </div>

                    {/* Change Password */}
                    {/* <div className="jumbotron container">
                        <form onSubmit={this.pressEnterChangePassword}> 

                            <div className="form-group">
                                <label htmlFor="password">New Password</label>
                                <input ref={input => this.password = input} type="password" className="form-control" id="password"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Re-Type New Password</label>
                                <input ref={input => this.retype_password = input} type="password" className="form-control" id="password"/>
                            </div>

                        </form>

                    </div> */}

                </div>
            )

        }

    }   // end render()

} // end Component 

const mapStateToProps = state =>{
    return {
        objectUser : state.auth     // { id, name, username, email, phone_number, is_admin, avatar }
    }
}


export default connect(mapStateToProps, { updateAvatar, deleteAvatar, editProfile })(Profile);
