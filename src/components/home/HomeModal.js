import React, { Component } from 'react'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class HomeModal extends Component {

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

    render() {
        return (
            <div>
                {/* Whatsapp Floating Button */}
                <Button className="fixed-button wobble" onClick={this.toggle} >
                    <i className="fa fa-whatsapp my-float"></i>
                </Button>

                {/* Modal Reactstrap */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Contact Us</ModalHeader>
                <ModalBody>
                    <center>
                        {/* REFERENCE OTHER LINK : https://wa.me/628561333111?text=Saya%20tertarik%20untuk%20membeli%20mobil%20Anda */}
                        <div className="m-2">
                            <a href="https://api.whatsapp.com/send?phone=628999993164&text=Halo%20StreetCrown!" target="_blank" rel="noopener noreferrer" >
                                <img src="https://image.flaticon.com/icons/svg/134/134937.svg" alt="Whatsapp-icon" style={{ width: "40px" }} />
                                <span> &nbsp; Jakarta</span>
                            </a>
                        </div>

                        <div className="m-2">
                            <a href="https://api.whatsapp.com/send?phone=628999993164&text=Halo%20StreetCrown!" target="_blank" rel="noopener noreferrer" >
                                <img src="https://image.flaticon.com/icons/svg/134/134937.svg" alt="Whatsapp-icon" style={{ width: "40px" }} />
                                &nbsp; Bandung
                            </a> 
                        </div>

                    </center>
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

export default HomeModal
