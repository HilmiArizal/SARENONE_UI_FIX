import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBContainer } from 'mdbreact';
import LogoSarenOne from '../Images/LogoSarenOne.png';
import Gmail from '../Images/Gmail.png';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


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
                    <img src={Gmail} alt="Shop-Verified" style={{ width: '40%' }} />
                    <div> <h1>Maaf {this.props.username}, akun anda belum terverifikasi.</h1> </div>
                    <div> <h4>Silahkan cek email untuk melakukan verifikasi</h4></div>
                    <div>
                        <a href="https://mail.google.com" className="btn btn-primary btn-round" target="_blank" rel="noopener noreferrer">Pergi ke Gmail</a>
                    </div>
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