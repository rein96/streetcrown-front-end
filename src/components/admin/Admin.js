import React, { Component } from 'react'
import { connect } from 'react-redux'

import ManageProducts from './ManageProducts'
import TransactionDetail from './TransactionDetail'

const adminStyle = {
    color: '#428bca',
    fontSize : '38px'
}

class Admin extends Component {
    render() {

        if (this.props.objectUser.is_admin === 0 || this.props.objectUser.username === '') {
            return <h1>Access Denied</h1>
        }

        return (
            <div>
                <center> <h1 className="font-weight-bold mt-4"> Dashboard Admin <i class="material-icons" style={adminStyle} >verified_user</i> </h1> </center>
                <ManageProducts />
                <TransactionDetail />
                {/* <h1> Transaction approval </h1>
                <h1> History Transaction </h1> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        objectUser : state.auth     // { id, name, username, email, phone_number, is_admin, avatar }
    }
}

export default connect(mapStateToProps)(Admin);
