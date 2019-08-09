import React, { Component } from 'react'
import { connect } from  'react-redux'
import { Link, Redirect } from 'react-router-dom'

import { getCarts, deleteCart } from '../actions/index'

import '../css/cart.css'

const backStyle = {
    fontSize : '39px',
    backgroundColor : '#d9534f',    // bootstrap danger #hex
    color:'white',
    borderRadius: '50%'
}

class Cart extends Component {

    state = {
        selectedIdToEdit : 0,
        totalQuantity : 0,
        subtotal : 0,
        total : 0
    }

    componentWillMount() {
        this.props.getCarts(this.props.objectUser)
    }

    deleteCartButton = async (cartID) => {
        console.log(cartID)
        await this.props.deleteCart(cartID)
        await this.props.getCarts(this.props.objectUser)
    }

    // updateQuantity = () => {
    //     const newQuantity = this.reinput_quantity.value
    //     console.log(newQuantity)
    // }

    showTotalQuantity = () => {
        let totalQuantity = 0;
        let cartArray = this.props.cartsSTATE
        for ( let i = 0 ; i < cartArray.length; i++) {
            totalQuantity = totalQuantity + cartArray[i].quantity
        }

        // this.setState( { totalQuantity } )

        return totalQuantity
    }

    showSubtotal = () => {
        let subtotal = 0;
        let cartArray = this.props.cartsSTATE
        for ( let i = 0 ; i < cartArray.length; i++) {
            subtotal = subtotal + (cartArray[i].price * cartArray[i].quantity )
        }

        // this.setState( { subtotal } )

        return subtotal.toLocaleString()
    }

    // subtotal + shipping cost
    showTotal = () => {
        let total = 0;
        let cartArray = this.props.cartsSTATE
        for ( let i = 0 ; i < cartArray.length; i++) {
            total = total + (cartArray[i].price * cartArray[i].quantity )
        }
        total = total + 10000

        // this.setState( { total } )

        return (total).toLocaleString()
    }

    changeQuantity = (cartID, cartQuantity) => {
        const newQuantity = cartQuantity
        console.log(cartQuantity)
    }


    renderCart = () => {
        let render = this.props.cartsSTATE.map( cart => {
            return (
                <div className="card mb-3 shadow" style={{ maxWidth: '1100px', borderRadius: "30px"}} key={cart.product_id} >
                        <div className="row no-gutters m-3" >

                            <div className="col-4 col-md-4">
                                <Link to={`/productdetail/${cart.product_id}`} >
                                    <img src={`http://localhost:2019/products/${cart.image}`}  className="card-img" alt={cart.product} style={{ width: "150px", borderRadius: '30px' }} />
                                </Link>
                            </div>

                            <div className="col-8 col-md-8">

                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to={`/productdetail/${cart.product_id}`} > {cart.product_name} </Link>
                                </h5>
                                <input type="number" defaultValue={cart.quantity} className="card-text"  ref={input => this.reinput_quantity = input} onChange={ () => this.changeQuantity(cart.id, cart.quantity ) } />  

                                <p className="card-text"> Rp {(cart.price).toLocaleString()} / Unit </p>
                                <p className="card-text"> Rp {(cart.quantity*cart.price).toLocaleString()} </p>
                                <button className="btn btn-outline-danger"  onClick={ () => this.deleteCartButton(cart.id) } > <i class="fa fa-trash-o"></i> </button> 

                            </div>

                        </div>
                    </div>
                </div>
                // <tr key={cart.product_id}>
                //     <th scope="row"> <img src={`http://localhost:2019/products/${cart.image}`} alt={cart.product} style={{ width: "150px" }} /> </th>
                //     <td style={{ verticalAlign: "middle" }} > {cart.product_name} </td>
                //     <td style={{ verticalAlign: "middle" }} > {cart.quantity} </td>
                //     <td style={{ verticalAlign: "middle" }} > Rp {(cart.price).toLocaleString()} </td>
                //     <td style={{ verticalAlign: "middle" }} > Rp {(cart.quantity*cart.price).toLocaleString()} </td>
                    
                //     <td style={{ verticalAlign: "middle" }} > 
                //         <button className="btn btn-danger" style={{ borderRadius: "50%" }} onClick={ () => this.deleteCartButton(cart.id) } > <center>X</center> </button>  
                //     </td>
                // </tr>
            )
        })

        return render;
    }


    render() {

        // If there is a user logged in
        if(this.props.objectUser.username) {

            // If there is no carts
            if (this.props.cartsSTATE.length === 0) {
                return (
                    <div>
                        <center>
                            <h2> There is no product on your cart  </h2>
                            <Link to='/products' >
                                <button className="btn btn-success">Shop Now!</button>
                            </Link>

                        </center>
                    </div>
                )
            }

            // If there is a user and cart(s)
            return (
                <div>
                     <Link to='/products' >
                        <i className="material-icons shadow mt-3 ml-3" style={backStyle}>arrow_back</i>
                    </Link>

                    <div className="container mt-5">
                    
                        {this.renderCart()}

                        {/* Subtotal, total, quantity table */}
                        <div>
                            <table className="table table-hover shadow mb-5">
                                {/* <thead>
                                    <tr>
                                        <td scope="col"> <b> Name </b></td>
                                        <td scope="col"> <b> Quantity</b></td>
                                        <td scope="col"> <b> Price </b></td>
                                        <td scope="col"> <b> Total </b></td>
                                    </tr>
                                </thead> */}
                                <tbody>
                                    
                                    <tr>
                                        <td scope="col" colSpan="2">  Quantity  </td>
                                        <td scope="col" colSpan="2"> {this.showTotalQuantity()} </td>
                                        {/* <td scope="col"> </td>
                                        <td scope="col"> </td> */}
                                    </tr>
            
                                    <tr>
                                        <td scope="col" colSpan="2">  Subtotal  </td>
                                        <td scope="col" colSpan="2"> Rp {this.showSubtotal()} </td>
                                        {/* <td scope="col"> </td>
                                        <td scope="col"> Rp 500.000 </td>  */}
                                    </tr>

                                    <tr>
                                        <td scope="col" colSpan="2">  Shipping Cost  </td>
                                        <td scope="col" colSpan="2"> Rp 10.000 </td>
                                    </tr>

                                    <tr>
                                        <td scope="col" colSpan="2"> <b> Total </b> </td>
                                        <td scope="col" colSpan="2"> <b> Rp {this.showTotal()} </b> </td>
                                    </tr>
                                </tbody>                              
                            </table>
                        </div>  {/* end subtotal etc */}

                        {/* <CheckoutModal /> */}

                        <Link to='/checkout'>
                            <button className="btn btn-success btn-lg btn-block"> CHECKOUT </button>                   
                        </Link>

                        <br/><br/><br/>
                

                    </div>  {/* end big container */}
                   



                </div>  // end primary div
            )
        } else {
            return <Redirect to='/products' />
        }
        
    }
}

const mapStateToProps = state => {
    return {
        objectUser : state.auth,
        cartsSTATE : state.carts.carts
    }
}

export default connect( mapStateToProps, { getCarts, deleteCart } )(Cart);
