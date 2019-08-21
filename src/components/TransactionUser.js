import React, { Component } from 'react'
import { connect } from  'react-redux'
import { Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'

import { getTransaction, uploadProof, specificTransaction, proofImageNotificationMail } from '../actions/index'


const paymentStyle = {
    fontSize : '40px',
    // color: "#5cb85c"
}



class TransactionUser extends Component {

    state = {
        transactionArray : [],
        modalTransaction : [],
        price_total : 0
    }

    async componentWillMount(){
        await this.getUserTransaction()
    }

    getUserTransaction = async () => {
        const { id } = this.props.objectUser
        const transactionArray = await this.props.getTransaction(id)

        this.setState( { transactionArray } )
        console.log(transactionArray)
    }

    uploadProofModal = async (transactionID, price_total) => {
        console.log(transactionID)

        // Modal to input transaction proof image
        const { value: file } = await Swal.fire({
            title: 'Select image (maximal 1 MB and jpg/jpeg/png extension) ',
            input: 'file',
            inputAttributes: {
            accept: 'image/*',
            'aria-label': 'Upload your profile picture'
            }
        })

        // Maximal 1 mB proof image
        if( file.size > 1000000 ){
            return Swal.fire({
                title: 'Error!',
                text: 'File size is too large, maximal 1 MB (MegaBytes)',
                type: 'error',
                confirmButtonText: 'Cool'
            })
        }
        
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
            Swal.fire({
                title: 'Thankyou for uploading proof, we will process as soon as possible :)',
                imageUrl: e.target.result,
                imageAlt: 'The uploaded picture'
            })
            }
            reader.readAsDataURL(file)

            console.log(file) // similar result with this.avatar.files[0] with normal input type file 
            // at backend :
            // filename(req, file, cb) { cb(null, Date.now() + '-' + req.body.user_id + '-' + req.body.price_total + path.extname(file.originalname) ) } at checkoutRouter.js

            const formData = new FormData()

            formData.append('username', this.props.objectUser.username)  // user id
            formData.append('price_total', price_total)
            formData.append('id', transactionID ) // checkout id
            formData.append('payment', file )

            await this.props.uploadProof(formData)
            await this.getUserTransaction()
            await this.props.proofImageNotificationMail()
        }
    }

    // Set state whenever 'See Products' (modal) is clicked 
    snippetProductModal = async (checkout_id, price_total) => {
        const productsArray = await this.props.specificTransaction(checkout_id)

        console.log(productsArray);

        this.setState( { modalTransaction : productsArray } )
        this.setState( { price_total } )
    };

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


    renderTransaction = () => {
        let render = this.state.transactionArray.map( transaction => {

            const { id, proof_of_payment, order_address, order_phone_number, order_recipient, order_resi_number, order_status, price_total, created_at, order_message } = transaction

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
                <div className="card mb-3 shadow" style={{ maxWidth: '1100px', borderRadius: "30px"}} key={transaction.id} >
                    <div className="row no-gutters m-3" >

                        <div className="col-4 col-md-4">
                            
                            {/* If the user hasn't uploaded proof image */}
                            {proof_of_payment === null ? (
                                <div>
                                    <center>
                                        <span> {order_message === null ? 'Please Upload Transaction Here' : 'Please Re-upload Transaction Image Here' }   </span> <br/>
                                        <button className="btn btn-primary" onClick={ () => { this.uploadProofModal(id, price_total) } } required>Upload</button>
                                        
                                    </center>
                                </div>
 
                            ) : ( // if the user has already uploaded, it will appear
                                <div>
                                    <p> Your Proof Image </p>
                                    <img src={`http://localhost:2019/proof/${proof_of_payment}`}  className="card-img" alt={proof_of_payment} style={{ width: "150px" }} />
                                </div>
                            )}

                                <div className="mt-5">
                                    <b> Status </b> : &nbsp;
                                    <button 
                                        type="button" 
                                        className={'btn btn-sm ' + order_status_style } 
                                        disabled> {order_status} </button>

                                        { (order_message !== null && order_status === 'Rejected') && <p> <b> Reason of rejection </b> : {order_message} </p> } 
                                </div>

                                <div className="mt-3">
                                    <button className="btn btn-outline-primary" onClick={ () => {this.snippetProductModal(id, price_total)} } data-toggle="modal" data-target="#snippetUserProductModal" > See Products </button>
                                </div>
                                
                                
                        </div>

                        <div className="col-8 col-md-8">

                        <div className="card-body">
                            <h5 className="card-title">
                                <h5> Total : Rp {price_total.toLocaleString()}  </h5>
                                <br/>
                                <h5> Recipient Name: {order_recipient} </h5>
                                <h5> {order_address} </h5>
                                <h5> {order_phone_number} </h5>
                                <h5> {order_resi_number} </h5>
                            </h5>

                        </div>

                        </div>
                    </div>
                </div>
            )
            
        })

        return render;
    }

    render() {
        // if user hasn't logged in, redirect to home
        if (this.props.objectUser.username === '') {
            return <Redirect to='/' />
        }

        return (
            <div className="container">
                <center>
                    <h2 className="mt-3"> 
                        <i class="material-icons" style={paymentStyle} >payment</i>
                            Transaction 
                        <i class="material-icons" style={paymentStyle}>payment</i>  
                     </h2>

                     {this.renderTransaction()}
                </center>



                {/* Modal (depends on this.state.modalTransaction) */}
                <div className="modal fade" id="snippetUserProductModal" tabIndex="-1" role="dialog" aria-labelledby="snippetUserProductModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-xl" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="snippetUserProductModalLabel">Ordered Products</h5>
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


                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        objectUser : state.auth
        // cartsSTATE : state.carts.carts
    }
}



export default connect(mapStateToProps, { getTransaction, uploadProof, specificTransaction, proofImageNotificationMail })(TransactionUser)
