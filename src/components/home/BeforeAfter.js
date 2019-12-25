import React, { Component } from 'react'
import img1 from '../../images/hrv-before.jpg'
import img2 from '../../images/hrv-after.jpg'


import '../../css/beerslider.css'

class BeforeAfter extends Component {

    render() {
        return (
            <div className="background-odd">
                <div className="container">
                    <br/><br/>
                    <center> <h2> <span className="badge badge-dark">  Before vs After </span> </h2> </center>
                    <center> <br/>

                    <div id="beer-slider" className="beer-slider shadow-lg" style={{ borderRadius: '15px' }} data-beer-label="after" >
                            <img src={img2} style={{ width : '800px' }}  alt="before"  />
                        <div className="beer-reveal" data-beer-label="before">
                            <img src={img1}  alt="after"   />
                        </div>
                    </div>

                    </center>

                    <br/><br/>

                </div>
            </div>

            // PAKE TULISAN "BEFORE AFTER"
            // <div className="container mt-4">
            //     <center> <h2> Before and After </h2> </center>
            //     <div id="beer-slider" className="beer-slider shadow-lg" style={{ borderRadius: '15px' }} data-beer-label="before">
            //             <img src={img1}  alt="before"  />
            //         <div className="beer-reveal" data-beer-label="after">
            //             <img src={img2}  alt="after"   />
            //         </div>
            //     </div>

            //     <br/><br/>

            // </div>



        )
    }
}

export default BeforeAfter
