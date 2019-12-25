import React, { Component } from 'react'
import { connect } from  'react-redux'
import { Link, Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'

import { getCarts, addAddress, postCheckout, deleteCartsAfterCheckout } from '../../actions/index'

import payment from '../../images/payment.png'

const verticalCenter = {
    minHeight: '100vh',
  
    display: 'flex',
    alignItems: 'center',
    backgroundColor : 'white'
}

const moneyStyle = {
    color:"#5cb85c", 
    fontSize:"40px"
}


class Checkout extends Component {

    state = {
        loading: false,
        redirectTransaction : false
    }

    componentWillMount() {
        this.props.getCarts(this.props.objectUser)
    }

    showTotal = () => {
        let total = 0;
        let cartArray = this.props.cartsSTATE
        for ( let i = 0 ; i < cartArray.length; i++) {
            total = total + (cartArray[i].price * cartArray[i].quantity )
        }
        total = total + 10000

        return total
    }

    renderAddress = () => {
        let render = this.props.objectUser.addresses.map( address => {
            return (
                <option value={address.address} className="radius-custom" key={address.id} >{address.address}</option>
            )
        })

        return render;
    }

    submitCheckout = async () => {
        const { id } = this.props.objectUser
        const { objectUser, cartsSTATE } = this.props

        console.log(cartsSTATE)

        const selectedAddress = this.selectedAddress.value
        if(selectedAddress === '') { return alert('You must input/choose an address !') }
        const recipientName = this.recipient.value
        const recipient_phone_number = this.phone_number.value
        const totalPrice = this.showTotal()
        // const transactionImage = this.transactionImage.files[0]

        const formData = new FormData()

        formData.append('user_id', id )
        // formData.append('address_id', selectedAddress )
        formData.append('price_total', totalPrice )
        formData.append('order_recipient', recipientName )
        formData.append('order_address', selectedAddress )
        formData.append('order_phone_number', recipient_phone_number )
        // formData.append('paymentProofImage', transactionImage )  //  paymentProofConfiguration.single('paymentProofImage') at checkoutRouter.js
        // formData.append('allCartsArray', cartsSTATE) //Cannot store array in formData with this way

        // console.log(selectedAddress, recipientName, recipient_phone_number, totalPrice, transactionImage )

        // this.props.postCheckout(formData, cartsSTATE)
        // statusCheckout === res.data
        let statusCheckout = await this.props.postCheckout(id, totalPrice, recipientName, selectedAddress, recipient_phone_number, cartsSTATE)

        console.log(statusCheckout)
        if(statusCheckout.insertId){
            // await this.props.patchCartStatus( id )
            await this.props.deleteCartsAfterCheckout(objectUser.id)
            await this.props.getCarts(this.props.objectUser)
            Swal.fire(
                'Checkout Success!',
                'One More Step : Upload Transaction Image on Transaction Tab !',
                'success'
              )
            // alert('Checkout Success, One More Step : Upload Transaction Image on Transaction Tab !')

            await this.setState( { redirectTransaction : true } )
        }
    }


    // Modal Add New Address
    addAddress = () => {
        let newAddress = this.addNewAddress.value

        this.props.addAddress( newAddress, this.props.objectUser )
    }

    render() {

        const { phone_number, name } = this.props.objectUser

        // if user hasn't logged in, or logged out on checkout component, it will redirect to /products
        if(this.props.objectUser.username === '') {
            return <Redirect to='/products' />
        }
       
        // When user has checkout successfully, it will redirect to transaction
        if(this.state.redirectTransaction === true) {
            return <Redirect to='/transaction' />
        }


        return (
            <div className="jumbotron" style={verticalCenter}>
                <div className="container shadow-lg" style={{ borderRadius : '20px' }}>
                    <br/>
                    <Link to='/cart' >
                        <button className="btn btn-outline-info m-2" > Back To Cart </button>
                    </Link>

                    <center> 
                        <h3> 
                            <i className="material-icons" style={ moneyStyle }>money</i> Total : <b> Rp. { (this.showTotal()).toLocaleString() }  </b>  <i className="material-icons" style={ moneyStyle }>money</i>   
                        </h3>  
                    </center>


                    <div className="form-group">
                        <label htmlFor="uname1">Address</label>
                        <form className="input-group">

                            <select className="custom-select radius-custom" name='selectedAddress' ref={ input => this.selectedAddress = input } >
                                {this.renderAddress()}
                            </select>
        
                        </form>
                        {/* <div class="float-right">Float right on all viewport sizes</div> */}
                        <button className="btn btn-outline-warning float-right radius-custom mt-1 mb-1" data-toggle="modal" data-target="#modalAddress" >Add New Address</button>

                    </div>

                    
                    <br/>
                    <div className="form-group">
                        <label>Recipient Name</label>
                        <form className="input-group">
                            <input ref={input => this.recipient = input} defaultValue={name} className="form-control radius-custom" type="text" placeholder="Who will recieve the package ?"  required />
                        </form>
                    </div>

                    <div className="form-group">
                        <label>Recipient's Phone Number</label>
                        <form className="input-group">
                            <input ref={input => this.phone_number = input} defaultValue={phone_number} className="form-control radius-custom" type="text" placeholder="In case emergency, we will phone him/her :)"  required />
                        </form>
                    </div>

                    
                    <center>
                        <img src={payment} alt="payment choices" className="img-fluid radius-custom" style={{ width: '400px' }} />
                    </center>

                    <br/>

                    <button className="btn btn-success btn-block radius-custom" onClick={ () => this.submitCheckout() } >SUBMIT</button>

                    <br/><br/>


                    <br/><br/><br/>

                {/* Modal: Add New Address */}
                    <div className="modal fade" id="modalAddress" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModal3Label">Add New Address</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <form className="input-group">
                                            <input ref={input => this.addNewAddress = input} className="form-control radius-custom" type="text" required placeholder="Put your new address here!" />
                                        </form>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
                                    <button className="btn btn-success" onClick={this.addAddress}  data-dismiss="modal" >Add</button>
                                </div>

                            </div>
                        </div>
                    </div>


            </div>  {/* end container shadow */}
            

            </div>  // end jumbotron
            
        )
    }
}

const mapStateToProps = state => {
    return {
        objectUser : state.auth,
        cartsSTATE : state.carts.carts
    }
}

export default connect( mapStateToProps, { getCarts, addAddress, postCheckout, deleteCartsAfterCheckout } )(Checkout);
