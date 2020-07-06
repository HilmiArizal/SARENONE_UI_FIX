import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn
} from "mdbreact";
import '../CSS/NavbarUser.css';
import LogoSarenOne from '../Images/LogoSarenOne.png';
import { connect } from "react-redux";
import { logoutUser, getCart } from '../Redux/Actions';
import CartNavbar from "./CartNavbar";
import CartEmpty from '../Images/CartEmpty.png';
import { Link } from "react-router-dom";
import { API_URL_1 } from "../Helpers/API_URL";


class NavbarUser extends Component {

    state = {
        isOpen: false
    };

    componentDidMount() {
        this.props.getCart();
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    onBtnLogout = () => {
        this.props.logoutUser();
    }

    renderProfile = () => {
        return (
            <MDBRow>
                <MDBCol size="2">
                    <MDBIcon icon="sign-out-alt" size="sm" style={{ margin: 15 }} />
                </MDBCol>
                <MDBCol size="10">
                    <MDBDropdownItem href="historytransaction" >Histori Transaksi</MDBDropdownItem>
                </MDBCol>
                <MDBCol size="2">
                    <MDBIcon icon="sign-out-alt" size="sm" style={{ margin: 15 }} />
                </MDBCol>
                <MDBCol size="10">
                    <MDBDropdownItem href="/" onClick={this.onBtnLogout}>Keluar</MDBDropdownItem>
                </MDBCol>
            </MDBRow>
        )
    }

    renderCart = () => {
        return this.props.dataCart.map((item, index) => {
            return (
                <div>
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
            <MDBNavbar color="#c62828 red darken-3" dark expand="md" fixed="top">
                <MDBContainer>
                    <MDBNavbarBrand>
                        <img src={LogoSarenOne} alt="Logo" className="imgLogo-Navbar" />
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar >
                        <MDBNavbarNav left >
                            <MDBNavItem >
                                <a id="font-Navbar" href="#beranda">Beranda</a>
                            </MDBNavItem>
                            <MDBNavItem>
                                <a id="font-Navbar" href="#produk">Produk</a>
                            </MDBNavItem>
                            <MDBNavItem>
                                <a id="font-Navbar" href="#tentang">Tentang</a>
                            </MDBNavItem>
                        </MDBNavbarNav>
                        {
                            this.props.username
                                ?
                                <MDBNavbarNav right>
                                    <div className="dropdown show-on-hover" style={{ cursor: 'pointer' }}>
                                        <div className=" dropdownCustom" id="font-Navbar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <CartNavbar />
                                        </div>
                                        <div className="dropdown-menu" style={{ marginLeft: 110, width: '100%' }}>
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
                                                        <div className="text-center">KERANJANG BELANJA ANDA</div>
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
                                            <MDBDropdownToggle nav caret id="font-Navbar">
                                                <div className="d-none d-md-inline">{this.props.username}</div>
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
                                        <MDBNavLink id="font-Navbar" to="register" >Daftar</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink id="fontButton-Navbar" to="login" >Masuk</MDBNavLink>
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

export default connect(mapStatetoProps, { logoutUser, getCart })(NavbarUser);