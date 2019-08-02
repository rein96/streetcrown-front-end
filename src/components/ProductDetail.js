import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../config/axios';
import { Link } from 'react-router-dom'

// import { getSingleProduct } from '../actions/index'

const imageStyle = {
    width: '500px'
}

const verticalCenter = {
    minHeight: '100%',  
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
        // let selectedProductObject = this.props.productsSTATE.filter( product => product.id == productID )

        try{
            const res = await axios.get(`/singleproduct/${productID}`)

            this.setState( { selectedProduct : res.data } )
            console.log(this.state.selectedProduct)

        } catch(err) {
            console.error(err)
        }

    }

    addToCartButton = () => {
        const amountOfProducts = parseInt(this.quantity.value)
        console.log(amountOfProducts)
        console.log(typeof(amountOfProducts))

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
                            <p> {description} </p>

                            <br/>
                            <h5> Quantity </h5>
                            <input ref={input => this.quantity = input}  type='number' placeholder="Quantity" className="form-control mb-3" min="1" defaultValue={1}/>
                            <button className="btn btn-danger" onClick={ () => this.addToCartButton() }> Add To Cart </button>

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
        productsSTATE : state.product.products
    }
}

export default connect(mapStateToProps)(ProductDetail);
