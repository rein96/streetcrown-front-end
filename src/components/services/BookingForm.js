import React, { Component } from 'react'
import { Link} from 'react-router-dom'
import { connect } from 'react-redux'

import { getDetailingData, addAddress } from '../../actions/index'

class BookingForm extends Component {

    state = {
        priceData : {},  // original_price_blabla + final_price_blabla
        detailingName : '',
        isHomeService : false
    }

    async componentWillMount(){
        let servicename = this.props.match.params.servicename
        if(servicename) {
            const resdata = await this.props.getDetailingData(servicename)
            console.log(resdata)
            await this.setState( { priceData : resdata[0], detailingName : resdata[0].name } )
            console.log(this.state.priceData)
            console.log(this.state.detailingName)
        }
    }

    checkHomeService = () => {
        console.log(this.selectedLocationType.value)
        // console.log(typeof(this.selectedLocationType.value))
        if(this.selectedLocationType.value == 'Home'){
            this.setState( { isHomeService : true } )
        } else {
            this.setState( { isHomeService : false } )
        }
    }

    // Modal Add New Address
    addAddress = () => {
        let newAddress = this.addNewAddress.value

        this.props.addAddress( newAddress, this.props.objectUser )
    }

    renderAddress = () => {
        let render = this.props.objectUser.addresses.map( address => {
            return (
                <option value={address.address} className="radius-custom">{address.address}</option>
            )
        })

        return render;
    }

    minDate = () => {
        var today = new Date()
        console.log(today)
        var dd = today.getDate()
        var mm  = today.getMonth() + 1  // January is 0 index | getMonth = 0-11 index
        var yyyy = today.getFullYear()
        // Desired output : min = "2019-08-23"

        // console.log(`${yyyy}-${mm}-${dd}`)  // Problem : "2019-8-22"
        if(mm < 10) {
            mm = '0' + mm
        }
        if (dd < 10) {
            dd = '0' + dd
        }
        console.log(`${yyyy}-${mm}-${dd}`) 

        return (`${yyyy}-${mm}-${dd}`) // Solved : 2019-08-22
    }

    setDate = () => {
        console.log(this.selectedDate.value)
    }



