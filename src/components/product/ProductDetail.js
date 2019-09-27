import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../config/axios';
import { Link, withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'

import { addCart, getCarts, updateQuantity } from '../../actions/index'

const imageStyle = {
    width: '300px'
}

const verticalCenter = {
    // minHeight: '100%',  
    minHeight: '100vh',
  
    display: 'flex',
    alignItems: 'center',
    backgroundColor : 'white'
}

const backStyle = {
    fontSize : '39px',
    backgroundColor : '#d9534f',    // bootstrap danger #hex
    color:'white',
    borderRadius: '50%'
}

class ProductDetail extends Component {

    state = {
        selectedProduct : {}
    }

    async componentWillMount() {
        // Define the parameter at App.js, and called from Products.js
        let productID = this.props.match.params.productID

        try{
            const res = await axios.get(`/singleproduct/${productID}`)

            this.setState( { selectedProduct : res.data } )
            console.log('%c this.state.selectedProduct', 'color:orange; font-weight:bold;');
            console.log(this.state.selectedProduct)
        } catch(err) {
            console.error(err)
        }

        // if there is no user logged in -> it will not request to backend
        if( this.props.objectUser.username === '' ) {
            return console.log('No user')
        }

        // get Cart app level state to validate a product which had bought more than one
        await this.props.getCarts(this.props.objectUser)
        console.log('%c this.props.cartsSTATE', 'color:orange; font-weight:bold;');
        console.log(this.props.cartsSTATE)
    }

    addToCartButton = async () => {   // need product_id, user_id, quantity

        if( this.props.objectUser.username === '' ) {
            alert('You need to login first!')
            // redirect to /login using withRouter + history.push
            return (
                this.props.history.push('/login')
            )
        }

        const quantityProduct = parseInt(this.quantity.value)
        // console.log(quantityProduct)   // 5 Number
        // console.log(typeof(quantityProduct))

        console.log('%c this.props.cartsSTATE', 'color:orange; font-weight:bold;');
        console.log(this.props.cartsSTATE)

        let productID = this.props.match.params.productID
        
        // If user order a product more than once, should be validated first in 
        // Misalkan productID = 5 (Honda)
        const existingProduct =  this.props.cartsSTATE.find( cart => cart.product_id == productID )
        console.log('%c existingProduct', 'color:orange; font-weight:bold;');
        console.log(existingProduct);

        if(existingProduct) {
            // patch quantity
            console.log('Patch quantity')
            const newQuantity = existingProduct.quantity + quantityProduct  
            const resdata = await this.props.updateQuantity(newQuantity, existingProduct.product_id, this.props.objectUser.id )
            if(resdata.insertId === 0) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000
                  })
                  
                  Toast.fire({
                    type: 'success',
                    title: 'The product on your cart has been updated ! :)'
                  })
                // alert('The product on your cart has been updated ! :) ')
            }
            await this.props.getCarts(this.props.objectUser)
        } else {
            // post addCart
            console.log('Post new cart')
            const resdata = await this.props.addCart(productID, this.props.objectUser.id, quantityProduct)
            if(resdata.insertId) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000
                  })
                  
                  Toast.fire({
                    type: 'success',
                    title: 'Product has been added to your cart :)'
                  })
            }
            await this.props.getCarts(this.props.objectUser)
        }

    }

    render() {
        const { id, name, price, description, category, image } = this.state.selectedProduct
        return (
            <div className="jumbotron" style={verticalCenter}>
                
                <div className="container shadow-lg" style={{ borderRadius : '20px' }}>
                    <br/>
                <Link to='/products' >
                    <i className="material-icons shadow" style={backStyle}>arrow_back</i>
                </Link>
                    <div className="row m-5">

                        <div className="col">
                            <img src={`http://localhost:2019/products/${image}`} style={imageStyle} />  
                        </div>

                        <div className="col">
                            <h2> {name} </h2>
                            <h3 className={ 'badge badge-pill ' + ( category === 'Exterior' ? 'badge-primary' : ( category === 'Interior' ? 'badge-success' : 'badge-danger' ) ) } > {category} </h3>

                            <h3>Rp {price} </h3>
                            <br/><br/>
                            
                            <h3> Description </h3>
                            <p style={{ whiteSpace : "pre-line" }} > {description} </p>

                            <br/>
                            <h5> Quantity </h5>
                            <input ref={input => this.quantity = input}  type='number' placeholder="Quantity" className="form-control mb-3" min="1" defaultValue={1}/>

                            <button className="btn btn-danger btn-block" onClick={ () => this.addToCartButton() }> Add To Cart </button>

                            <br/><br/>
                        </div>

                    </div>  {/* end of row */}
                
                </div>

            </div>

        )
    }
}

const mapStateToProps = state => {
    return{
        productsSTATE : state.product.products,
        objectUser : state.auth,
        cartsSTATE : state.carts.carts
    }
}

export default withRouter(connect(mapStateToProps, { addCart, getCarts, updateQuantity } )(ProductDetail));
