import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'

import Spinner from '../Spinner'
import { getAllBooking, updateBookingStatus, deleteBooking } from '../../actions/index'

import '../../css/managebookings.css'
// import AddBookingModal from './AddBookingModal';
import EditBookingModal from './EditBookingModal';

class ManageBooking extends Component {

    state = {
        allBooking : [],
        editBooking : [],
        loading : false
    }

    componentDidMount(){
        this.getBookingData()
    }

    getBookingData = async () => {
        await this.setState( { loading : true } )
        const resdata = await this.props.getAllBooking()
        console.log(resdata)
        // if there is no booking record = sqlMessage = return 0
        if(resdata.sqlMessage){ return }

        await this.setState( { allBooking : resdata, loading : false } )
        console.log(this.state.allBooking)
    }

    setStatus = async (id, defaultStatus) => {
        	
        /* inputOptions can be an object or Promise */
        const inputOptions = {
            Booking : 'Booking',
            Completed : 'Completed',
            Cancel : 'Cancel'
        }
        
        const { value: status } = await Swal.fire({
            title: 'Select status',
            input: 'radio',
            inputOptions: inputOptions,
            inputValue: defaultStatus,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }
            }
        })
        
        if (status) {
            const resdata = await this.props.updateBookingStatus(id, status)
            console.log(resdata)
            Swal.fire({ html: 'Status changed to = ' + status })
            this.getBookingData()
        }
    }

    deleteButton = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Once it has deleted, it cannot be reverted !",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete it !'
          }).then( async (result) => {
            if (result.value === true) {

            const res = await this.props.deleteBooking(id)
            console.log(res)
                if ( res.affectedRows ) {
                    Swal.fire( 'Deleted successfully !')
    
                    this.getBookingData()
                } else {
                    alert('Error huhuhu')
                }
            }
        })
    }

    whatsappUser = (phone_number) => {
        // 08999993164 -> 628999993164
        let splitArray = phone_number.split('')
        splitArray.splice(0,1,"6","2")
        console.log(splitArray)
        let whatsappFormat = splitArray.join('')
        console.log(whatsappFormat)

        window.open(`https://api.whatsapp.com/send?phone=${whatsappFormat}`)
    }

    renderBookingByLocation = (inputByAddress) => {

        if(inputByAddress == 'Home') {
            var arrayBooking = this.state.allBooking.filter( booking => {
                return booking.location_type.includes('Home')
            })
        } else {
            var arrayBooking = this.state.allBooking.filter( booking => {
                return booking.location_address.includes(inputByAddress)
            })
        }

        let render = arrayBooking.map( booking => {

            let { booking_status, id, booking_date_formatted, username, email, contact_number, car_brand, car_name, car_size, location_type, location_address, booking_price, car_color, car_year, name  } = booking

            var status_style = ''
            if( booking_status === 'Booking') {
                status_style = 'btn-primary'
            } else if ( booking_status === 'Completed' ) {
                status_style = 'btn-success'
            } else if (booking_status === 'Cancel') {
                status_style = 'btn-danger'
            }

            return (
                <tr key={id}>
                    <th scope='col'> <p>{booking_date_formatted}</p> </th>
                    <th scope='col'>
                         <p>{username}</p> 
                         <p style={{ fontSize : '8px' }}>{email}</p> 
                         <p>{contact_number}</p> 
                    </th>
                    <th scope='col'> <p>{name}</p> </th>
                    <th scope='col'> <p>{car_brand}</p> <p>{car_name}</p> </th>
                    <th scope='col'> <p>{car_size}</p> </th>
                    <th scope='col'> <p>{location_type}</p> <p>{location_address}</p> </th>
                    { 
                        typeof(booking_price) === 'number' ? 
                        <th scope='col'> <p> { (booking_price).toLocaleString() }</p> </th> : 
                        <th> <p> No Data </p></th> 
                    }  
                    <th scope='col'>
                        <button className={"btn btn-sm " + status_style } onClick={ () => this.setStatus(id, booking_status) }> {booking_status} </button>
                    </th>
                    <th scope='col'>
                        <p> Color : {car_color}</p>
                        <p> Year : {car_year}</p>
                    </th>
                    <th scope='col'>
                        <button className="btn btn-link" onClick={ () => this.whatsappUser(contact_number)}>
                            <img src="https://image.flaticon.com/icons/svg/134/134937.svg" alt="Whatsapp-icon" style={{ width: "30px" }} />
                        </button> 
                        <button className="btn btn-sm btn-outline-warning"
                                // style={{ width: '60px' }}
                                data-toggle="modal" 
                                data-target="#editBookingModal"
                                onClick={ async () => await this.setState( { editBooking : booking } ) } > &nbsp; Edit &nbsp; </button>
                                <br/><br/>
                        <button className="btn btn-sm btn-outline-danger" onClick={ () => this.deleteButton(id) }>Delete</button>
                    </th>
                </tr>
            )
        })
        return render;
    }

    render() {
        if (this.props.objectUser.is_admin === 0 || this.props.objectUser.username === '') {
            return <h1>Access Denied</h1>
        }

        if (this.state.allBooking.length === 0) { 
            return (
                <div>
                    <center> <h3> No Booking Data</h3> </center>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </div>
            )
        }

        return (
            <div className="ml-5 mr-5">
                <center>
                    <br/>
                    <h2 className="mt-3"> 
                        <i class="material-icons" style={faceStyle}>face</i>
                            &nbsp; Detailing Booking Log  &nbsp;
                        <i class="material-icons" style={faceStyle}>face</i> 
                    </h2>
                    <br/>

                    <div className="table-responsive">

                        { this.state.loading === true && <Spinner />  }

                        <h4> Sunter Pulo Kecil </h4>
                        <table className="table table-hover mx-auto w-auto mb-5" style={{ margin: 'auto' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">DATE</th>
                                        <th scope="col">CUSTOMER</th>
                                        <th scope="col">DETAILING</th>
                                        <th scope="col">BRAND</th>
                                        {/*  */}
                                        <th scope="col">SIZE</th>
                                        <th scope="col">LOCATION</th>
                                        {/* <th scope="col">ADDRESS</th> */}
                                        <th scope="col">PRICE</th>
                                        <th scope="col">STATUS</th>
                                        <th scope="col">DESCRIPTION</th>
                                        <th scope="col">ACTION</th>
                                    </tr>   
                                </thead>
                                <tbody> {this.renderBookingByLocation('Sunter Pulo Kecil')}  </tbody>      
                                
                        </table>

                        <h4> Taman Kopo Bandung </h4>
                        <table className="table table-hover mx-auto w-auto mb-5" style={{ margin: 'auto' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">DATE</th>
                                        <th scope="col">CUSTOMER</th>
                                        <th scope="col">DETAILING</th>
                                        <th scope="col">BRAND</th>
                                        {/*  */}
                                        <th scope="col">SIZE</th>
                                        <th scope="col">LOCATION</th>
                                        {/* <th scope="col">ADDRESS</th> */}
                                        <th scope="col">PRICE</th>
                                        <th scope="col">STATUS</th>
                                        <th scope="col">DESCRIPTION</th>
                                        <th scope="col">ACTION</th>
                                    </tr>   
                                </thead>
                                <tbody> {this.renderBookingByLocation('Taman Kopo Indah')}  </tbody>      
                                
                        </table>
                        
                        <h4> Home Service </h4>
                        <table className="table table-hover mx-auto w-auto mb-5" style={{ margin: 'auto' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">DATE</th>
                                        <th scope="col">CUSTOMER</th>
                                        <th scope="col">DETAILING</th>
                                        <th scope="col">BRAND</th>
                                        {/*  */}
                                        <th scope="col">SIZE</th>
                                        <th scope="col">LOCATION</th>
                                        {/* <th scope="col">ADDRESS</th> */}
                                        <th scope="col">PRICE</th>
                                        <th scope="col">STATUS</th>
                                        <th scope="col">DESCRIPTION</th>
                                        <th scope="col">ACTION</th>
                                    </tr>   
                                </thead>
                                <tbody> {this.renderBookingByLocation('Home')}  </tbody>      
                        </table>
                        
                    </div>

                    {/* <AddBookingModal /> */}
                    <EditBookingModal editBooking = {this.state.editBooking} />
                    
                    
                </center>
            </div>
        )
    }
}

const faceStyle = {
    fontSize : '40px',
    // color: "#DC3545",
    verticalAlign : 'middle'
}

const mapStateToProps = state => ({
    objectUser: state.auth
})

export default connect(mapStateToProps, { getAllBooking, updateBookingStatus, deleteBooking })(ManageBooking)
