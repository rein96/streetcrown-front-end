import React, { Component } from 'react'
import img1 from '../../images/img1.jpg'
import img2 from '../../images/img2.jpg'

import '../../css/beerslider.css'

class BeforeAfter extends Component {

    render() {
        return (
            <div className="container mt-4">
                <div id="beer-slider" className="beer-slider" data-beer-label="before">
                        <img src={img1} alt="before"  />
                    <div className="beer-reveal" data-beer-label="after">
                        <img src={img2} alt="after"   />
                    </div>
                </div>

            </div>


        // <div class="container">
        //     <div id="beer-slider" class="beer-slider" data-beer-label="before">
        //       <img src={img1}  alt="before"   />
        //       <div class="beer-reveal" data-beer-label="after">
        //         <img src={img2}  alt="after"  />
        //     </div>
        // </div>

        // </div>
          
        )
    }
}

export default BeforeAfter
