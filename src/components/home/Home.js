import React from 'react';

import '../../css/home.css'

import HomeCarousel from './HomeCarousel'
import ProductServices from './ProductServices'
import Location from './Location'
import BeforeAfter from './BeforeAfter'
import BeforeAfter2 from './BeforeAfter2'



class Home extends React.Component {


    render() {
        return (
            <div>

                <HomeCarousel />
                <ProductServices />
                <BeforeAfter />
                <BeforeAfter2 />
                <Location />

                {/* imported to App.js */}
                    {/* <Footer /> */}
                    {/* <HomeModal /> */}
            </div>



        );  // End return
         
    }; // End render()

}; // End Class

export default Home;