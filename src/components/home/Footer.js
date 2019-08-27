import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import streetcrown_logo from '../../images/streetcrown-logo.png'

class Footer extends Component {
    render() {
        return (
            <footer id="footer">
            <div className="container">
                <div className="row">
                
                    <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 col-12">
                        <Link to='/'> <center> <img src={streetcrown_logo} width="250px" className="mt-5" alt="logo" /> </center>  </Link> 
                    </div>
                    
                    {/* JAKARTA */}
                    <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 col-12">

                        <div className="row">
                            <div className="col">

                                <ul className="address" >
                                    <p className="footer-title" >Jakarta</p>    
                                    <li>
                                        <a href="https://api.whatsapp.com/send?phone=628999993164&text=Halo%20StreetCrown!" target="_blank" rel="noopener noreferrer">
                                            <img src="https://image.flaticon.com/icons/svg/134/134937.svg"  alt="Whatsapp-icon" style={{ width: "22px" }} /> 
                                            <span className="text-white ml-2 text-footer" > 0812-8870-4003 (Rei) </span>
                                        </a>
                                    </li>
                                        
                                    <li>
                                        <a href="https://www.instagram.com/streetcrown.autodetailing/" target="_blank" rel="noopener noreferrer">
                                            <img src="https://image.flaticon.com/icons/svg/174/174855.svg" style={{width: "22px"}} alt="instagram" /> 
                                            <span className="text-white ml-2 text-footer" > streetcrown.autodetailing </span>
                                        </a>
                                    </li>
                                        
                                    <li>
                                        <img src="https://image.flaticon.com/icons/svg/252/252025.svg" style={{width: "22px"}} alt="location" /> 
                                        <span className="text-white ml-2 text-footer" > Jl. Sunter Pulo Kecil No.18, Jakarta Utara </span> 
                                    </li>
                                        
                                    <li>
                                        {/* Google maps */}
                                        <a href="https://goo.gl/maps/x4cAuisnTuMBxjtQ9" target="_blank" rel="noopener noreferrer">
                                            <img src="https://image.flaticon.com/icons/svg/281/281767.svg" style={{width: "22px"}} alt="gmaps" />  <span className="text-white ml-2 text-footer" > Maps </span> 
                                        </a>
                                    
                                        {/* Waze */}
                                        <a href="https://www.waze.com/ul?ll=-6.15792750%2C106.87585930&navigate=yes" target="_blank" rel="noopener noreferrer">
                                            <img src="https://image.flaticon.com/icons/svg/732/732257.svg" style={{width: "22px"}} className="ml-4" alt="waze" /> <span className="text-white ml-2 text-footer" > Waze </span> 
                                        </a>
                                    </li>
                                </ul>

                            </div>

                            <div className="col">                              

                            {/* BANDUNG */}

                            <ul className="address" >
                                <p className="footer-title" >Bandung</p>    
                                <li>
                                    <a href="https://api.whatsapp.com/send?phone=628999993164&text=Halo%20StreetCrown!" target="_blank" rel="noopener noreferrer">
                                        <img src="https://image.flaticon.com/icons/svg/134/134937.svg"  alt="Whatsapp-icon" style={{ width: "22px" }} /> 
                                        <span className="text-white ml-2 text-footer" > 0851-0836-6633 (William) </span>
                                    </a>
                                </li>
                                    
                                <li>
                                    <a href="https://www.instagram.com/streetcrown" target="_blank" rel="noopener noreferrer">
                                        <img src="https://image.flaticon.com/icons/svg/174/174855.svg" style={{width: "22px"}} alt="instagram" /> <span className="text-white ml-2 text-footer" > streetcrown </span>
                                    </a>
                                </li>
                                    
                                <li>
                                    <img src="https://image.flaticon.com/icons/svg/252/252025.svg" style={{width: "22px"}} alt="location" /> <span className="text-white ml-2 text-footer" > Jl. Taman Kopo Indah No.10, Bandung </span> 

                                </li>
                                    
                                <li>
                                    {/* Google maps */}
                                    <a href="https://goo.gl/maps/83hKMY7hHr11ASHB8" target="_blank" rel="noopener noreferrer" >
                                        <img src="https://image.flaticon.com/icons/svg/281/281767.svg" style={{width: "22px"}} alt="gmaps" />   <span className="text-white ml-2 text-footer" > Maps </span>
                                    </a>
                                
                                    {/* Waze */}
                                    <a href="https://www.waze.com/ul?ll=-6.96976690%2C107.55509220&navigate=yes"  target="_blank" rel="noopener noreferrer">
                                        <img src="https://image.flaticon.com/icons/svg/732/732257.svg" style={{width: "22px"}} className="ml-4" alt="waze" /> 
                                        <span className="text-white ml-2 text-footer" > Waze </span>
                                    </a>
                                </li>
                            </ul>

                            </div>
                        </div>
                        

                    </div>




                        
                </div>

                <center> 
                    <small class="text-white">Copyright {new Date().getFullYear()} &copy; StreetCrown</small> <br/>  
                    <small class="text-white">Privacy Policy   |  Terms of use</small>
                </center>
                </div>
            </footer>
        )
    }
}

export default Footer
