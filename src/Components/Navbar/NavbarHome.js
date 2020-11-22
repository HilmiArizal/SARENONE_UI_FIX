import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser, getCart } from '../../Redux/Actions';
import { API_URL_1 } from "../../Helpers/API_URL";
import CartNavbar from "./CartNavbar";
import LogoSarenOne from '../../Images/LogoSarenOne.png';
import CartEmpty from '../../Images/CartEmpty.png';
import WhatsApp from '../../Images/whatsapp.png';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn
} from "mdbreact";
import { Link as LinkScroll, animateScroll as scroll } from "react-scroll";
import './NavbarHome.css';


class NavbarHome extends Component {

    state = {
        isOpen: false
    };

    componentDidMount() {
        this.props.getCart();
    }

    scrollToTop = () => {
        scroll.scrollToTop();
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    onBtnLogout = () => {
        this.props.logoutUser();
    }

    renderProfile = () => {
        return (
            <ul id="dropdown-profile">
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
                <div id="cart-detail">
                    <div className="text-center" style={{ border: '2px solid black', margin: 10 }}></div>
                    <div className="text-center" style={{ fontSize: 15 }}>{item.productname}</div>
                    <MDBRow style={{ padding: 10 }}>
                        <MDBCol size="5">
                            <center>
                                <img src={API_URL_1 + item.productimage} alt="productNav" width="80px" />
                            </center>
                        </MDBCol>
                        <MDBCol size="7" style={{ fontSize: 12 }}>
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
            <MDBNavbar dark expand="md" fixed="top" id="navbar-custom">
                <MDBContainer>
                    <MDBNavbarBrand>
                        <img src={LogoSarenOne} alt="Logo" className="imgLogo-Navbar" onClick={this.scrollToTop} />
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar >
                        <MDBNavbarNav left id="navbar-left">
                            <MDBNavItem >
                                <LinkScroll
                                    activeClass="active"
                                    to="section1"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    id="item-navbar"
                                >
                                    Beranda
                                </LinkScroll>
                            </MDBNavItem>
                            <MDBNavItem>
                                <LinkScroll
                                    activeClass="active"
                                    to="section2"
                                    spy={true}
                                    smooth={true}
                                    offset={-60}
                                    duration={500}
                                    id="item-navbar"
                                >
                                    Produk
                                </LinkScroll>
                            </MDBNavItem>
                            <MDBNavItem>
                                <LinkScroll
                                    activeClass="active"
                                    to="section3"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    id="item-navbar"
                                >
                                    Tentang
                                </LinkScroll>
                            </MDBNavItem>
                            <MDBNavItem>
                                <a id="item-navbar" target="_blank" rel="noopener noreferrer" href="https://wa.me/628987481821/?text=Hi, saya tertarik dengan produk SarenOne"><img src={WhatsApp} alt="chat-wa" id="logo-wa" />Chat Via WhatsApp</a>
                            </MDBNavItem>
                        </MDBNavbarNav>
                        {
                            this.props.username
                                ?
                                <MDBNavbarNav right>
                                    <div className="dropdown show-on-hover" style={{ cursor: 'pointer' }}>
                                        <div id="dropdownCustom" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                                                        <div className="text-center" style={{ fontWeight: "bold" }}>KERANJANG BELANJA ANDA</div>
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
                                            <MDBDropdownToggle nav caret id="item-dropdown-username">
                                                <div>{this.props.username}</div>
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu id="dropdown-menu" right>
                                                {this.renderProfile()}
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                    </MDBNavItem>
                                </MDBNavbarNav>
                                :
                                <MDBNavbarNav right id="navbar-right">
                                    <MDBNavItem>
                                        <MDBNavLink id="button-Navbar-Reg" to="register" >Daftar</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink id="button-Navbar-In" to="login" >Masuk</MDBNavLink>
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

export default connect(mapStatetoProps, { logoutUser, getCart })(NavbarHome);