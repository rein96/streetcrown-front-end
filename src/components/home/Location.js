import React, { Component } from 'react'

class Location extends Component {
    render() {
        return (
            <div className="background-odd">
                <div className="container" style={{ backgroundColor: '' }} >
                    <div className="container-fluid">
                        <br/><br/>

                        <center>
                            <h2> 
                                <i className="material-icons" style={locationStyle} >location_on</i> 
                                    &nbsp; <span className="badge badge-dark"> Our Workshop </span> &nbsp;
                                <i className="material-icons" style={locationStyle}>location_on</i>
                            </h2> 
                        </center>

                        <div className="row">

                            <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                            <center> <h4> <span className="badge badge-danger"> Jakarta </span> </h4> </center>
                            <center> <b> Sunter Pulo Kecil No.18, Jakarta Utara 14360 </b> </center>  <br/>
                                <iframe className="card-img" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.797109554154!2d106.87366524978368!3d-6.1579221620464475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f527a8d55b77%3A0x7f8b65aa8a24f26f!2sStreetCrown+auto+detailing!5e0!3m2!1sen!2sid!4v1564121904296!5m2!1sen!2sid" width="600" height="450" frameBorder="0" style={{border:0}} allowFullScreen title="Jakarta" />  
                            </div>

                            <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                            <center> <h4> <span className="badge badge-danger"> Bandung </span> </h4> </center>
                            <center> <b>Taman Kopo Indah No.10, Mekar Rahayu, Bandung 40218</b> </center> <br/>
                                <iframe className="card-img" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d728119.8112998739!2d106.68279659297585!3d-6.434357799607231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68ef20c2509fc5%3A0x3bd6f19687fcfe97!2sStreetcrown+Auto+Detailing+%26+Engine+Treatment!5e0!3m2!1sen!2sid!4v1564121951872!5m2!1sen!2sid" width="600" height="450" frameBorder="0" style={{border:0}} allowFullScreen title="Bandung" /> 
                            </div>
                        </div>
                    </div>
                    <br/><br/>
                </div>
            </div>
        )
    }
}

const locationStyle = { fontSize: '35px',  verticalAlign : 'middle' }

export default Location
