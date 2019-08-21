import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import Spinner from '../Spinner'

import { getAllTransactions, specificTransaction, addResiNumber, deleteResiNumber, finishTransaction, unfinishedTransaction, rejectTransaction, deleteTransaction } from '../../actions/index'

import '../../css/transactiondetail.css'

const paymentStyle = {
    fontSize : '40px',
    // color: "#5cb85c"
}


class ManageTransactions extends Component {

    state = {
        allTransactions : [],
        modalTransaction: [],
        price_total : 0,
        loading: false
    }

    componentDidMount() {
        this.getAllTransactions()
    };

    getAllTransactions = async () => {
        this.setState( { loading: true } )
        const allTransactions = await this.props.getAllTransactions()

        this.setState( { allTransactions, loading: false } )

        console.log(this.state.allTransactions)
    };

    snippetProductModal = async (checkout_id, price_total) => {
        const productsArray = await this.props.specificTransaction(checkout_id)

        console.log(productsArray);

        this.setState( { modalTransaction : productsArray } )
        this.setState( { price_total } )
    };

    addResi = async (id) => {

        await Swal.fire({
            title: 'Add Resi Number',
            input: 'text',
            showCancelButton: true,
            inputValidator: async (resi) => {
                if (!resi) {
                    return 'You need to write something!'
                }

                await this.props.addResiNumber(id, resi)

                await this.getAllTransactions()
            }
        })
    };

    deleteResi = async (id) => {
        const data = await this.props.deleteResiNumber(id)

        if(data.affectedRows) {
            Swal.fire({
                position: 'top-end',
                type: 'success',
                title: 'Resi has been deleted',
                showConfirmButton: false,
                timer: 1500
            })

            this.getAllTransactions()
        }
    };

    finishTransactionBtn = (id) => {
        // this.props.finishTransaction(id)

        Swal.fire({
            title: 'Are you sure?',
            text: "Make sure the customer has received the products!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I\'m sure of it !'
          }).then( async (result) => {
            if (result.value === true) {

                const res = await this.props.finishTransaction(id)
                console.log(res)

                    if ( res.affectedRows ) {
                        Swal.fire(
                            'Completed!',
                            'The transaction has been completed.',
                            'success'
                        )
        
                        this.getAllTransactions()
                    } else {
                        alert('Error when finish a transaction')
                    }
                }
        })
    }

