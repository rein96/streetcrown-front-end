import React, { Component } from 'react'
import { connect } from  'react-redux'
import Swal from 'sweetalert2'

import { getTransaction, uploadProof } from '../actions/index'


const paymentStyle = {
    fontSize : '40px',
    // color: "#5cb85c"
}



class Transaction extends Component {

    state = {
        transactionArray : []
    }

    async componentWillMount(){
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
        }
    }

    renderTransaction = () => {
        let render = this.state.transactionArray.map( transaction => {

            const { id, proof_of_payment, order_address, order_phone_number, order_recipient, order_resi_number, order_status, price_total, created_at } = transaction

            return (
                <div className="card mb-3 shadow" style={{ maxWidth: '1100px', borderRadius: "30px"}} key={transaction.id} >
                    <div className="row no-gutters m-3" >

                        <div className="col-4 col-md-4">
                            {proof_of_payment === null ? (
                                <div>
                                    <center>
                                        <span>Please Upload Transaction Here  </span> <br/>
                                        <button className="btn btn-primary" onClick={ () => { this.uploadProofModal(id, price_total) } } required>Upload</button>
                                        
                                    </center>
                                </div>

                            ) : (
                                <div>
                                    <span> Your Proof Image </span>
                                    <img src={`http://localhost:2019/proof/${proof_of_payment}`}  className="card-img" alt={proof_of_payment} style={{ width: "150px" }} />
                                </div>
                            )}

                                <div className="mt-5">
                                    Status : <button type="button" className="btn btn-sm btn-success " disabled> {order_status} </button>
                                </div>
                                
                        </div>

                        <div className="col-8 col-md-8">

                        <div className="card-body">
                            <h5 className="card-title">
                                <h5> Total : Rp {price_total.toLocaleString()} </h5>
                                <br/>
                                <h5> Recipient Name: {order_recipient} </h5>
                                <h5> {order_address} </h5>
                                <h5> {order_phone_number} </h5>
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



export default connect(mapStateToProps, { getTransaction, uploadProof })(Transaction)
