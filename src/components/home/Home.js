import React from 'react';

import '../../css/home.css'

import HomeCarousel from './HomeCarousel'
import ProductServices from './ProductServices'
import Location from './Location'
import BeforeAfter from './BeforeAfter'



class Home extends React.Component {


    render() {
        return (
            <div>

                <HomeCarousel />
                <ProductServices />
                <BeforeAfter />
                <Location />

                {/* imported to App.js */}
                    {/* <Footer /> */}
                    {/* <HomeModal /> */}
            </div>



        );  // End return
         
    }; // End render()

}; // End Class

export default Home;