    unfinishedTransactionBtn = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "The order status will be changed to 'Sending'",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I\'m sure of it !'
          }).then( async (result) => {
            if (result.value === true) {

                const res = await this.props.unfinishedTransaction(id)
                console.log(res)

                    if ( res.affectedRows ) {
                        Swal.fire(
                            'Success!',
                            'The transaction has been uncompleted.',
                            'success'
                        )
        
                        this.getAllTransactions()
                    } else {
                        alert('Error when unfinish a transaction')
                    }
                }
        })
    }

    paymentProofModal = (proof_of_payment) => {
        Swal.fire({
            imageUrl: `http://localhost:2019/proof/${proof_of_payment}`,
            imageWidth: 400,
            imageAlt: 'payment-image',
          })
    };

    rejectTransactionBtn = async (id, proof_of_payment) => {
        // previous problem using const, the value cannot be changed whenever text = 'No message'
        let { value: text } = await Swal.fire({
            input: 'textarea',
            title: 'Rejection message',
            text: 'Tell the user why you reject this transaction (Note: It will delete the proof of payment image)',
            type: 'warning',
            confirmButtonText: 'Reject Now !',
            confirmButtonColor: '#d33',
            inputPlaceholder: 'Type your message here...',
            inputAttributes: {
              'aria-label': 'Type your message here'
            },
            showCancelButton: true
          })

          console.log(text)
          console.log(typeof(text))

          //text force to null
          if(text.length == 0){
              console.log('text kosoong kann')
              text = 'No message' 
          } 
          const resdata = await this.props.rejectTransaction(id, proof_of_payment, text)
          console.log(resdata)
          
          if (resdata.affectedRows) {
            Swal.fire('Transaction has been rejected & Proof image has been deleted')
            this.getAllTransactions()
          }
    }
    
    deleteTransactionBtn = async (id, proof_of_payment) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "The transaction and the proof image will be deleted permanently on database",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete Now !'
          }).then( async (result) => {
            if (result.value === true) {
                const resdata = await this.props.deleteTransaction(id, proof_of_payment)
                console.log(resdata)
                    if ( resdata.affectedRows ) {
                        Swal.fire(
                            'Completed!',
                            'The transaction and proof image has been deleted permanently.',
                            'success'
                        )
        
                        this.getAllTransactions()
                    } else {
                        alert('Error when delete a transaction')
                    }
                }
        })
    }

    // Modal to see products & quantity on each transaction 
    renderTransactionDetail = () => {
        let renderDetail = this.state.modalTransaction.map( transaction => {
            return (
                <tr key={transaction.product_id} >
                    <th scope="col">
                        <img src={`http://localhost:2019/products/${transaction.image}`}  className="card-img" alt={transaction.name} style={{ width: "100px" }} />
                        
                    </th>
                    <th scope="col">
                        <span> {transaction.name} </span>
                    </th>
                    <th scope="col"> <span>{transaction.quantity}</span> </th>
                    <th scope="col"> <span>{ (transaction.price).toLocaleString() }</span> </th>
                    <th scope="col"> <span>{ (transaction.price*transaction.quantity).toLocaleString() }</span> </th>
                </tr>
            )
        })

        return renderDetail
    };

    // List all transactions by all users
    renderTransactions = () => {
        let render = this.state.allTransactions.map(transaction => { 
            let { id, created_at, username, email, order_recipient, order_address, order_phone_number, order_resi_number, proof_of_payment, price_total, order_status } = transaction

            var order_status_style = ''
            if(order_status === 'Pending'){
                order_status_style = 'badge-warning'

            } else if (order_status === 'Sending' ) {
                order_status_style = 'badge-primary'

            } else if (order_status === 'Completed'){
                order_status_style = 'badge-success'

            } else if (order_status ==='Rejected') {
                order_status_style = 'badge-danger'
            }

            return (
                <tr key={id}>
                    <th scope="col">
                        <p>{created_at} </p>
                        <span 
                            className={'badge badge-pill ' + order_status_style }   > {order_status} 
                        </span> <br/><br/>
                        <button className="btn btn-outline-danger"  onClick={ () => this.deleteTransactionBtn(id, proof_of_payment) } > <i class="fa fa-trash-o"></i> </button>
                    </th>

                    <th scope="col">
                        <p> Username : {username} </p>
                        <p> Email : {email} </p>
                    </th>
                    <th scope="col">
                        <p> Name : {order_recipient} </p>
                        <p> Address : {order_address} </p>
                        <p> Phone : {order_phone_number} </p>
                        <p> 
                            Resi : { order_resi_number === null ? <button className="btn btn-info btn-sm" onClick={ () => this.addResi(id) } > Add Resi </button>      :  <p> 
                                        {order_resi_number} 
                                        <button onClick={ () => this.deleteResi(id) } className="btn btn-link" style={{ color : '#d9534f' }} > 
                                            <i class="material-icons">cancel</i> 
                                        </button>
                                    </p> }  
                        </p>
                    </th>
                    <th scope="col">
                        {proof_of_payment === null ? <p>
                             User hasn't upload proof image 
                             </p> : <button className="btn btn-link" onClick={ () => this.paymentProofModal(proof_of_payment) }>
                                <img src={`http://localhost:2019/proof/${proof_of_payment}`}  className="card-img" alt={proof_of_payment} style={{ width: "100px" }} />
                             </button>  }
                    </th>
                    <th scope="col">
                        <p> Price Total : Rp. {transaction.price_total.toLocaleString()} </p>
                        <button className="btn btn-outline-primary" onClick={ () => {this.snippetProductModal(id, price_total)} } data-toggle="modal" data-target="#snippetProductModal" > See Products </button> <br/><br/>

                        { order_status === 'Completed' ? ( 
                        <button className="btn btn-danger" onClick={ () => {this.unfinishedTransactionBtn(id)} }  >Unfinished</button> ) :  (
                        <button className="btn btn-success" onClick={ () => {this.finishTransactionBtn(id)} }  >Finish</button>) }

                        {/* Button Reject will appear */}
                        { proof_of_payment != null && order_status != 'Completed'  ? (
                        <button className="btn btn-danger" onClick={ () => {this.rejectTransactionBtn(id, proof_of_payment)} }  >Reject</button> ) : '' }

                    </th>
                </tr>
            )
        })
        return render
    };



    // initial render
    render() {

        if (this.props.objectUser.is_admin === 0 || this.props.objectUser.username === '') {
            return <h1>Access Denied</h1>
        }

        return (
            <div className="ml-5 mr-5">
                <center>
                    <br/>
                    <h2 className="mt-3"> 
                            <i class="material-icons" style={paymentStyle} >payment</i>
                                User Transactions
                            <i class="material-icons" style={paymentStyle}>payment</i>  
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

                            {/* render all transaction */}
                            { this.state.loading === true ?  <Spinner /> : <tbody> {this.renderTransactions()}  </tbody> }                                                       

                            
                    </table>
                </center>



                {/* Modal (depends on this.state.modalTransaction) */}
                <div className="modal fade" id="snippetProductModal" tabIndex="-1" role="dialog" aria-labelledby="snippetProductModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="snippetProductModalLabel">Customer Products</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <span className="font-weight-bolder" style={{ fontSize: '30px' }}> Price Total : Rp. { this.state.price_total.toLocaleString() } </span>  <span className='text-muted'> included Shipping Fee (+Rp 10,000)   </span>
                                <table className="table table-hover mb-5">
                                    <thead>
                                        <tr>
                                            <th scope="col" colSpan="2">Products</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Total Price</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.renderTransactionDetail()}
                                    </tbody>

                                </table>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>  // end initial render()
        )
    }
}

const mapStateToProps = state => ({
    objectUser : state.auth
})

export default connect(mapStateToProps, { getAllTransactions, specificTransaction, addResiNumber, deleteResiNumber, finishTransaction, unfinishedTransaction, rejectTransaction, deleteTransaction } )(ManageTransactions)
