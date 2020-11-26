import React, { Component } from 'react';
import LogoSarenOne from '../Images/LogoSarenOne.png';
import { Helmet } from 'react-helmet';
import { logoutUser } from '../Redux/Actions';
import { connect } from 'react-redux';
import { MDBIcon, MDBRow, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom';


class SidebarAdmin extends Component {

    state = {}

    onBtnLogout = () => {
        this.props.logoutUser();
    }

    render() {
        return (
            <div>
                <Helmet>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
                </Helmet>
                <div className="w3-sidebar w3-light-grey w3-bar-block" style={{ width: '15%' }}>
                    <h3 className="w3-bar-item"><center><img src={LogoSarenOne} alt="Car" style={{ width: '50%', borderRadius: 50 }} /></center></h3>
                    <MDBRow>
                        <MDBCol size="2"><MDBIcon icon="home" size="lg" style={{ margin: 10 }} /></MDBCol>
                        <MDBCol size="10">
                            <Link className="w3-bar-item w3-button" to="adminhome">Beranda</Link>
                            {/* <a href="homeadmin" className="w3-bar-item w3-button">Beranda</a> */}
                        </MDBCol>
                        <MDBCol size="2"><MDBIcon icon="user-alt" size="lg" style={{ margin: 10 }} /></MDBCol>
                        <MDBCol size="10">
                        <Link className="w3-bar-item w3-button" to="adminprofile">Profile</Link>

                            {/* <a href="profileadmin" className="w3-bar-item w3-button">Profil</a> */}
                        </MDBCol>
                        <MDBCol size="2"><MDBIcon icon="user-cog" size="lg" style={{ margin: 10 }} /></MDBCol>
                        <MDBCol size="10">
                            <a href="manageusers" className="w3-bar-item w3-button">Kelola User</a>
                        </MDBCol>
                        <MDBCol size="2"><MDBIcon icon="hotdog" size="lg" style={{ margin: 10 }} /></MDBCol>
                        <MDBCol size="10">
                            <a href="manageallproduct" className="w3-bar-item w3-button">Kelola Produk</a>
                        </MDBCol>
                        <MDBCol size="2"><MDBIcon icon="money-check-alt" size="lg" style={{ margin: 10 }} /></MDBCol>
                        <MDBCol size="10">
                            <a href="transactionprocess" className="w3-bar-item w3-button">Kelola Transaksi</a>
                        </MDBCol>
                        <MDBCol size="2"><MDBIcon icon="sign-out-alt" size="lg" style={{ margin: 10 }} /></MDBCol>
                        <MDBCol size="10">
                            <a href="/" onClick={this.onBtnLogout} className="w3-bar-item w3-button">Keluar</a>
                        </MDBCol>
                    </MDBRow>
                </div>
            </div>
        );
    }
}


export default connect(null, { logoutUser })(SidebarAdmin);