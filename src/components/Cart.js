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

    componentWillMount() {
        this.props.getCarts(this.props.objectUser)
    }

    deleteCartButton = async (cartID) => {
        console.log(cartID)
        await this.props.deleteCart(cartID)
        await this.props.getCarts(this.props.objectUser)
    }


    renderCart = () => {
        let render = this.props.cartsSTATE.map( cart => {
            return (
                <tr key={cart.product_id}>
                    <th scope="row"> <img src={`http://localhost:2019/products/${cart.image}`} alt={cart.product} style={{ width: "150px" }} /> </th>
                    <td style={{ verticalAlign: "middle" }} > {cart.product_name} </td>
                    <td style={{ verticalAlign: "middle" }} > {cart.quantity} </td>
                    <td style={{ verticalAlign: "middle" }} > Rp {(cart.price).toLocaleString()} </td>
                    <td style={{ verticalAlign: "middle" }} > Rp {(cart.quantity*cart.price).toLocaleString()} </td>
                    {/* Delete cart button */}
                    <td style={{ verticalAlign: "middle" }} > 
                        <button className="btn btn-danger" style={{ borderRadius: "50%" }} onClick={ () => this.deleteCartButton(cart.id) } > <center>X</center> </button>  
                    </td>
                </tr>
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
    
                    <div className="container mt-5" style={{ borderRadius: "30px" }}>
                        <table className="table table-striped table-hover table-curved"  >
                            <thead className="thead-dark" >
                                <tr>
                                    <th colSpan="2"> Products </th>
                                    {/* <th> Product Name </th> */}
                                    <th> Quantity </th>
                                    <th> Unit Price </th>
                                    <th> Total Price </th>
                                    <th> Action </th>
                                </tr>
                            </thead>
    
                            <tbody>
                                {this.renderCart()}
                            </tbody>
                        </table>    
                    </div>
                </div>
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
