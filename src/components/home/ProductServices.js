import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import cardetailinggroup from '../../images/car-detailing-group.jpg'
import detailingequipment from '../../images/detailing-equipment-group.jpg'
import motorcycledetailing from '../../images/motorcycle-detailing-group.jpg'


class ProductServices extends Component {
    render() {
        return (
            <div className="background-even">
                <div className="container container-fluid ">
                    <br/><br/>
                    <center> <h2 className="text-white" style={{ fontWeight: '600' }}> <span className="badge badge-light">  Our Offer </span> </h2> </center>

                    <div className="row">

                        <div className="col-12 col-sm-12 col-md-12 col-lg-4 mt-2 coba">
                            <Link to='/motorcycledetailing'>
                                <img className="card-img shadow-lg" style={{ borderRadius : '15px' }} src={motorcycledetailing} alt="Motorcycle Detailing" />
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


                        <div className="col-12 col-sm-12 col-md-12 col-lg-4 mt-2 coba">
                            <Link to='/cardetailing'>
                                <img className="card-img shadow-lg" style={{ borderRadius : '15px' }} src={cardetailinggroup} alt="Car Detailing" />
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
                        
                        
                        <div className=" col-12 col-sm-12 col-md-12 col-lg-4  mt-2 coba">
                            <Link to='/products'>
                                <img className="card-img shadow-lg" style={{ borderRadius : '15px' }} src={detailingequipment} alt="Detailing Equipment"/>
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
            </div>
        )
    }
}

export default ProductServices
