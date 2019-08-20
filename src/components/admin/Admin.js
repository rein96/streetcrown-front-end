import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import transactionImage from '../../images/transaction.png'
import nanoCoating from '../../images/nano-coating.png'
import drivers from '../../images/drivers.png'

class Admin extends Component {
    render() {

        if (this.props.objectUser.is_admin === 0 || this.props.objectUser.username === '') {
            return <h1>Access Denied</h1>
        }

        return (
            <div>
                <center> <h1 className="font-weight-bold mt-4"> Dashboard Admin <i class="material-icons" style={adminStyle} >verified_user</i> </h1> </center>

                <div className="card-group mb-5">

                    {/* <ManageProducts /> */}
                        <div className="card m-5 shadow-lg" style={{ borderRadius: '20px' }} >
                            <Link to='/manageproducts'>
                                <img className="card-img-top" src={nanoCoating} style={borderTop} alt="Card image cap" />
                                <div className="card-body">
                                    <center>
                                        <button className="card-title btn btn-danger">Manage Products</button>
                                        <p className="card-text text-body">Add, Edit, Delete Product.</p>
                                    </center>
                                </div>
                            </Link>
                        </div>
                        
                    {/* <ManageTransactions /> */}
                        <div className="card m-5 shadow-lg" style={{ borderRadius: '20px' }} >
                            <Link to='/managetransactions'>
                                <img className="card-img-top" src={transactionImage} style={borderTop} alt="Card image cap"/>
                                <div className="card-body">
                                    <center>
                                        <button className="card-title btn btn-danger">Manage Transactions</button>
                                        <p className="card-text text-body"> Add resi number, check payment proof, transaction detail, reject and complete a payment. </p>
                                    </center>
                                </div>
                            </Link>
                        </div>
                    {/* <ManageUsers /> */}
                        <div className="card m-5 shadow-lg" style={{ borderRadius: '20px' }} >
                            <Link to='/manageusers'>
                                <img className="card-img-top" src={drivers} style={borderTop} alt="Card image cap" />
                                <div className="card-body">
                                    <center>
                                        <button className="card-title btn btn-danger">Manage Users</button>
                                        <p className="card-text text-body"> See registered users. </p>
                                    </center>
                                </div>
                            </Link>
                        </div>

                </div>

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

export default connect(mapStateToProps)(Admin);
