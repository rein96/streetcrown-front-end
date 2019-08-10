import React, { Component } from 'react'
import { connect } from 'react-redux'
import ManageProducts from './ManageProducts';

import { getAllTransactions, specificTransaction } from '../../actions/index'

const paymentStyle = {
    fontSize : '40px',
    // color: "#5cb85c"
}


class TransactionDetail extends Component {

    state = {
        allTransactions : [],
        modalTransaction: []
    }

    async componentWillMount() {
        const allTransactions = await this.props.getAllTransactions()

        this.setState( { allTransactions } )

        console.log(this.state.allTransactions)
    }

    snippetProductModal = async (checkout_id) => {
        const productsArray = await this.props.specificTransaction(checkout_id)

        console.log(productsArray);

        this.setState( { modalTransaction : productsArray } )
    }

    renderTransactionDetail = () => {

        let renderDetail = this.state.modalTransaction.map( transaction => {
            return (
                <div>
                    <p><span className="modal-lable">Title: {this.state.modalTransaction.name} </span></p>
                    <p><span className="modal-lable">Msg:</span></p>
                    {transaction.name}
                    {transaction.price}
                </div>
            )
        })

        return renderDetail
    }



    renderTransactions = () => {
        let render = this.state.allTransactions.map(transaction => { 

            return (
                <tr key={transaction.id}>

                    <th scope="col">{transaction.created_at}</th>

                    <th scope="col">
                        <p> Username : {transaction.username} </p>
                        <p> Email : {transaction.email} </p>
                    </th>

                    <th scope="col">
                        <p> Name : {transaction.order_recipient} </p>
                        <p> Address : {transaction.order_address} </p>
                        <p> Phone : {transaction.order_phone_number} </p>
                        <p> 
                            Resi : { transaction.order_resi_number === null ? <button className="btn btn-info btn-sm" > Add Resi </button> : <p> {transaction.order_resi_number} </p> }  
                        </p>
                    </th>
                    
                    <th scope="col">
                        {transaction.proof_of_payment === null ? <p> User hasn't upload proof image </p> : <img src={`http://localhost:2019/proof/${transaction.proof_of_payment}`}  className="card-img" alt={transaction.proof_of_payment} style={{ width: "100px" }} /> }
                    </th>

                    <th scope="col">
                        <button className="btn btn-primary" onClick={ () => {this.snippetProductModal(transaction.id)} } data-toggle="modal" data-target="#exampleModal" > See Products </button>
                        <button className="btn btn-success" >Completed</button>
                    </th>
                </tr>

            )
        })

        return render
    }


    render() {
        return (
            <div>
                <center>
                    <h2 className="mt-3"> 
                            <i class="material-icons" style={paymentStyle} >payment</i>
                                User Transactions
                            <i class="material-icons" style={paymentStyle}>payment</i>  
                    </h2>

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
                                {this.renderTransactions()}

                            </tbody>
                    </table>

                </center>



                {/* Modal (depends on this.state.modalTransaction) */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Jewel</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.renderTransactionDetail()}

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" >Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>






            </div>
        )
    }
}

export default connect(null, { getAllTransactions, specificTransaction } )(TransactionDetail)
