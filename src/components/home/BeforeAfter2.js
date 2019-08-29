import React, { Component } from 'react'
import imgbefore from '../../images/close-before.jpg'
import imgafter from '../../images/close-after.jpg'

import '../../css/beerslider.css'

class BeforeAfter2 extends Component {
    render() {
        return (
            <div className="container mt-4">

                <center>
                    <div id="beer-slider2" className="beer-slider shadow-lg" style={{ borderRadius: '15px' }} data-beer-label="after" >
                            <img src={imgafter} style={{ width : '800px' }}  alt="before"  />
                        <div className="beer-reveal" data-beer-label="before">
                            <img src={imgbefore}  alt="after"   />
                        </div>
                    </div>

                </center>

                <br/><br/>

            </div>
        )
    }
}

export default BeforeAfter2
