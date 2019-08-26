import React, { Component } from 'react'

class ManageBookingModal extends Component {

    categoryOptions = (car_size) => {
        const categories = ['0','Small','Medium','Large','XL']
        let result = categories.map( (category) => {
            if(car_size == category){
                return <option value={car_size} selected>{car_size}</option>
            }
            return (
                <option value={category}>{category}</option>
            )
        })

        return result
    };

    minDate = () => {
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


    render() {
        console.log(this.props.editBooking)

        const { booking_date, car_brand, car_name, car_size, location_type, location_address, booking_price, contact_number, car_color, car_year } = this.props.editBooking

        return (
            <div>

                <div className="modal fade" id="editBookingModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Product</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-row">

                                    Car Brand :
                                    <form className="input-group">
                                        <input defaultValue={car_brand}  placeholder="Car Brand" ref={input => this.carbrand = input} className="form-control mb-2" type="text"/>
                                    </form>

                                    Car Name :
                                    <form className="input-group">
                                        <input defaultValue={car_name}  placeholder="Car Name" ref={input => this.carname = input} className="form-control mb-2" type="text"/>
                                    </form>

                                    Car Year :
                                    <form className="input-group">
                                        <input defaultValue={car_year}  placeholder="Car Year" ref={input => this.caryear = input} className="form-control mb-2" type="text"/>
                                    </form>

                                    Car Color :
                                    <form className="input-group">
                                        <input defaultValue={car_color}  placeholder="Car Color" ref={input => this.carcolor = input} className="form-control mb-2" type="text"/>
                                    </form>

                                    Car Size : 
                                    <form className="input-group">
                                        <select class="custom-select" name="selectedCategory" ref={input => this.selectedCategoryEdit = input} >
                                            {this.categoryOptions(car_size)}
                                        </select>
                                    </form>

                                    Address :
                                    <form className="input-group">
                                        <input defaultValue={location_address}  placeholder="Address" ref={input => this.address = input} className="form-control mb-2" type="text"/>
                                    </form>

                                    Booking Price :
                                    <form className="input-group">
                                        <input defaultValue={booking_price}  placeholder="Booking Price" ref={input => this.bookingprice = input} className="form-control mb-2" type="text"/>
                                    </form>

                                    Booking Date (The default value is today)
                                    <form className="input-group">
                                        <input type="date" name="date" id="date" 
                                                ref={ input => this.selectedDate = input } 
                                                // onChange={ () => {this.setDate()} }
                                                style={{ width: '300px', height: '30px' }}
                                                className="radius-custom"
                                                defaultValue={ this.minDate() }
                                        /> 
                                        <br/>
                                    </form>

                                    <button onClick={this.editProductButton} className="btn btn-outline-danger btn-block mt-5">Edit</button>

                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div> 

            </div>
        )
    }
}

export default ManageBookingModal
