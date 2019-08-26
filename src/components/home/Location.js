import React, { Component } from 'react'

class Location extends Component {
    render() {
        return (
            <div className="container" style={{ backgroundColor: '' }} >
                <div className="container-fluid">

                    <center>
                        <h3> 
                            <i class="material-icons" style={{ fontSize: '35px' }} >location_on</i> 
                                &nbsp; Our Workshop &nbsp;
                            <i class="material-icons" style={{ fontSize: '35px' }}>location_on</i>
                        </h3> 
                    </center>

                    <div className="row">

                        <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                        <center> <h3> Jakarta </h3> </center>
                            <iframe className="card-img" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.797109554154!2d106.87366524978368!3d-6.1579221620464475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f527a8d55b77%3A0x7f8b65aa8a24f26f!2sStreetCrown+auto+detailing!5e0!3m2!1sen!2sid!4v1564121904296!5m2!1sen!2sid" width="600" height="450" frameborder="0" style={{border:0}} allowfullscreen />  
                        </div>

                        <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                        <center> <h3> Bandung </h3> </center>
                            <iframe className="card-img" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d728119.8112998739!2d106.68279659297585!3d-6.434357799607231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68ef20c2509fc5%3A0x3bd6f19687fcfe97!2sStreetcrown+Auto+Detailing+%26+Engine+Treatment!5e0!3m2!1sen!2sid!4v1564121951872!5m2!1sen!2sid" width="600" height="450" frameborder="0" style={{border:0}} allowfullscreen /> 
                        </div>
                    </div>
                </div>
                <br/><br/>
            </div>
        )
    }
}

export default Location
