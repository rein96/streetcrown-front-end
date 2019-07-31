import React from 'react';
import {Link} from 'react-router-dom';
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

import streetcrown_logo from '../images/streetcrown-logo.png'


class Header extends React.Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }


    render() {
        return (
            <div>
              <Navbar color="dark" dark expand="md">
                <NavbarBrand> 
                  <Link to='/'> <img src={streetcrown_logo} width="100px" />  </Link> 
                </NavbarBrand>

                <NavbarBrand href="/">
                <Link to='/'><span style={{ color: "white" }}> StreetCrown </span></Link> 
                </NavbarBrand>


                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>

                  {/* <NavItem>
                      <NavLink>
                        <Link to='/portfolio'> <span style={{ color: "white" }}> Portofolio </span> </Link>
                      </NavLink>
                  </NavItem> */}
                    
                  <NavItem>
                      <NavLink>
                        <Link to='/register' > <span style={{ color: "white" }}> Register </span> </Link>
                      </NavLink>
                  </NavItem>

                    <NavItem>
                      <NavLink>
                        <Link to='/login'> <span style={{ color: "white" }}> Login </span> </Link>
                      </NavLink>
                    </NavItem>
                    {/* <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Options
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          Option 1
                        </DropdownItem>
                        <DropdownItem>
                          Option 2
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                          Reset
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown> */}
                  </Nav>
                </Collapse>
              </Navbar>
          </div>


        )

    }
}

export default Header;