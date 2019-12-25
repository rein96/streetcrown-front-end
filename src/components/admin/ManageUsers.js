import React, { Component } from 'react'
import { connect } from 'react-redux'

import { URL } from '../../config/url'
import { getAllUsers } from '../../actions/index'

import defaultImage from '../../images/avatar_default.png'

class ManageUsers extends Component {

    state = {
        allUsers : []
    }

    async componentDidMount(){
        this.getUsers()         
    }

    getUsers = async () => {
        const resdata = await this.props.getAllUsers()
        console.log(resdata)
        this.setState( { allUsers : resdata } )
    }

    whatsappUser = (phone_number) => {
        // 08999993164 -> 628999993164
        let splitArray = phone_number.split('')
        splitArray.splice(0,1,"6","2")
        console.log(splitArray)
        let whatsappFormat = splitArray.join('')
        console.log(whatsappFormat)

        window.open(`https://api.whatsapp.com/send?phone=${whatsappFormat}`)
    }



    renderUsers = () => {
        let render = this.state.allUsers.map( user => {
            let { id, username, name, avatar, phone_number, created_at, email} = user
            return (
                <tr key={id}>
                    <th scope='col'>
                        { avatar === null ? 
                            <img src={defaultImage} style={ { width: "50px", borderRadius: "50px" } }  />  : 
                            <img src={`${URL}/users/avatar/${avatar}`} 
                                style={ { width: "50px", height: "50px", borderRadius: "50%" } } 
                                alt="avatar" 
                                key={ new Date() }
                                onError={ (e) => {
                                    e.target.onerror = null; 
                                    e.target.src= avatar;
                                }} />  
                        }

                        <p> {name} </p>
                    </th>
                    <th scope='col'>
                        <p> {username} </p>
                        <p style={{ fontSize : '10px' }}> {email} </p>
                    </th>
                    <th scope='col'>
                        <p> {phone_number} </p>
                    </th>
                    {/* <th scope='col'>
                        <p> {this.renderAddress()} </p>
                    </th> */}
                    <th scope='col'>
                        <p> {created_at} </p>
                    </th>
                    <th scope='col'>
                        <button className="btn btn-link" onClick={ () => this.whatsappUser(phone_number)}>
                            <img src="https://image.flaticon.com/icons/svg/134/134937.svg" alt="Whatsapp-icon" style={{ width: "30px" }} />
                        </button>
                    </th>
                </tr>
            )
        })
        return render;
    }

    render() {

        if (this.props.objectUser.is_admin === 0 || this.props.objectUser.username === '') {
            return <h1>Access Denied</h1>
        }

        return (
            <div className="mt-3 mb-5">
                <center><h4> Users </h4> </center>  <br/>
                <table className="table table-hover mx-auto w-auto mb-5" style={{ margin: 'auto' }}>
                        <thead>
                            <tr>
                                <th scope="col">Users</th>
                                <th scope="col">Username/Email</th>
                                <th scope="col">Phone</th>
                                {/* <th scope="col">Address</th> */}
                                <th scope="col">Registered Date</th>
                                <th scope="col">Whatsapp</th>
                            </tr>   
                        </thead>
                        <tbody> {this.renderUsers()} </tbody>      
                        
                </table>

                <br/><br/><br/><br/><br/><br/><br/><br/>             
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        objectUser : state.auth     // { id, name, username, email, phone_number, is_admin, avatar }
    }
}

export default connect( mapStateToProps, { getAllUsers } )(ManageUsers)
