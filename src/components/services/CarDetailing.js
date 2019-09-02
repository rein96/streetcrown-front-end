import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../../css/services.css'

class CarDetailing extends Component {
    render() {
        return (
            // <div className="container mt-5 mb-5">          

            <section className="pricing py-5">

              <center> <h3> <b> Car Detailing Booking Form </b> </h3> </center>

                <div className="container">
                  <div className="row">
                   
                    <div className="col-lg-4">
                      <br/>
                      <div className="card mb-5 mb-lg-0">
                        <div className="card-body">
                          {/* <h5 className="card-title text-muted text-uppercase text-center">Quick Polish</h5> */}
                          <h6 className="card-price text-center"> <b>QUICK POLISH</b> </h6>
                          <hr />
                          <ul className="fa-ul">
                            <li><span className="fa-li"><i className="material-icons">check</i></span>Single User</li>
                            <li><span className="fa-li"><i className="material-icons">check</i></span>5GB Storage</li>
                            <li><span className="fa-li"><i className="material-icons">check</i></span>Unlimited Public Projects</li>
                            <li><span className="fa-li"><i className="material-icons">check</i></span>Community Access</li>
                            <li className="text-muted"><span className="fa-li"><i className="fas fa-times"></i></span>Unlimited Private Projects</li>
                            <li className="text-muted"><span className="fa-li"><i className="fas fa-times"></i></span>Dedicated Phone Support</li>
                            <li className="text-muted"><span className="fa-li"><i className="fas fa-times"></i></span>Free Subdomain</li>
                            <li className="text-muted"><span className="fa-li"><i className="fas fa-times"></i></span>Monthly Status Reports</li>
                          </ul>
                          <Link to='/bookingform/quick-polish'>
                            <button href="#" className="btn btn-block btn-primary text-uppercase">BOOK NOW</button>                          
                          </Link>
                        </div>
                      </div>
                    </div>


                    <div className="col-lg-4">
                      <div className="card wobble">
                        <div className="card-body">
                          <h5 className="card-title text-center"> <i className="material-icons" style={hotStyle}>whatshot</i> <span className="badge badge-pill badge-danger" > BEST CHOICE !  </span>  <i className="material-icons" style={hotStyle}>whatshot</i> </h5>
                          <h6 className="card-price text-center"> <b>NANO CERAMIC COATING</b> </h6>
                          <hr/>
                          <ul className="fa-ul">
                            <li><span className="fa-li"><i className="material-icons">check</i></span><strong>Unlimited Users</strong></li>
                            <li><span className="fa-li"><i className="material-icons">check</i></span>150GB Storage</li>
                            <li><span className="fa-li"><i className="material-icons">check</i></span>Unlimited Public Projects</li>
                            <li><span className="fa-li"><i className="material-icons">check</i></span>Community Access</li>
                            <li><span className="fa-li"><i className="material-icons">check</i></span>Unlimited Private Projects</li>
                            <li><span className="fa-li"><i className="material-icons">check</i></span>Dedicated Phone Support</li>
                            <li><span className="fa-li"><i className="material-icons">check</i></span><strong>Unlimited</strong> Free Subdomains</li>
                            <li><span className="fa-li"><i className="material-icons">check</i></span>Monthly Status Reports</li>
                          </ul>
                          <Link to='/bookingform/nano-ceramic-coating' >
                            <button href="#" className="btn btn-block btn-primary text-uppercase">BOOK NOW</button>
                          </Link>
                        </div>
                      </div>
                    </div>

                   
                    <div className="col-lg-4">
                      <br/>
                      <div className="card mb-5 mb-lg-0">
                        <div className="card-body">
                          {/* <h5 className="card-title text-muted text-uppercase text-center">Full Detailing</h5> */}
                          <h6 className="card-price text-center"> <b>FULL DETAILING</b> </h6>
                          <hr/>
                          <ul className="fa-ul">
                            <li><span className="fa-li"><i className="material-icons">check</i></span><strong>5 Users</strong></li>
                            <li><span className="fa-li"><i className="material-icons">check</i></span>50GB Storage</li>
                            <li><span className="fa-li"><i className="material-icons">check</i></span>Unlimited Public Projects</li>
                            <li><span className="fa-li"><i className="material-icons">check</i></span>Community Access</li>
                            <li><span className="fa-li"><i className="material-icons">check</i></span>Unlimited Private Projects</li>
                            <li><span className="fa-li"><i className="material-icons">check</i></span>Dedicated Phone Support</li>
                            <li><span className="fa-li"><i className="material-icons">check</i></span>Free Subdomain</li>
                            <li className="text-muted"><span className="fa-li"><i className="fas fa-times"></i></span>Monthly Status Reports</li>
                          </ul>
                          <Link to='/bookingform/full-detailing'>
                            <button href="#" className="btn btn-block btn-primary text-uppercase">BOOK NOW</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    



                  </div>
                </div>
                
              </section>
                
            
            // </div>  // end of container
        )
    }
}

const hotStyle = {
  color : '#d9534f'  
}

export default CarDetailing


/*

<div class="container">
  <div class="row flex-items-xs-middle flex-items-xs-center">


    <div class="col-xs-12 col-lg-4">
      <div class="card text-xs-center">
        <div class="card-header">
          <h3 class="display-2"><span class="currency">$</span>19<span class="period">/month</span></h3>
        </div>
        <div class="card-block">
          <h4 class="card-title"> 
            Basic Plan
          </h4>
          <ul class="list-group">
            <li class="list-group-item">Ultimate Features</li>
            <li class="list-group-item">Responsive Ready</li>
            <li class="list-group-item">Visual Composer Included</li>
            <li class="list-group-item">24/7 Support System</li>
          </ul>
          <a href="#" class="btn btn-gradient mt-2">Choose Plan</a>
        </div>
      </div>
    </div>


    <div class="col-xs-12 col-lg-4">
      <div class="card text-xs-center">
        <div class="card-header">
          <h3 class="display-2"><span class="currency">$</span>29<span class="period">/month</span></h3>
        </div>
        <div class="card-block">
          <h4 class="card-title"> 
            Regular Plan
          </h4>
          <ul class="list-group">
            <li class="list-group-item">Ultimate Features</li>
            <li class="list-group-item">Responsive Ready</li>
            <li class="list-group-item">Visual Composer Included</li>
            <li class="list-group-item">24/7 Support System</li>
          </ul>
          <a href="#" class="btn btn-gradient mt-2">Choose Plan</a>
        </div>
      </div>
    </div>


    <div class="col-xs-12 col-lg-4">
      <div class="card text-xs-center">
        <div class="card-header">
          <h3 class="display-2"><span class="currency">$</span>39<span class="period">/month</span></h3>
        </div>
        <div class="card-block">
          <h4 class="card-title"> 
            Premium Plan
          </h4>
          <ul class="list-group">
            <li class="list-group-item">Ultimate Features</li>
            <li class="list-group-item">Responsive Ready</li>
            <li class="list-group-item">Visual Composer Included</li>
            <li class="list-group-item">24/7 Support System</li>
          </ul>
          <a href="#" class="btn btn-gradient mt-2">Choose Plan</a>
        </div>
      </div>
    </div>

  </div>
</div>

*/