    render() {
        return (
            <div className="jumbotron" style={verticalCenter}>
                <div className="container shadow-lg" style={{ borderRadius : '20px' }}>
                    <br/>
                    <Link to='/cart' >
                        <button className="btn btn-outline-info m-2" > Back To Car Detailing Menu </button>
                    </Link>

                    <center> 
                        <h3> 
                            <i className="material-icons" style={ bookStyle }>book</i> Booking Form <i className="material-icons" style={ bookStyle }>book</i>   <br/><br/>
                            <b> {this.state.detailingName} </b> 
                        </h3>  
                    </center>

                    <div className="form-group">
                        <label>Car Brand</label>
                        <form className="input-group">
                            <input ref={input => this.carbrand = input} className="form-control radius-custom" type="text" placeholder="Example : Toyota, Mercedes-Benz, BMW"  required />
                        </form>
                        <small class="form-text text-muted">Required</small>
                    </div>

                    <div className="form-group">
                        <label>Car Name</label>
                        <form className="input-group">
                            <input ref={input => this.carname = input} className="form-control radius-custom" type="text" placeholder="Example : Land-cruiser, C200, X1"  required />
                        </form>
                        <small class="form-text text-muted">Required</small>
                    </div>

                    
                    <div className="form-group">
                        <label>Car Year</label>
                        <form className="input-group">
                            <input ref={input => this.caryear = input} className="form-control radius-custom" type="text" placeholder="(Optional) Example : 1996, 2011, 2019"  />
                        </form>
                        <small class="form-text text-muted">Optional</small>
                    </div>

                    <div className="form-group">
                        <label>Car Color</label>
                        <form className="input-group">
                            <input ref={input => this.carcolor = input} className="form-control radius-custom" type="text" placeholder="(Optional) Example : Black, Grey, White"  />
                        </form>
                        <small class="form-text text-muted">Optional</small>
                    </div>

                    
                    <div className="form-group">
                        <label>Car Size</label>
                        <form className="input-group">
                            
                            <select className="custom-select radius-custom" name='selectedAddress' ref={ input => this.selectedSize = input } >
                                <option value={0} className="radius-custom">Not Sure</option>
                                <option value={'S'} className="radius-custom">Small</option>
                                <option value={'M'} className="radius-custom">Medium</option>
                                <option value={'L'} className="radius-custom">Large</option>
                                <option value={'XL'} className="radius-custom">Xtra Large</option>
                            </select>
                        </form>
                        <small class="form-text text-muted"> Don't worry if you are not sure what size your car, we will check again and correct the size and the price.</small>
                    </div>

                    <div className="form-group">
                        <label>Home Service / Workshop</label>
                        <form className="input-group">
                            <select className="custom-select radius-custom" name='selectedAddress' ref={ input => this.selectedLocationType = input } onChange={ () => this.checkHomeService() } >
                                    <option value={['Workshop','Sunter Pulo Kecil']} className="radius-custom">Workshop : Sunter Pulo Kecil Jakarta Utara</option>
                                    <option value={['Workshop','Bandung']} className="radius-custom">Workshop : Taman Kopo Indah Bandung</option>
                                    <option value={'Home'} className="radius-custom">Home Service</option>
                            </select>
                        </form>
                        <small class="form-text text-muted">Required</small>
                    </div>


                { this.state.isHomeService === true && (
                    <div className="form-group">
                        <label for="uname1">Address</label>
                        <form className="input-group">

                            <select className="custom-select radius-custom" name='selectedAddress' ref={ input => this.selectedAddress = input } >
                                {this.renderAddress()}
                            </select>
        
                        </form>
                        <button className="btn btn-outline-warning float-right radius-custom mt-1 mb-1" data-toggle="modal" data-target="#modalAddress" >Add New Address</button>
                    </div>
                )}

                <div className="form-group">
                        <label>Booking Date</label>
                        <form className="input-group">
                            <input type="date" name="date" id="date" min={ this.minDate() } ref={ input => this.selectedDate = input } onChange={ () => {this.setDate()} } /> <br/>
                        </form>
                        <small class="form-text text-muted">Optional</small>
                </div>

                {/* <div className="form-group">
                        <label> Booking Time </label>
                        <form className="input-group">
                            <input type="time" name="time" id="time"  ref={ input => this.selectedTime = input } onChange={ () => {this.setTime()} } /> <br/>
                        </form>
                        <small class="form-text text-muted">Optional</small>
                </div> */}
              
                <br/>

                    <button className="btn btn-success btn-block radius-custom" onClick={ () => this.bookingButton() } >BOOK NOW !</button>


                    <br/><br/><br/>

                {/* Modal: Add New Address */}
                    <div className="modal fade" id="modalAddress" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModal3Label">Add New Address</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <form className="input-group">
                                            <input ref={input => this.addNewAddress = input} className="form-control radius-custom" type="text" required placeholder="Put your new address here!" />
                                        </form>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
                                    <button className="btn btn-success" onClick={this.addAddress}  data-dismiss="modal" >Add</button>
                                </div>
                            </div>
                          </div>
                      </div>
                    </div>
                    <div>



            </div>  {/* end container shadow */}
            

            </div>  // end jumbotron
        )
    }
}

const verticalCenter = {
    minHeight: '100vh',
  
    display: 'flex',
    alignItems: 'center',
    backgroundColor : 'white'
}

const bookStyle = {
    color:"#5cb85c", 
    fontSize:"40px"
}

const mapStateToProps = state => ({
    objectUser : state.auth
})

export default connect( mapStateToProps, { getDetailingData, addAddress } )(BookingForm)
