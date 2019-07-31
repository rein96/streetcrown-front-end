import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Products from '../Products'

import motorcycle from '../../images/motorcycle-detailing.png'
import productsBottles from '../../images/products-bottles.png'


class ProductServices extends Component {
    render() {
        return (
            <div className="container-fluid">

                <center> <h3> Welcome </h3> </center>

                <div className="row">

                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 mt-2">
                        <img className="card-img" src="https://article.images.consumerreports.org/prod/content/dam/CRO%20Images%202019/Cars/January/CR-Cars-InlineHero-2019-Acura-ILX-A-Spec-f-1-19" alt="Car Detailing" />
                        <div className="card-img-overlay h-100 d-flex align-items-end justify-content-between">
                            <div className="text-white font-weight-bold"> <h4> Car Detailing </h4> </div>
                            <div>  
                                <button className="btn btn-danger btn-sm">Book Now !</button>  
                            </div>

                            </div>
                    </div>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-4  mt-2">
                        <img className="card-img" src={motorcycle} alt="Motorcycle Detailing" />
                        <div className="card-img-overlay h-100 d-flex align-items-end justify-content-between">
                            <div className="text-white font-weight-bold"> <h4> Motorcycle Detailing </h4> </div>
                            <div>  
                                <button className="btn btn-danger btn-sm">Book Now !</button>  
                            </div>

                            </div>
                    </div>
                    
                    <div className=" col-12 col-sm-12 col-md-12 col-lg-4  mt-2">
                        <Link to='/products' component={Products} >
                            <img className="card-img" src={productsBottles} alt="Detailing Equipment"/>
                            <div className="card-img-overlay h-100 d-flex align-items-end justify-content-between">

                                <div className="text-white font-weight-bold">
                                    <h4> Detailing Equipment </h4>
                                </div>

                                <div>  
                                    <button className="btn btn-danger btn-sm">Shop Now !</button>  
                                </div>

                            </div>
                
                        </Link>

                    </div>

                </div>  {/* End div row */}
                
            </div>
        )
    }
}

export default ProductServices
