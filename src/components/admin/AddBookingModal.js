import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {connect} from 'react-redux'
import Spinner from '../Spinner'
import Swal from 'sweetalert2'

import { getDetailingServices, addBookingManually_Guest } from '../../actions/index'

class AddBookingModal extends Component {

    //  Modal Reactstrap
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
        }

        toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        }

    state = {
        isHomeService : false,
        loading : false
        // detailingServices: []
    }


    // async componentWillMount(){
    //     const resdata = await this.props.getDetailingServices()
    //     console.log(resdata)
    //     await this.setState( { detailingServices : resdata } )
    // }

    // renderDetailingList = () => {
    //     let render = this.state.detailingServices.map( service => {
    //         return (
    //             <option value={service.id} key={service.id} className="radius-custom">{service.name}</option>
    //         )
    //     })
    //     return render
    // }
        
    today = () => {
        var today = new Date()
        var dd = today.getDate()
        var mm  = today.getMonth() + 1  // January is 0 index | getMonth = 0-11 index
        var yyyy = today.getFullYear()
        if(mm < 10) {
            mm = '0' + mm
        }
        if (dd < 10) {
            dd = '0' + dd
        } 

        return (`${yyyy}-${mm}-${dd}`) // Solved : 2019-08-22
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

    addProductButton = async () => {
        var customername = this.customername.value
        if(customername === ''){  
            return alert('Please input customer name') 
        }
        var carbrand = (this.carbrand.value).toUpperCase()
        var carname = this.carname.value.toUpperCase()
        if(carbrand == ''){
            return alert('Please input the car brand')
        }

        if(carname == ''){
            return alert('Please input the car name')
        }

        var selectedSize = this.selectedSize.value  // 0, Small, Medium, Large, Extra Large
        var selectedLocationType = this.selectedLocationType.value  // 'Home' or 'Workshop'

        if(selectedLocationType == 'Home'){
            var selectedAddress = this.selectedAddress.value    // Read address from user
            if(selectedAddress == '') {
                return alert('You must input an address for home service, please add new one !')
            }            
        } else {
            var splitArray = selectedLocationType.split(',')
            // console.log(splitArray)      // ["Workshop", "Sunter Pulo Kecil"]
            selectedLocationType = splitArray[0]
            selectedAddress = splitArray[1]
        }

        var selectedService = this.selectedService.value

        var selectedDate = this.selectedDate.value
        var caryear = this.caryear.value
        var carcolor = this.carcolor.value

        if(caryear == ''){
            caryear = 'No info'
        }
        if(carcolor == ''){
            carcolor = 'No info'
        }

        var contactNumber = this.contactNumber.value
        if (contactNumber == ''){
            return alert('Please input customer contact number (Whatsapp Number is recommended)')
        }
        console.log(carbrand, carname, selectedSize)
        console.log(selectedService)
        console.log(typeof(selectedService))    // string
        console.log(selectedLocationType)
        console.log(selectedAddress)
        console.log(selectedDate, caryear, carcolor)
        console.log(contactNumber)
        this.setState({ loading : true })
        const resdata = await this.props.addBookingManually_Guest( customername, parseInt(selectedService), carbrand, carname, selectedSize, selectedLocationType,
            selectedAddress, selectedDate, contactNumber, caryear, carcolor)
        console.log(resdata)
        if(resdata.insertId){
            await this.setState({ loading : false })
            Swal.fire('Booking has added successfully!', 'Hooray !' ,'success')
            window.location.reload()
        }
    }

    render() {
        return (
            <div>
                {/* Whatsapp Floating Button */}
                <Button className="fixed-button float wobble" onClick={this.toggle} style={{ zIndex : 2, backgroundColor: '#041B2D', width : '60px', height : '60px', right: '10px', bottom : '-5px' }} >
                <center> <i class="material-icons" style={{ fontSize : '28px' }}>add</i> </center>
                </Button>

                {/* Modal Reactstrap */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Add Booking (Non-registered Account) </ModalHeader>
                <ModalBody>

                    Customer Name* :
                    <form className="input-group">
                        <input placeholder="Customer Name" ref={input => this.customername = input} className="form-control mb-2 radius-custom" type="text"/>
                    </form>

                    Contact Number* :
                    <form className="input-group">
                        <input placeholder="Phone Number" ref={input => this.contactNumber = input} className="form-control mb-2 radius-custom" type="text"/>
                    </form>
                    
                    Car Brand* :
                    <form className="input-group">
                        <input placeholder="Car Brand" ref={input => this.carbrand = input} className="form-control mb-2 radius-custom" type="text"/>
                    </form>

                    Car Name* :
                    <form className="input-group">
                        <input  placeholder="Car Name" ref={input => this.carname = input} className="form-control mb-2 radius-custom" type="text"/>
                    </form>

                    Car Year :
                    <form className="input-group">
                        <input  placeholder="Car Year" ref={input => this.caryear = input} className="form-control mb-2 radius-custom" type="text"/>
                    </form>

                    Car Color :
                    <form className="input-group">
                        <input  placeholder="Car Color" ref={input => this.carcolor = input} className="form-control mb-2 radius-custom" type="text"/>
                    </form>

                    Car Size* : 
                    <form className="input-group">
                        <select className="custom-select radius-custom" name='selectedSize' ref={ input => this.selectedSize = input } >
                            <option value={0} className="radius-custom">Not Sure</option>
                            <option value={'Small'} className="radius-custom">Small</option>
                            <option value={'Medium'} className="radius-custom">Medium</option>
                            <option value={'Large'} className="radius-custom">Large</option>
                            <option value={'XL'} className="radius-custom">Extra Large / Supercar</option>
                    </select>
                    </form>

                    Detailing Service* : 
                    <form className="input-group">
                        <select className="custom-select radius-custom" name='selectedService' ref={ input => this.selectedService = input } >
                            <option value={1} className="radius-custom">Nano Ceramic Coating</option>
                            <option value={2} className="radius-custom">Quick Polish</option>
                            <option value={3} className="radius-custom">Full Detailing</option>
                        </select>
                    </form>

                    

                    <div className="form-group">
                        <label>Home Service / Workshop*</label>
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
                            <label htmlFor="uname1">Home Address</label>
                                <form className="input-group">
                                    <input  placeholder="Address" ref={input => this.selectedAddress = input} className="form-control mb-2 radius-custom" type="text"/>
                                </form>
                        </div>
                    )}

                    Booking Price* :
                    <form className="input-group">
                        <input placeholder="Booking Price" ref={input => this.bookingprice = input} className="form-control mb-2 radius-custom" type="text"/>
                    </form>

                    Booking Date (The default value is today)*
                    <form className="input-group">
                        <input type="date" name="date" id="date" 
                                ref={ input => this.selectedDate = input } 
                                style={{ width: '300px', height: '30px' }}
                                className="radius-custom"
                                defaultValue={ this.today() }                                              
                        /> 
                        <br/>
                    </form>

                    {   this.state.loading === true ? <Spinner /> : 
                        <button onClick={this.addProductButton} className="btn btn-outline-danger btn-block mt-5">Add</button> 
                    }

                    
                </ModalBody>
                <ModalFooter>
                    {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
                    <Button color="secondary" onClick={this.toggle}>Close</Button>
                </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default connect(null, { getDetailingServices, addBookingManually_Guest })(AddBookingModal)
