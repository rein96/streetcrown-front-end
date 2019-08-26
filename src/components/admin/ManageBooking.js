import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getAllBooking } from '../../actions/index'

import '../../css/managebookings.css'
import ManageBookingModal from './ManageBookingModal'

class ManageBooking extends Component {

    state = {
        allBooking : [],
        editBooking : []
    }

    async componentDidMount(){
        const resdata = await this.props.getAllBooking()
        console.log(resdata)
        await this.setState( { allBooking : resdata } )
        console.log(this.state.allBooking)
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
            return (
                <tr key={booking.id}>
                    <th scope='col'> <p>{booking.booking_date_formatted}</p> </th>
                    <th scope='col'>
                         <p>{booking.username}</p> 
                         <p style={{ fontSize : '9px' }}>{booking.email}</p> 
                         <p>{booking.contact_number}</p> 
                    </th>
                    <th scope='col'> <p>{booking.car_brand}</p> </th>
                    <th scope='col'> <p>{booking.car_name}</p> </th>
                    <th scope='col'> <p>{booking.car_size}</p> </th>
                    <th scope='col'> <p>{booking.location_type}</p> </th>
                    <th scope='col'> <p>{booking.location_address}</p> </th>
                    <th scope='col'> <p>{booking.booking_price}</p> </th>
                    <th scope='col'> <p>{booking.booking_status}</p> </th>
                    <th scope='col'>
                        <p> Color : {booking.car_color}</p>
                        <p> Year : {booking.car_year}</p>
                    </th>
                    <th scope='col'> 
                        {/* <button className="btn btn-sm btn-warning" onClick={ () => this.editButton(booking.id) }>Edit</button>  */}
                        <button className="btn btn-sm btn-warning"
                                // style={{ width: '60px' }}
                                data-toggle="modal" 
                                data-target="#editBookingModal"
                                onClick={ async () => await this.setState( { editBooking : booking } ) } > &nbsp; Edit &nbsp; </button>
                                <br/><br/>
                        <button className="btn btn-sm btn-danger" onClick={ () => this.deleteButton(booking.id) }>Delete</button>
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

        return (
            <div className="ml-5 mr-5">
                <center>
                    <br/>
                    <h2 className="mt-3"> 
                        <i class="material-icons" style={{ fontSize: '30px' }}>face</i>
                            &nbsp; Detailing Booking Log  &nbsp;
                        <i class="material-icons" style={{ fontSize: '30px' }}>face</i> 
                    </h2>
                    <br/>

                    <div className="table-responsive">

                        <h4> Sunter Pulo Kecil </h4>
                        <table className="table table-hover mx-auto w-auto mb-5" style={{ margin: 'auto' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">DATE</th>
                                        <th scope="col">CUSTOMER</th>
                                        <th scope="col">BRAND</th>
                                        <th scope="col">NAME</th>
                                        <th scope="col">SIZE</th>
                                        <th scope="col">LOCATION</th>
                                        <th scope="col">ADDRESS</th>
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
                                        <th scope="col">BRAND</th>
                                        <th scope="col">NAME</th>
                                        <th scope="col">SIZE</th>
                                        <th scope="col">LOCATION</th>
                                        <th scope="col">ADDRESS</th>
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
                                        <th scope="col">BRAND</th>
                                        <th scope="col">NAME</th>
                                        <th scope="col">SIZE</th>
                                        <th scope="col">LOCATION</th>
                                        <th scope="col">ADDRESS</th>
                                        <th scope="col">PRICE</th>
                                        <th scope="col">STATUS</th>
                                        <th scope="col">DESCRIPTION</th>
                                        <th scope="col">ACTION</th>
                                    </tr>   
                                </thead>
                                <tbody> {this.renderBookingByLocation('Home')}  </tbody>      
                        </table>
                        
                    </div>

                    <ManageBookingModal editBooking = {this.state.editBooking} />
                    
                </center>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    objectUser: state.auth
})

export default connect(mapStateToProps, { getAllBooking })(ManageBooking)
