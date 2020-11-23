import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, getCart } from '../../Redux/Actions';
import LogoSarenOne from '../../Images/LogoSarenOne.png';
import CartNavbar from "./CartNavbar";
import { API_URL_1 } from "../../Helpers/API_URL";
import CartEmpty from '../../Images/CartEmpty.png';
import WhatsApp from '../../Images/whatsapp.png';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn
} from "mdbreact";
import './NavbarOther.css';
import Axios from "axios";


class NavbarOther extends Component {

    state = {
        isOpen: false
    };

    componentDidMount() {
        this.props.getCart();
    }

    componentDidMount() {
        this.getQtyCart();
    }

    getQtyCart = async () => {
        const token = localStorage.getItem('token')
        const res = await Axios.get(API_URL_1 + `cart/getQtyCart`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        this.setState({ dataQtyCart: res.data })
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    onBtnLogout = () => {
        this.props.logoutUser();
    }

    renderProfile = () => {
        return (
            <ul id="dropdown-profile-other">
                <li>
                    <label><MDBIcon icon="fas fa-history" size="sm" /></label>
                    <span> <Link to="historytransaction">Riwayat Transaksi</Link></span>
                </li>
                <li>
                    <label><MDBIcon icon="sign-out-alt" size="sm" /></label>
                    <span> <Link to="/" onClick={this.onBtnLogout}>Keluar</Link></span>
                </li>
            </ul>
        )
    }

    renderCart = () => {
        return this.props.dataCart.map((item, index) => {
            return (
                <div key={index}>
                    <div className="text-center" style={{ border: '2px solid black', margin: 10 }}></div>
                    <div className="text-center" style={{ fontSize: 15 }}>{item.productname}</div>
                    <MDBRow style={{ padding: 10 }}>
                        <MDBCol size="5">
                            <img src={API_URL_1 + item.productimage} alt="productNav" width="80px" />
                        </MDBCol>
                        <MDBCol size="7" style={{ fontSize: 10 }}>
                            <div>Berat :{item.weightlist}gr</div>
                            <div>Harga : Rp. {item.pricelist.toLocaleString()} x {item.qty}</div>
                            <div>Total Belanja: Rp. {item.totalprice.toLocaleString()},- </div>
                        </MDBCol>
                    </MDBRow>
                </div>
            )
        })
    }

    render() {
        return (
            <MDBNavbar dark expand="md" id="navbar-custom-other" fixed="top">
                <MDBContainer>
                    <MDBNavbarBrand>
                        <Link to="/">
                            <img src={LogoSarenOne} alt="Logo" className="imgLogo-Navbar" />
                        </Link>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar >
                        <MDBNavbarNav left id="navbar-left-other" >
                            <MDBNavItem>
                                <Link id="item-navbar-other" to="/">Kembali ke beranda</Link>
                            </MDBNavItem>
                            <MDBNavItem>
                                <a id="item-navbar-other" target="_blank" rel="noopener noreferrer" href="https://wa.me/628987481821/?text=Hi, saya tertarik dengan produk SarenOne"><img src={WhatsApp} alt="chat-wa" id="logo-wa" />Chat Via WhatsApp</a>
                            </MDBNavItem>
                        </MDBNavbarNav>
                        {
                            this.props.username
                                ?
                                <MDBNavbarNav right>
                                    <div className="dropdown show-on-hover" style={{ cursor: 'pointer' }}>
                                        <div id="dropdownCustom-other" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <CartNavbar />
                                        </div>
                                        <div className="dropdown-menu" id="dropdown-cart">
                                            {
                                                this.props.dataCart.length === 0
                                                    ?
                                                    <center>
                                                        <img src={CartEmpty} alt="cartEmpty" style={{ width: 100 }} />
                                                        <div style={{ margin: 20, fontSize: 12 }}> Ooops, keranjang belanja anda kosong </div>
                                                        <Link to="product">
                                                            <MDBBtn color="elegant" size="sm">BELANJA SEKARANG</MDBBtn>
                                                        </Link>
                                                    </center>
                                                    :
                                                    <div>
                                                        <div className="text-center">KERANJANG ANDA</div>
                                                        {this.renderCart()}
                                                        <center>
                                                            <MDBRow>
                                                                <MDBCol size="6">
                                                                    <Link to="cart">
                                                                        <MDBBtn size="sm" color="elegant">Detail</MDBBtn>
                                                                    </Link>
                                                                </MDBCol>
                                                                <MDBCol size="6">
                                                                    <Link to="transaction">
                                                                        <MDBBtn size="sm" color="elegant">Bayar</MDBBtn>
                                                                    </Link>
                                                                </MDBCol>
                                                            </MDBRow>
                                                        </center>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                    <MDBNavItem>
                                        <MDBDropdown>
                                            <MDBDropdownToggle nav caret id="item-dropdown-username-other">
                                                <div>{this.props.username}</div>
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu id="dropdown-menu" right>
                                                {this.renderProfile()}
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                    </MDBNavItem>
                                </MDBNavbarNav>
                                :
                                <MDBNavbarNav right>
                                    <MDBNavItem>
                                        <MDBNavLink id="button-Navbar-Reg-other" to="register" >Daftar</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink id="button-Navbar-In-other" to="login" >Masuk</MDBNavLink>
                                    </MDBNavItem>
                                </MDBNavbarNav>
                        }
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        );
    }
}

const mapStatetoProps = ({ user, cart }) => {
    return {
        username: user.username,
        dataCart: cart.dataCart
    }
}

export default connect(mapStatetoProps, { logoutUser, getCart })(NavbarOther);