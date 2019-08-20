import React, { Component } from 'react';

import motorcycle from '../../images/motorcycle-detailing.png'
import carwashed from '../../images/car-carwash.jpg'
import rectangle from '../../images/Rectangle.png'

class HomeCarousel extends Component {

  render() {
    return (
        <div className="container mt-3">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            {/* CAROUSEL INDEX INDICATOR */}
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>

            {/* IMAGE INSIDE CAROUSEL */}
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src={motorcycle} alt="First slide"/>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src={carwashed} alt="Second slide"/>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src={rectangle} alt="Third slide"/>
                </div>
            </div>

            {/* CAROUSEL BUTTONS */}
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
            </div>

            <br/><br/>
    </div>
    //     <div id="demo" className="carousel slide banner-carousel container-fluid mt-2" data-ride="carousel">

    //       <ul className="carousel-indicators">
    //           <li data-target="#demo" data-slide-to="0" className="active"></li>
    //           <li data-target="#demo" data-slide-to="1"></li>
    //           <li data-target="#demo" data-slide-to="2"></li>
    //       </ul>
          

    //       <div className="carousel-inner">
    //           <div className="carousel-item active">
    //               <center>
                        
    //                     <img src={motorcycle} alt="Gambar - 1" width="720" height="576" />
    //                     <div className="carousel-caption">
    //                           <div> Car Lover </div>
    //                     </div>
    //               </center> 
    //           </div>
    //           <div className="carousel-item">
    //               <center>
    //                       <img src={carwashed} alt="Gambar - 1" width="720" height="576" />
    //                       <div className="carousel-caption">
    //                               <div> Car detailing </div>
    //                       </div>
    //               </center> 
    //           </div>
    //           <div className="carousel-item">
    //               <center>
                          
    //                       <img src={rectangle} alt="Gambar - 1" />
    //                       <div className="carousel-caption">
    //                               <div> Car enthusiast </div>
    //                       </div>
    //               </center> 
    //           </div>
    //       </div>
      

    //       <a className="carousel-control-prev" href="#demo" data-slide="prev">
    //           <span className="carousel-control-prev-icon"></span>
    //       </a>
    //       <a className="carousel-control-next" href="#demo" data-slide="next">
    //           <span className="carousel-control-next-icon"></span>
    //       </a>
    //   </div> 
    );
  };
};

// const rectangle = {
//     /* Rectangle */
    
//     position: 'absolute',
//     width: '3600px',
//     height: '675px',
    
//     background: '#5E52E9',
    
    
//     }


export default HomeCarousel;