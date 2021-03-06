import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { countUsers } from '../../actions/index'

import transactionImage from '../../images/transaction.png'
import nanoCoating from '../../images/nano-coating.png'
import manageProducts from '../../images/manageproducts.jpg'

class Admin extends Component {

    state = {
        countUsers : 0
    }

    async componentDidMount(){
        const resdata = await this.props.countUsers()
        console.log(resdata)
        this.setState( { countUsers : resdata.countUsers } )
    } 

    render() {

        if (this.props.objectUser.is_admin === 0 || this.props.objectUser.username === '') {
            return <h1>Access Denied</h1>
        }

        return (
            <div>
                <center> <h1 className="font-weight-bold mt-4"> Dashboard Admin <i className="material-icons" style={adminStyle} >verified_user</i> </h1> </center>

                <div className="mt-3">
                    <center>
                        <Link to='/manageusers' >
                            <button className="btn btn-dark coba"> <i className="material-icons" style={{ verticalAlign : 'middle' }}>person</i> {this.state.countUsers} Registered Users </button>
                        </Link>
                    </center>
                </div>

                <div className="mb-5">
                    <div className="row">

                        {/* <ManageProducts /> */}
                        <div className="col-12 col-sm-12 col-md-12 col-lg-4">

                            <div className="card m-5 shadow-lg coba" style={{ borderRadius: '20px' }} >
                                <Link to='/manageproducts'>
                                    <img className="card-img-top" src={manageProducts} style={borderTop} alt="Card cap" />
                                    <div className="card-body">
                                        <center>
                                            <button className="card-title btn btn-danger">Manage Products</button>
                                            <p className="card-text text-body">Add, Edit, Delete Product.</p>
                                        </center>
                                    </div>
                                </Link>
                            </div>

                        </div>

                        {/* <ManageTransactions /> */}
                        <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                                                
                            <div className="card m-5 shadow-lg coba" style={{ borderRadius: '20px' }} >
                                <Link to='/managetransactions'>
                                    <img className="card-img-top" src={transactionImage} style={borderTop} alt="Card cap"/>
                                    <div className="card-body">
                                        <center>
                                            <button className="card-title btn btn-danger">Manage Transactions</button>
                                            <p className="card-text text-body"> Add resi number, check payment proof, transaction detail, reject and complete a payment. </p>
                                        </center>
                                    </div>
                                </Link>
                            </div>

                        </div>

                        {/* <ManageBooking /> */}
                        <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                                                
                            <div className="card m-5 shadow-lg coba" style={{ borderRadius: '20px' }} >
                                <Link to='/managebooking'>
                                    <img className="card-img-top" src={nanoCoating} style={borderTop} alt="Card cap" />
                                    {/* https://unsplash.com/photos/9n1USijYJZ4 */}
                                    <div className="card-body">
                                        <center>
                                            <button className="card-title btn btn-danger">Manage Booking</button>
                                            <p className="card-text text-body"> Add, Edit, Delete, See Detailing Booking. </p>
                                        </center>
                                    </div>
                                </Link>
                            </div>
                            
                        </div>

                    </div>

                </div>


                {/* <div className="modal fade" id="managebooking" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-l" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Product</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-row">
                                    <Link to="/managebookingregistered" >
                                        <button className="btn btn-outline-danger"> 
                                            Registered Account Detailing Booking     
                                        </button>
                                    
                                    </Link>

                                    <Link to="/managebookingguest" >
                                        <button className="btn btn-outline-danger">
                                            Guest Detaling Booking                                        
                                        </button>                                
                                    </Link>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>  */}

                <br/><br/><br/>

            </div>
        )
    }
}

const adminStyle = {
    color: '#428bca',
    fontSize : '38px'
}

const borderTop = {
    borderRadius: '20px 20px 0px 0px',
}

const mapStateToProps = state => {
    return {
        objectUser : state.auth     // { id, name, username, email, phone_number, is_admin, avatar }
    }
}

export default connect(mapStateToProps, { countUsers })(Admin);
