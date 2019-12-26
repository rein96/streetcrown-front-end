import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { URL } from '../../config/url'
import { getProducts } from '../../actions/index'

import '../../css/products.css'
import Spinner from '../Spinner'

class Products extends Component {

    state = {
        productArray : [],   //this array will be rendered
        exteriorLength : 0,
        loading: true
    }

    async componentDidMount() {

        const productArray = await this.props.getProducts()

        this.setState( { productArray, loading : false } );

    }

    renderListProduct = () => {
        let render = this.state.productArray.map( product => {
            return (
                <div className="card col-11 col-sm-5 col-md-3 col-lg-3 m-3 shadow" key={product.id} style={ borderRadius }>
                    <center>
                    <Link to={`/productdetail/${product.id}`} >
                    <img src={`${URL}/products/${product.image}`} className="card-img-top img-fluid shadow-lg mt-2 coba" alt="products" style={borderRadiusPict} />
                    </Link>
                    </center>
                    
                    <div className='card-body'>
                        <h5 className='card-title'> {product.name} </h5>
                        <span 
                        className={'badge badge-pill ' + ( product.category === 'Exterior' ? 'badge-primary' : ( product.category === 'Interior' ? 'badge-success' : 'badge-danger' ) ) }> {product.category} </span>
                        <p className='card-text'> Rp. {product.price.toLocaleString()} </p>
                        
                        <Link to={`/productdetail/${product.id}`} >
                            <button className="btn btn-danger btn-block" style={borderRadius} > Detail </button>
                        </Link>
                    </div>
                </div>
            )
        })
        return render;
    }

    // Filter Array function (it is created to reduce repetition of codes)
    filterExteriorArray = () => {
        const exterior = this.props.productsSTATE.filter( product => {
            return(
                product.category.includes('Exterior')
            )
        })
        return exterior
    }

    filterInteriorArray = () => {
        const interior = this.props.productsSTATE.filter( product => {
            return(
                product.category.includes('Interior')
            )
        })
        return interior
    }

    filterEngineArray = () => {
        const engine = this.props.productsSTATE.filter( product => {
            return(
                product.category.includes('Engine')
            )
        })
        return engine
    }

    // Filter by category
    selectAll = () => {
        this.setState( { productArray: this.props.productsSTATE } )
    }

    selectExterior = () => {
        const exterior = this.filterExteriorArray()
        this.setState( { productArray : exterior } )
    }

    selectInterior = () => {
        const interior = this.filterInteriorArray()
        this.setState( { productArray : interior } )
    }

    selectEngine = () => {
        const engine = this.filterEngineArray()
        this.setState( { productArray : engine } )
    }

    // Badge Count
    countExterior = () => {
        const exterior = this.filterExteriorArray()
        return exterior.length
    }

    countInterior = () => {
        const interior = this.filterInteriorArray()
        return interior.length
    }

    countEngine = () => {
        const engine = this.filterEngineArray()
        return engine.length
    }

    filterPrice = () => {
        let inputMin = parseInt(this.min.value)
        let inputMax = parseInt(this.max.value)

        // if there is a filter price (either min or max)
        if( inputMin > 0 || inputMax > 0 ) {

            let arrayFiltered = this.props.productsSTATE.filter( product => {
                // if user fill both min and max price
                if( inputMin > 0 && inputMax > 0 ) {
                    return (product.price >= inputMin && inputMax >= product.price  )

                // fill min price
                } else if (inputMin > 0) {
                    return (product.price >= inputMin)

                // fill max price
                } else if (inputMax> 0) {
                    return (product.price <= inputMax)
                }
            })

            return this.setState( { productArray : arrayFiltered } )

        } else {
            return this.setState( { productArray : this.props.productsSTATE } )
        }
    }

    // Initial render react
    render() {
        let allLength = this.props.productsSTATE.length

        if(this.state.loading) {
            return (
                <div style={{ height: '65vh' }}>
                    <Spinner />
                </div>
            )
        }

        return (
            // Category and Price Filter column
            <div>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-2 mt-2 ">
                        <div className="card make-me-sticky">
                            <article className="card-group-item mt-3">
                                <header className="card-header bg-danger"><h6 className="title text-white"> Category </h6></header>
                                <div className="filter-content">
                                    <div className="list-group list-group-flush">
                                        <button onClick={ () => this.selectAll() } className="list-group-item btn btn-link">All <span className="float-right badge badge-light round"> {allLength} </span> </button>
                                        <button onClick={ () => this.selectExterior() } className="list-group-item btn btn-link">Exterior <span className="float-right badge badge-light round"> {this.countExterior()} </span> </button>
                                        <button onClick={ () => this.selectInterior() } className="list-group-item btn btn-link">Interior <span className="float-right badge badge-light round"> {this.countInterior()} </span> </button>
                                        <button onClick={ () => this.selectEngine() } className="list-group-item btn btn-link">Engine <span className="float-right badge badge-light round"> {this.countEngine()} </span> </button>
                                    </div>  
                                </div>
                            </article> 
                                        <br/>
                            <article className="card-group-item">
                                <header className="card-header bg-danger">
                                    <h6 className="title text-white">Price Range Filter</h6>
                                </header>
                                    <div className="filter-content">
                                        <div className="card-body">
                                            <div className="form-row">
                                                <form className="input-group"><input onChange={ () => this.filterPrice() } placeholder="Minimum" ref={input => this.min = input} className="form-control mb-2" type="text" /></form>
                                                <form className="input-group"><input onChange={ () => this.filterPrice() } placeholder="Maximum" ref={input => this.max = input} className="form-control" type="text" /></form>
                                                {/* <button onClick={this.searchPrice} className="btn btn-outline-danger btn-block mt-5">Search</button> */}
                                        
                                            </div>
                                        </div>
                                    </div>
                            </article> 
                        </div> 
                    </div>

                    {/* render getProducts() */}
                    <div className="row col-10">

                        {this.renderListProduct()}

                    </div>

                </div>    
            </div>
        )
    }
}

const borderRadius = {
    // width : '300px',
    borderRadius: '18px'
}

const borderRadiusPict = {
    width : '300px',
    borderRadius: '18px'
}



const mapStateToProps = state => {
    return{
        productsSTATE : state.product.products  // this array will be filtered
    }
}

export default connect(mapStateToProps, { getProducts })(Products);
