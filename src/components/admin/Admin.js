import React, { Component } from 'react'
import { connect } from 'react-redux'

import ManageProducts from './ManageProducts'

class Admin extends Component {
    render() {

        if (this.props.objectUser.is_admin === 0 || this.props.objectUser.username === '') {
            return <h1>Access Denied</h1>
        }

        return (
            <div>
                <center> <h1> Dashboard Admin </h1> </center>
                <ManageProducts />
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
