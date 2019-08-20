import React, { Component } from 'react'
import { connect } from 'react-redux'

class ManageUsers extends Component {


    render() {
        if (this.props.objectUser.is_admin === 0 || this.props.objectUser.username === '') {
            return <h1>Access Denied</h1>
        }

        return (
            <div className="ml-5 mr-5">
                <center>
                    <br/>
                    <h2 className="mt-3"> 
                        <i class="material-icons" style={{ fontSize: '30px' }}>face</i>
                            &nbsp; Users  &nbsp;
                        <i class="material-icons" style={{ fontSize: '30px' }}>face</i> 
                    </h2>
                    <br/>

                    <table className="table table-hover mb-5">
                            <thead>
                                <tr>
                                    {/* <th scope="col">ID</th> */}
                                    <th scope="col">DATE</th>
                                    <th scope="col">USER</th>
                                    <th scope="col">DESTINATION</th>
                                    <th scope="col">PAYMENT PROOF</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* render all transaction */}
                                {/* {this.renderTransactions()} */}

                            </tbody>
                    </table>
                </center>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    objectUser: state.auth
})

export default connect(mapStateToProps)(ManageUsers)
