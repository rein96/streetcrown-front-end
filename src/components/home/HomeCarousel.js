import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import infographic from '../../images/infographic.jpg'
import mobiltua from '../../images/mobiltua.jpg'
import nmax from '../../images/nmax.jpg'

class HomeCarousel extends Component {

  render() {
    return (
        <div className="background-odd">
            <div className="container">
                <br/><br/>
                <div id="carouselStreetCrown" className="carousel slide" data-ride="carousel">
                    {/* CAROUSEL INDEX INDICATOR */}
                    <ol className="carousel-indicators">
                        <li data-target="#carouselStreetCrown" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselStreetCrown" data-slide-to="1"></li>
                        <li data-target="#carouselStreetCrown" data-slide-to="2"></li>
                    </ol>

                    {/* IMAGE INSIDE CAROUSEL */}
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <Link to='/cardetailing'>
                                <img className="d-block w-100 img-fluid radius-custom" src={infographic} alt="First slide"/>                            
                            </Link>
                        </div>
                        <div className="carousel-item">
                            <Link to='/cardetailing'>
                                <img className="d-block w-100 radius-custom" src={mobiltua} alt="Second slide"/>                            
                            </Link>
                        </div>
                        <div className="carousel-item">
                            <Link to='/motorcycledetailing'>
                                <img className="d-block w-100 radius-custom" src={nmax} alt="Third slide"/>                            
                            </Link>
                        </div>
                    </div>

                    {/* CAROUSEL BUTTONS */}
                    <a className="carousel-control-prev" href="#carouselStreetCrown" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselStreetCrown" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>

                <br/><br/>
            </div>
    </div>

    );
  };
};


export default HomeCarousel;