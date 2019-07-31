import React from 'react';
// import {Link} from 'react-router-dom';



import '../../css/home.css'

import HomeCarousel from './HomeCarousel'
import ProductServices from './ProductServices'
import Location from './Location'
import Footer from './Footer'
import HomeModal from './HomeModal'



class Home extends React.Component {



    render() {
        return (
            <div>

                <HomeCarousel />
                <ProductServices />
                <Location />
                <Footer />

                <HomeModal />






                {/* Footer */}
                {/* <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
                        <div class="container text-center">
                        <small class="text-white">Copyright 2019 &copy; StreetCrown</small>
                            <a href="https://www.instagram.com/reinhartandreas/" target="_blank" rel="noopener noreferrer"> 
                                <img src="https://image.flaticon.com/icons/svg/174/174855.svg" style={{"width": "30px"}} class="m-1" />
                            </a>
                        </div>
                </footer> */}

                {/* FOOTER ALTERNATIVE */}





                {/*  FLOATING ACTION BUTTON */}
                {/* <a href="https://api.whatsapp.com/send?phone=628999993164&text=Halo%20StreetCrown!" class="float wobble" target="_blank">
                    <i class="fa fa-whatsapp my-float"></i>
                </a> */}

                {/* <Button className='float' color="primary" onClick={this.toggle}> <i class="fa fa-whatsapp my-float"></i>  </Button> */}




                {/* <button className="float" type="button" data-toggle="modal" data-target="#exampleModal" >
                    <i class="fa fa-whatsapp my-float"></i>
                </button> */}

            </div>



        );  // End return
         
    }; // End render()

}; // End Class

export default Home;