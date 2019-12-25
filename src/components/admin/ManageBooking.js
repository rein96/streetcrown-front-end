import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class ManageBooking extends Component {

    render() {

        if (this.props.objectUser.is_admin === 0 || this.props.objectUser.username === '') {
            return <h1>Access Denied</h1>
        }

        return (
            <div>
                <center> <h1 className="font-weight-bold mt-4"> Manage Booking </h1> </center>


                <div className="mb-5">
                    <div className="row">

                        {/* <ManageBookingRegistered /> */}
                        <div className="col-12 col-sm-12 col-md-6">

                            <div className="card m-5 shadow-lg" style={{ borderRadius: '20px' }} >
                                <Link to='/managebookingregistered'>
                                    {/* <img className="card-img-top" src={manageProducts} style={borderTop} alt="Card cap" /> */}
                                    <div className="card-body">
                                        <center>
                                            <button className="card-title btn btn-danger">Manage Booking Registered Account  <i className="material-icons" style={ emoticon } >verified_user</i> </button>
                                            {/* <p className="card-text text-body">Add, Edit, Delete Product.</p> */}
                                        </center>
                                    </div>
                                </Link>
                            </div>

                        </div>

                        {/* <ManageTransactions /> */}
                        <div className="col-12 col-sm-12 col-md-6">
                                                
                            <div className="card m-5 shadow-lg" style={{ borderRadius: '20px' }} >
                                <Link to='/managebookingguest'>
                                    {/* <img className="card-img-top" src={transactionImage} style={borderTop} alt="Card cap"/> */}
                                    <div className="card-body">
                                        <center>
                                            <button className="card-title btn btn-danger">Manage Booking Guest <i className="material-icons" style={ emoticon }>person_outline</i> </button>
                                            {/* <p className="card-text text-body"> Add resi number, check payment proof, transaction detail, reject and complete a payment. </p> */}
                                        </center>
                                    </div>
                                </Link>
                            </div>

                        </div>

                    </div>

                </div>

                <br/><br/><br/><br/><br/><br/><br/><br/>

            </div>
        )
    }
}

const emoticon = {
    verticalAlign : "middle",
    fontSize : '30px'
}

const mapStateToProps = state => {
    return {
        objectUser : state.auth     // { id, name, username, email, phone_number, is_admin, avatar }
    }
}

export default connect(mapStateToProps)(ManageBooking)
