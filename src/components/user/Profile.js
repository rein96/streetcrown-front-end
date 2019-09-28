import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateAvatar, deleteAvatar, editProfile, addAddress, getAddresses, deleteAddress } from '../../actions/index' 
// import axios from '../config/axios';

import avatar_default from '../../images/avatar_default.png'

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

    uploadAvatar = async () => {
        // console.log(this.avatar.files);
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
       const newAvatar = this.avatar.files[0]
       console.log(newAvatar);

       if(newAvatar) {

            if(newAvatar.size > 1000000){
                return alert('Maximum size is 1 MB !')
            }

            const formData = new FormData()

            formData.append('username', this.props.objectUser.username)
            formData.append('avatar', newAvatar )

            
            if( this.props.objectUser.avatar !== null ) {
                await this.props.deleteAvatar(this.props.objectUser)
            }

            await this.props.updateAvatar(formData, this.props.objectUser)

       }
    }

    addAddress = () => {
        const newAddress = this.address.value

        if(newAddress === '') { return alert('Please insert your address') }

        this.props.addAddress(newAddress, this.props.objectUser)

        this.address.value = '';
    }

    renderAddresses = () => {
        let render = this.props.objectUser.addresses.map( address => {  //  address :  { id, user_id, address }
            return (
            <tr key={address.id} > 
                <th scope="row" > {address.address} </th>
                <td> <button className="btn btn-danger" onClick={ () => { this.deleteAddress(address.id) } } >Delete</button> </td> 
            </tr>)
        })

        return render;
    }

    deleteAddress = (addressId) => {
        this.props.deleteAddress(addressId, this.props.objectUser)
    }

    localAvatarError = (e) => {
        e.target.onerror = null; 
        e.target.src= this.props.objectUser.avatar
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
                    <div className="jumbotron container mt-4">
                        
                        <div className="row">
                            <div className="col">
                                { 
                                    avatar === null ? 
                                    <img src={avatar_default} alt="avatar_default" style={ { width: "200px" } } /> : 
                                    
                                    <img src={`http://localhost:2019/users/avatar/${avatar}`} 
                                        style={ { width: "200px", borderRadius: "150px" } } 
                                        alt="avatar" 
                                        key={ new Date() }
                                        onError={this.localAvatarError} />  
                                }
                                

                                <input type='file' className="custom-file" ref={input => this.avatar = input} onChange={ () => this.uploadAvatar() }  /> 

                                {/* <button className="btn btn-primary" onClick={this.uploadAvatar} >{ avatar === null ? 'Upload Avatar' : 'Change Avatar'}</button> */}

                                {/* if user has an avatar, Button Delete Avatar will be appeared */}
                                {  avatar !== null ? <button className="btn btn-danger" onClick={this.deleteAvatar} >Delete Avatar</button> : ''  }
                                

                            </div>

                            <div className="col">
                                { is_admin === 1 ? <span className="badge badge-success">admin</span> : '' }

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

                    {/* Address */}
                    <div className='jumbotron container'>
                        {/* <form onSubmit={this.pressEnterAddress}> */}
                            <h1>Addresses</h1>
                            
                            {/* <h4> Your Addresses </h4> */}
                            <table className="table table-hover">
                                <tbody>
                                    {this.renderAddresses()}
                                </tbody>
                                
                            </table>
                            

                                    <br/>
                            {/* Input new address */}
                            <div className="form-group">
                                {/* <label htmlFor="name">Add address:</label> */}
                                <input ref={input => this.address = input} type="text" className="form-control" id="address" placeholder="Add new address" />
                            </div>

                        {/* </form> */}
                        
                        <button
                            className='btn btn-primary'
                            onClick={this.addAddress}
                        >Add New Address</button>

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
                                <input ref={input => this.phone_number = input} type="text" className="form-control" id="age" defaultValue={phone_number}/>
                            </div>

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
        objectUser : state.auth     // { id, name, username, email, phone_number, is_admin, avatar, addresses :[ {}, {} ] }
    }
}


export default connect(mapStateToProps, { updateAvatar, deleteAvatar, editProfile, addAddress, getAddresses, deleteAddress })(Profile);
