import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'

import { getDetailingData, addAddress, carDetailingBooking } from '../../actions/index'

import comparisonSize from '../../images/comparison-car-size.png'

class BookingForm extends Component {

    state = {
        priceData : {},  // original_price_blabla + final_price_blabla
        detailingName : '',
        isHomeService : false,
        booking_price : 0
    }

    async componentWillMount(){
        window.scrollTo(0, 0);
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
        if(this.selectedLocationType.value === 'Home'){
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
                <option value={address.address} className="radius-custom" key={address.id}>{address.address}</option>
            )
        })

        return render;
    }

    minDate = () => {
        var today = new Date()
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
        // console.log(`${yyyy}-${mm}-${dd}`) 

        return (`${yyyy}-${mm}-${dd}`) // Solved : 2019-08-22
    }

    setDate = () => {
        console.log(this.selectedDate.value)
    }

    imageModal = () => {
        Swal.fire({
            imageUrl: comparisonSize,
            imageAlt: 'payment-image',
          })
    };

    // NOT USED
    showPriceBasedOnSize = async () => {
        console.log(this.selectedSize.value)
        var selectedSize = this.selectedSize.value   // 0, Small, Medium, Large, Extra Large
        const { final_price_Small, final_price_Medium, final_price_Large, final_price_XL } = this.state.priceData
        if( selectedSize === '0'){
            await this.setState(  { booking_price : '-' } )

        } else if (selectedSize === 'Small'){
            await this.setState(  { booking_price : final_price_Small } )

        } else if (selectedSize === 'Medium'){
            await this.setState(  { booking_price : final_price_Medium } )

        } else if (selectedSize === 'Large'){
            await this.setState(  { booking_price : final_price_Large } )
            
        } else if (selectedSize === 'XL'){
            await this.setState(  { booking_price : final_price_XL } )
        }
        // alert(this.state.booking_price)
    }

    bookingButton = async () => {
        if(this.props.objectUser.username === '') {
            const result = await Swal.fire({
                title: 'Login First!',
                text: "To book our service, user should login first.",
                type: 'warning',
                // showCancelButton: true,
                confirmButtonColor: '#5cb85c',
                // cancelButtonColor: '#f9f9f9',
                confirmButtonText: 'Login Now!'
              })

            if (result.value) {
                return this.props.history.push('/login')
            }
        }

        var carbrand = (this.carbrand.value).toUpperCase()
        var carname = this.carname.value.toUpperCase()
        if(carbrand === ''){
            return alert('Please input the car brand')
        }

        if(carname === ''){
            return alert('Please input the car name')
        }

        var selectedSize = this.selectedSize.value  // 0, Small, Medium, Large, Extra Large
        var selectedLocationType = this.selectedLocationType.value  // 'Home' or 'Workshop'

        if(selectedLocationType === 'Home'){
            var selectedAddress = this.selectedAddress.value    // Read address from user
            if(selectedAddress === '') {
                return alert('You must input an address for home service, please add new one !')
            }            
        } else {
            var splitArray = selectedLocationType.split(',')
            // console.log(splitArray)      // ["Workshop", "Sunter Pulo Kecil"]
            selectedLocationType = splitArray[0]
            selectedAddress = splitArray[1]
        }

        var selectedDate = this.selectedDate.value
        var caryear = this.caryear.value
        var carcolor = this.carcolor.value

        if(caryear === ''){
            caryear = 'No info'
        }
        if(carcolor === ''){
            carcolor = 'No info'
        }

        var contactNumber = this.contactNumber.value
        if (contactNumber == ''){
            return alert('Please input your contact number (Whatsapp Number is recommended)')
        }

        console.log(carbrand, carname, selectedSize)
        console.log(selectedLocationType)
        console.log(selectedAddress)
        console.log(selectedDate, caryear, carcolor)
        console.log(contactNumber)
        const resdata = await this.props.carDetailingBooking(
            this.props.objectUser.id, this.state.priceData.id, carbrand, carname, selectedSize, selectedLocationType,
             selectedAddress, selectedDate, contactNumber, caryear, carcolor)
        console.log(resdata)
        if(resdata.insertId){
            Swal.fire({
                title: 'Booking success !',
                text: "You can direct the booking form to our Whatsapp Number",
                type: 'success',
                // showCancelButton: true,
                confirmButtonColor: '#5cb85c',
                // cancelButtonColor: '#f9f9f9',
                confirmButtonText: 'WhatsApp Now!'
              }).then((result) => {
                if (result.value) {
                    // window.open(`https://api.whatsapp.com/send?phone=62999993164&text=Halo%20StreetCrown%2C%20aku%20barusan%20booking%20dari%20website%20StreetCrown%20nih%20!%20Berikut%20informasi%20bookingnya%20%3A%20%0AMobil%20%3A%20${carbrand}%20${carname}%0APaket%20%20%3A%20${this.state.priceData.name}%20-%20${selectedSize}%20%0ATanggal%20Booking%20%3A%20${selectedDate}%20(tahun-bulan-hari)%0ALokasi%20%3A%20${selectedAddress}%0AMinta%20harga%20terbaik%20untuk%20mobilku%20dong%20!%0ATerimakasih%20StreetCrown!`)
                    window.open(`https://api.whatsapp.com/send?phone=628999993164&text=Halo%20StreetCrown%2C%20aku%20barusan%20booking%20dari%20website%20StreetCrown%20nih%20!%0ABerikut%20informasi%20bookingnya%20%3A%0AMobil%20%3A%20${carbrand}%20${carname}%0APaket%20%20%3A%20${this.state.priceData.name}%20-%20${selectedSize}%0ATanggal%20Booking%20%3A%20${selectedDate}%0ALokasi%20%3A%20${selectedAddress}%0A%0ASilahkan%20transfer%20DP%20min%2010%25%20dari%20harga%20yang%20disepakati%20ke%20rek%20bca%206050145997%20a%2Fn%20william%20gani.%20Harap%20konfirmasi%20bukti%20transfer.%20%0A%0AJika%20ada%20pembatalan%2C%20bisa%20reschedule%20(berlaku%20max%201bln%20dr%20tgl%20DP).%20Lebih%20dr%20tgl%20DP%20dianggap%20customer%20membatalkan%20transaksi%20dan%20DP%20hangus.%0A%0ABest%20Regards%2C%0AStreetcrown` )
                }
              })
        }
    }



    render() {
        return (
            <div className="jumbotron" style={verticalCenter}>
                <div className="container shadow-lg" style={{ borderRadius : '20px' }}>
                    <br/>

                    {/* <div className="m-2">
                            <a href="https://api.whatsapp.com/send?phone=628999993164&text=Halo%20StreetCrown!" target="_blank" rel="noopener noreferrer" >
                                <img src="https://image.flaticon.com/icons/svg/134/134937.svg" alt="Whatsapp-icon" style={{ width: "40px" }} />
                                <span> &nbsp; Jakarta</span>
                            </a>
                    </div> */}

                    <Link to='/cardetailing' >
                        <button className="btn btn-outline-info m-2" > Back To Car Detailing Menu </button>
                    </Link>

                    <br/><br/>

                    <center> 
                        <h3> 
                            <i className="material-icons" style={ bookStyle }>book</i> Booking Form <i className="material-icons" style={ bookStyle }>book</i>   <br/><br/>
                            <b> {this.state.detailingName} </b> 
                        </h3>  
                    </center>


                    <div className="row mt-5">
                         {/* REQUIRED */}
                        <div className="col-12 col-sm-12 col-lg-6">

                            <h3> Required Form </h3>

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
                                <label>Car Size</label>
                                <form className="input-group">
                                    
                                    <select className="custom-select radius-custom" name='selectedSize' ref={ input => this.selectedSize = input } onChange={ () => this.showPriceBasedOnSize() } >
                                        <option value={0} className="radius-custom">Not Sure</option>
                                        <option value={'Small'} className="radius-custom">Small</option>
                                        <option value={'Medium'} className="radius-custom">Medium</option>
                                        <option value={'Large'} className="radius-custom">Large</option>
                                        <option value={'XL'} className="radius-custom">Extra Large / Supercar</option>
                                    </select>
                                </form>
                                <small class="form-text text-muted"> Don't worry if you are not sure what size your car, we will check again and correct the size and the price.</small>

                                {/* COMPARISON SIZE IMAGE */}
                                <button className="btn btn-link" onClick={ () => this.imageModal() }>
                                    <img  src={comparisonSize} alt="comparison car size" className="img-fluid mt-3 mb-5 shadow-lg" />
                                </button>
                            </div>

                            <div className="form-group">
                                <label>Home Service / Workshop</label>
                                <form className="input-group">
                                    <select className="custom-select radius-custom" name='selectedAddress' ref={ input => this.selectedLocationType = input } onChange={ () => this.checkHomeService() } >
                                            <option value={['Workshop','Sunter Pulo Kecil']} className="radius-custom">Workshop : Sunter Pulo Kecil No.18 (Jakarta Utara)</option>
                                            <option value={['Workshop','Taman Kopo Indah']} className="radius-custom">Workshop : Taman Kopo Indah No.10 (Bandung)</option>
                                            <option value={'Home'} className="radius-custom">Home Service</option>
                                    </select>
                                </form>
                                <small class="form-text text-muted">Required</small>
                            </div>

                            {/* Show Add Address UI for Home Service */}
                            { this.state.isHomeService === true && (
                                <div className="form-group">
                                    <label htmlFor="uname1">Address</label>
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
                                    <input type="date" name="date" id="date" 
                                            min={ this.minDate() } 
                                            ref={ input => this.selectedDate = input } 
                                            onChange={ () => {this.setDate()} }
                                            style={{ width: '550px', height: '30px' }}
                                            className="radius-custom"
                                            defaultValue={ this.minDate() }
                                    /> 
                                    <br/>
                                </form>
                            </div>

                            <div className="form-group">
                                <label>Contact Number</label>
                                <form className="input-group">
                                    <input ref={input => this.contactNumber = input} defaultValue={this.props.objectUser.phone_number} className="form-control radius-custom" type="text" placeholder="Whatsapp Number is recommended"  required />
                                </form>
                                <small class="form-text text-muted">Recommendation : Whatsapp Number</small>
                            </div>

                        </div>   {/* END OF COL REQUIRED */}
                       
                    {/* OPTIONAL */}
                    <div className="col-12 col-sm-12 col-lg-6"> 

                    <h3> Optional Form </h3>                      

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


                        </div> {/* End of col OPTIONAL */}

                </div>  {/* End of row */}


                    


              
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

export default withRouter(connect( mapStateToProps, { getDetailingData, addAddress, carDetailingBooking } )(BookingForm))
