import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Spinner from '../Spinner'

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
        isHomeService : false
    }
        
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

    addProductButton = () => {
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
            return alert('Please input your contact number (Whatsapp Number is recommended)')
        }
        console.log(carbrand, carname, selectedSize)
        console.log(selectedLocationType)
        console.log(selectedAddress)
        console.log(selectedDate, caryear, carcolor)
        console.log(contactNumber)
    }

    render() {
        return (
            <div>
                {/* Whatsapp Floating Button */}
                <Button className="fixed-button wobble" onClick={this.toggle} style={{ zIndex : 2 }} >
                <center> <i class="material-icons" style={{ fontSize : '28px' }}>add</i> </center>
                </Button>

                {/* Modal Reactstrap */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Add Booking</ModalHeader>
                <ModalBody>
                    
                    Car Brand :
                    <form className="input-group">
                        <input placeholder="Car Brand" ref={input => this.carbrand = input} className="form-control mb-2 radius-custom" type="text"/>
                    </form>

                    Car Name :
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

                    Car Size : 
                    <form className="input-group">
                        <select className="custom-select radius-custom" name='selectedSize' ref={ input => this.selectedSize = input } >
                            <option value={0} className="radius-custom">Not Sure</option>
                            <option value={'Small'} className="radius-custom">Small</option>
                            <option value={'Medium'} className="radius-custom">Medium</option>
                            <option value={'Large'} className="radius-custom">Large</option>
                            <option value={'XL'} className="radius-custom">Extra Large / Supercar</option>
                    </select>
                    </form>

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
                            <label htmlFor="uname1">Home Address</label>
                                <form className="input-group">
                                    <input  placeholder="Address" ref={input => this.selectedAddress = input} className="form-control mb-2 radius-custom" type="text"/>
                                </form>
                        </div>
                    )}

                    Booking Price :
                    <form className="input-group">
                        <input placeholder="Booking Price" ref={input => this.bookingprice = input} className="form-control mb-2 radius-custom" type="text"/>
                    </form>

                    Booking Date (The default value is today)
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

export default AddBookingModal
