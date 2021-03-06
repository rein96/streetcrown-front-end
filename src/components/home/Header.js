import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
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

import { URL } from '../../config/url'    
import { onLogout, getCarts } from '../../actions/index'
    
import streetcrown_logo from '../../images/streetcrown-logo.png'
import avatar_default from '../../images/avatar_default.png'
import cookies from 'universal-cookie'

const cookie = new cookies()


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

    async componentWillMount() {
        // To prevent http request whenever there is no user logged in
        if(this.props.objectUser.username !== '')  { await this.props.getCarts(this.props.objectUser) }
    }

    countQuantityCart = () => {
      let totalQuantity = 0;
      let cartArray = this.props.cartsSTATE
      for ( let i = 0 ; i < cartArray.length; i++) {
          totalQuantity = totalQuantity + cartArray[i].quantity
      }

      return totalQuantity
    }

    logoutButton = async () => {
      await this.props.onLogout()
      await cookie.remove('streetcrownUser')
      return (
        this.props.history.push('/')
      )
    }

    localAvatarError = (e) => {
      e.target.onerror = null; 
      e.target.src= this.props.objectUser.avatar
    }


    render() {
      
      // If user has already logged in 
      if(this.props.objectUser.username !== '') {
        return (
          <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/"> 
            {/* <Link to='/'> <img src={streetcrown_logo} width="100px" />  </Link>  */}
            <img src={streetcrown_logo} width="100px" /> 
          </NavbarBrand>

          <NavbarBrand href="/">
          {/* <Link to='/'><span style={{ color: "white" }}> StreetCrown </span></Link>  */}
            <span style={{ color: "white" }}> StreetCrown </span> 
          </NavbarBrand>


          <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>

                        <NavItem>
                            <Link className="nav-link" to="/cart" style={{ color: "white" }}> <span className="badge badge-light round wobble"> {this.countQuantityCart()} </span>  </Link>
                        </NavItem>

                        <NavItem>
                            <Link className="nav-link" to="/cart" style={{ color: "white" }}><i className="material-icons wobble">shopping_cart</i></Link>
                        </NavItem>
                        
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret style={{ color: "white" }}>
                                Hello <span style={{ color : '#d9534f'}}> <b> {this.props.objectUser.username} </b> </span>  

                                { 
                                  this.props.objectUser.avatar === null ? 

                                  <img src={avatar_default} alt="avatar_default" style={ { width: "30px" } } /> : 
                                  
                                  <img src={`${URL}/users/avatar/${this.props.objectUser.avatar}`} 
                                        style={ { width: "30px", borderRadius: "200px" } }   
                                        alt="avatar" 
                                        key={ new Date() }
                                        onError={this.localAvatarError} />  
                                } 

                            </DropdownToggle>

                            <DropdownMenu right>
                            <Link className="dropdown-item" to="/profile">
                                <DropdownItem>Profile</DropdownItem>
                            </Link>

                            <Link className="dropdown-item" to="/transaction">
                                <DropdownItem>Transaction</DropdownItem>
                            </Link>

                            {/* if user === admin, it will appear admin dashboard dropdown */}
                            { this.props.objectUser.is_admin === 1 && <Link className="dropdown-item" to="/admin">
                                <DropdownItem>Admin <i className="material-icons" style={{ color: '#428bca' }} >verified_user</i> </DropdownItem>
                            </Link> }
                            {/* <span className="badge badge-pill badge-primary">Admin</span> */}



                            {/* <Link className="dropdown-item" to="/editprofile">
                                <DropdownItem>Edit Profile</DropdownItem>
                            </Link> */}
                            <DropdownItem divider />
                            <Button className="dropdown-item" onClick={ () => this.logoutButton() } >
                                Log out
                            </Button>
                            
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
        </Navbar>

        )
      }
      // if user has not logged in
        return (
            <div>
              <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/"> 
                  {/* <Link to='/'> <img src={streetcrown_logo} width="100px" />  </Link>  */}
                   <img src={streetcrown_logo} width="100px" />  
                </NavbarBrand>

                <NavbarBrand href="/">
                {/* <Link to='/'><span style={{ color: "white" }}> StreetCrown </span></Link>  */}
                <span style={{ color: "white" }}> StreetCrown </span> 
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
                        <Link to='/cardetailing' > <span style={{ color: "white" }}> Booking </span> </Link>
                      </NavLink>
                  </NavItem>

                  {/* <NavItem>
                      <NavLink>
                        <span style={{ color: "white" }}> Contact Us </span>
                      </NavLink>
                  </NavItem> */}

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

const mapStateToProps = state => {
  return {
    objectUser : state.auth,
    cartsSTATE : state.carts.carts
  }
}

export default withRouter(connect(mapStateToProps, { onLogout, getCarts })(Header));