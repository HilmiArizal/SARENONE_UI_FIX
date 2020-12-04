import React, { Component } from 'react';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllUsers, verifiedAccount } from '../../Redux/Actions';
import { MDBBtn, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBContainer } from 'mdbreact';
import LogoSarenOne from '../../Images/LogoSarenOne.png';
import NotFound from '../../Images/404.png';
import Shop from '../../Images/Shop.png';


class VerifiedPage extends Component {

    componentDidMount() {
        let params = queryString.parse(this.props.location.search)
        let token = params.token;
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        this.props.verifiedAccount(token, headers)
    }

    render() {
        let params = queryString.parse(this.props.location.search)
        let token = params.token;

        if (this.props.status === 'verified') {
            return (
                <Redirect to="/">

                </Redirect>
            )
        }
        if (!token) {
            return (
                <div className="text-center">
                <img src={NotFound} alt="NotFound-Verified" style={{ width: '40%' }} />
            </div>
            )
        }
        return (
            <div className="text-center">
                <MDBNavbar color="#c62828 red darken-3" dark expand="md" >
                    <MDBContainer>
                        <MDBNavbarBrand>
                            <img src={LogoSarenOne} alt="Logo" className="imgLogo-Navbar" />
                        </MDBNavbarBrand>
                    </MDBContainer>
                </MDBNavbar>
                <img src={Shop} alt="Shop-Verified" style={{ width: '40%' }} />
                <div> <h1>Terimakasih {this.props.username}, akun anda sudah terverifikasi.</h1> </div>
                <div> <h4>Selamat berbelanja</h4></div>
                <div>
                    <MDBBtn color="primary" href="/"><MDBIcon icon="home" size="lg" /></MDBBtn>
                </div>

            </div>
        );
    }
}

const mapStatetoProps = ({ user }) => {
    return {
        username: user.username,
        status: user.status
    }
}

export default connect(mapStatetoProps, { getAllUsers, verifiedAccount })(VerifiedPage);