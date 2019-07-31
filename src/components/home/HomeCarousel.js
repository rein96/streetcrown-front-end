import React, { Component } from 'react';

class HomeCarousel extends Component {

  render() {
    return (
        <div id="demo" className="carousel slide banner-carousel container-fluid" data-ride="carousel">

          <ul className="carousel-indicators">
              <li data-target="#demo" data-slide-to="0" className="active"></li>
              <li data-target="#demo" data-slide-to="1"></li>
              <li data-target="#demo" data-slide-to="2"></li>
          </ul>
          

          <div className="carousel-inner">
              <div className="carousel-item active">
                  <center>
                        
                        <img src="https://images.pexels.com/photos/251225/pexels-photo-251225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Gambar - 1" width="720" height="576" />
                        <div className="carousel-caption">
                              <div> Love Problem-Solving </div>
                        </div>
                  </center> 
              </div>
              <div className="carousel-item">
                  <center>
                          <img src="https://images.unsplash.com/photo-1540576701-439ee01f9b38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80" alt="Gambar - 1" width="720" height="576" />
                          <div className="carousel-caption">
                                  <div> Love Calisthenics Workout </div>
                          </div>
                  </center> 
              </div>
              <div className="carousel-item">
                  <center>
                          
                          <img src="https://images.unsplash.com/photo-1550517636-ad7bac40dc28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="Gambar - 1" width="720" height="576" />
                          <div className="carousel-caption">
                                  <div> Car enthusiast </div>
                          </div>
                  </center> 
              </div>
          </div>
      

          <a className="carousel-control-prev" href="#demo" data-slide="prev">
              <span className="carousel-control-prev-icon"></span>
          </a>
          <a className="carousel-control-next" href="#demo" data-slide="next">
              <span className="carousel-control-next-icon"></span>
          </a>
      </div> 
    );
  };
};


export default HomeCarousel;