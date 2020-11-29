import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBContainer } from 'mdbreact';
import LogoSarenOne from '../../Images/LogoSarenOne.png';
import Gmail from '../../Images/Gmail.png';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './UnverifiedPage.css';


class UnverifiedPage extends Component {

    state = {}

    render() {
        if (this.props.status === 'verified') {
            return (
                <Redirect to="/">

                </Redirect>
            )
        }
        return (
            <div classNames="d-flex justify-content-center">
                <MDBNavbar color="#c62828 red darken-3" dark expand="md" >
                    <MDBContainer>
                        <MDBNavbarBrand>
                            <img src={LogoSarenOne} alt="Logo" className="imgLogo-Navbar" />
                        </MDBNavbarBrand>
                    </MDBContainer>
                </MDBNavbar>
                <center>
                    <img src={Gmail} alt="Shop-Verified" className="img-unverified" />
                    <div className="title-unverified">Maaf {this.props.username}, akun anda belum terverifikasi. </div>
                    <p className="paragraph-unverified">Silahkan cek email anda untuk melakukan verifikasi terlebih dahulu...</p>
                    <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer">
                        <div className="btn-action-to-gmail">GO TO GMAIL</div>
                    </a>
                </center>
            </div>
        );
    }
}

const mapStatetoProps = ({ user }) => {
    // console.log(user.status)
    return {
        username: user.username,
        status: user.status
    }
}

export default connect(mapStatetoProps)(UnverifiedPage);