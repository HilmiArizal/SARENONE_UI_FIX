import React, { Component } from 'react';
import SidebarAdmin from '../../Components/Navbar/SidebarAdmin';
import LogoSarenOne from '../../Images/LogoSarenOne.png';
import NewLogoSarenOne from '../../Images/NewLogo.png';
import { connect } from 'react-redux';
import { MDBContainer, MDBIcon } from 'mdbreact';
import './HomeAdmin.css';


class HomeAdmin extends Component {

    state = {}

    render() {
        return (
            <div>
                <SidebarAdmin />
                <div style={{ marginLeft: '15%' }}>
                    <div class="w3-container w3-teal">
                        <div className="w3-container w3-teal">
                            <div className="title-home-admin">HALLO, {this.props.username.toUpperCase()} </div>
                        </div>
                    </div>
                    <MDBContainer>
                        <div className="section-img-home-admin">
                            <div>
                                <img src={LogoSarenOne} alt="Car" />
                            </div>
                            <div>
                                <MDBIcon icon="arrow-alt-circle-right" id="icon-right" />
                            </div>
                            <div class="">
                                <img src={NewLogoSarenOne} alt="Car" />
                            </div>
                        </div>
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({ user }) => {
    return {
        username: user.username
    }
}

export default connect(mapStatetoProps)(HomeAdmin);