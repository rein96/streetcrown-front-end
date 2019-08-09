import React, { Component } from 'react'
import { connect } from  'react-redux'

import { getTransaction } from '../actions/index'

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
    }

    renderTransaction = () => {
        let render = this.state.transactionArray.map( transaction => {

            const { proof_of_payment, order_address, order_phone_number, order_recipient, order_resi_number, order_status, price_total, created_at } = transaction

            return (
                <div className="card mb-3 shadow" style={{ maxWidth: '1100px', borderRadius: "30px"}} key={transaction.id} >
                    <div className="row no-gutters m-3" >

                        <div className="col-4 col-md-4">
                            {proof_of_payment === null ? (
                                <center>
                                    Please Upload Transaction Proof :)
                                    <input type='file' className="custom-file" ref={input => this.transactionImage = input} required />
                                </center>

                            ) : (
                                <h5> Proof is uploaded successfully </h5>
                            )}
                                {/* <img src={`http://localhost:2019/products/${cart.image}`}  className="card-img" alt={cart.product} style={{ width: "150px", borderRadius: '30px' }} /> */}

                                <button type="button" class="btn btn-lg btn-success" disabled> {order_status} </button>
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


                            {/* <p className="card-text"> Rp {(cart.price).toLocaleString()} / Unit </p>
                            <p className="card-text"> Rp {(cart.quantity*cart.price).toLocaleString()} </p>
                            <button className="btn btn-outline-danger"  onClick={ () => this.deleteCartButton(cart.id) } > <i class="fa fa-trash-o"></i> </button>  */}

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



export default connect(mapStateToProps, { getTransaction })(Transaction)
