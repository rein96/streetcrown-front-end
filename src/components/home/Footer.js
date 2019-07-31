import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import streetcrown_logo from '../../images/streetcrown-logo.png'

class Footer extends Component {
    render() {
        return (
            <footer>
            <div className="container">
            <div className="row">
            
                <div className="col-md-4 col-sm-6 col-xs-12">
                    <Link to='/'> <img src={streetcrown_logo} width="250px" className="mt-5" alt="logo" /> </Link> 
                </div>
                
                {/* JAKARTA */}
                <div className="col-md-4 col-sm-6 col-xs-12">
                    <ul className="address" >
                        <p className="footer-title" >Jakarta</p>    
                        <li>
                            <a href="https://api.whatsapp.com/send?phone=628999993164&text=Halo%20StreetCrown!" target="_blank" rel="noopener noreferrer">
                                <img src="https://image.flaticon.com/icons/svg/134/134937.svg"  alt="Whatsapp-icon" style={{ width: "40px" }} /> 
                                <span className="text-white ml-2 " > 0812-8870-4003 (Rei) </span>
                            </a>
                        </li>
                            
                        <li>
                            <a href="https://www.instagram.com/streetcrown.autodetailing/" target="_blank" rel="noopener noreferrer">
                                <img src="https://image.flaticon.com/icons/svg/174/174855.svg" style={{width: "37px"}} alt="instagram" /> 
                                <span className="text-white ml-2 " > streetcrown.autodetailing </span>
                            </a>
                        </li>
                            
                        <li>
                            <img src="https://image.flaticon.com/icons/svg/252/252025.svg" style={{width: "37px"}} alt="location" /> 
                            <span className="text-white ml-2 " > Jl. Sunter Pulo Kecil No.18, Jakarta Utara </span> 
                        </li>
                            
                        <li>
                            {/* Google maps */}
                            <a href="https://goo.gl/maps/x4cAuisnTuMBxjtQ9" target="_blank" rel="noopener noreferrer">
                                <img src="https://image.flaticon.com/icons/svg/281/281767.svg" style={{width: "37px"}} alt="gmaps" />  <span className="text-white ml-2 " > Google Maps </span> 
                            </a>
                        
                            {/* Waze */}
                            <a href="https://www.waze.com/ul?ll=-6.15792750%2C106.87585930&navigate=yes" target="_blank" rel="noopener noreferrer">
                                <img src="https://image.flaticon.com/icons/svg/732/732257.svg" style={{width: "37px"}} className="ml-4" alt="waze" /> <span className="text-white ml-2 " > Waze </span> 
                            </a>
                        </li>
                    </ul>
                </div>

                {/* BANDUNG */}
                <div className="col-md-4 col-sm-6 col-xs-12">
                    <ul className="address" >
                        <p className="footer-title" >Bandung</p>    
                        <li>
                            <a href="https://api.whatsapp.com/send?phone=628999993164&text=Halo%20StreetCrown!" target="_blank" rel="noopener noreferrer">
                                <img src="https://image.flaticon.com/icons/svg/134/134937.svg"  alt="Whatsapp-icon" style={{ width: "40px" }} /> 
                                <span className="text-white ml-2 " > 0851-0836-6633 (William) </span>
                            </a>
                        </li>
                            
                        <li>
                            <a href="https://www.instagram.com/streetcrown" target="_blank" rel="noopener noreferrer">
                                <img src="https://image.flaticon.com/icons/svg/174/174855.svg" style={{width: "37px"}} alt="instagram" /> <span className="text-white ml-2 " > streetcrown </span>
                            </a>
                        </li>
                            
                        <li>
                            <img src="https://image.flaticon.com/icons/svg/252/252025.svg" style={{width: "37px"}} alt="location" /> <span className="text-white ml-2 " > Jl. Taman Kopo Indah No.10, Bandung </span> 

                        </li>
                            
                        <li>
                            {/* Google maps */}
                            <a href="https://goo.gl/maps/83hKMY7hHr11ASHB8" target="_blank" rel="noopener noreferrer" >
                                <img src="https://image.flaticon.com/icons/svg/281/281767.svg" style={{width: "37px"}} alt="gmaps" />   <span className="text-white ml-2 " > Google Maps </span>
                            </a>
                        
                            {/* Waze */}
                            <a href="https://www.waze.com/ul?ll=-6.96976690%2C107.55509220&navigate=yes"  target="_blank" rel="noopener noreferrer">
                                <img src="https://image.flaticon.com/icons/svg/732/732257.svg" style={{width: "37px"}} className="ml-4" alt="waze" /> 
                                <span className="text-white ml-2 " > Waze </span>
                            </a>
                        </li>
                    </ul>
                </div>

                    
                </div> 
                <center> <small class="text-white">Copyright {new Date().getFullYear()} &copy; StreetCrown</small>  </center>
                </div>
            </footer>
        )
    }
}

export default Footer
