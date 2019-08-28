import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import cardetailinggroup from '../../images/car-detailing-group.jpg'
import detailingequipment from '../../images/detailing-equipment-group.jpg'
import motorcycledetailing from '../../images/motorcycle-detailing-group.jpg'
// import motorcycle from '../../images/motorcycle-detailing.png'
// import productsBottles from '../../images/products-bottles.png'


class ProductServices extends Component {
    render() {
        return (
            <div className="container container-fluid">

                <center> <h3> Our Offer </h3> </center>

                <div className="row">

                    <div className="col-12 col-sm-12 col-md-12 col-lg-4  mt-2">
                        <Link to='/motorcycledetailing'>
                            <img className="card-img shadow-lg coba" style={{ borderRadius : '15px' }} src={motorcycledetailing} alt="Motorcycle Detailing" />
                            <div className="card-img-overlay h-100 d-flex align-items-end justify-content-between">
                                <div className="text-white font-weight-bold"> 
                                    {/* <h4> Motorcycle Detailing </h4>  */}
                                </div>
                                <div>  
                                    <button className="btn btn-danger btn-sm">Book Now</button>  
                                </div>

                                </div>
                        </Link>
                    </div>


                    <div className="col-12 col-sm-12 col-md-12 col-lg-4 mt-2">
                        <Link to='/cardetailing'>
                            <img className="card-img shadow-lg coba" style={{ borderRadius : '15px' }} src={cardetailinggroup} alt="Car Detailing" />
                            <div className="card-img-overlay h-100 d-flex align-items-end justify-content-between">
                                <div className="text-white font-weight-bold"> 
                                    {/* <h4> Car Detailing </h4>  */}
                                </div>
                                <div>  
                                    <button className="btn btn-danger btn-sm">Book Now</button>  
                                </div>

                            </div>
                        </Link>
                    </div>
                    
                    
                    <div className=" col-12 col-sm-12 col-md-12 col-lg-4  mt-2">
                        <Link to='/products'>
                            <img className="card-img shadow-lg coba" style={{ borderRadius : '15px' }} src={detailingequipment} alt="Detailing Equipment"/>
                            <div className="card-img-overlay h-100 d-flex align-items-end justify-content-between">

                                <div className="text-white font-weight-bold">
                                    {/* <h4> Detailing Equipment </h4> */}
                                </div>

                                <div>  
                                    <button className="btn btn-danger btn-sm">Shop Now</button>  
                                </div>

                            </div>
                        </Link>
                    </div>

                </div>  {/* End div row */}

                <br/><br/>
                
            </div>
        )
    }
}

export default ProductServices
