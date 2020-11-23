import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_URL_1 } from '../../Helpers/API_URL';
import { getCart, deleteCart, editCart } from '../../Redux/Actions';
import NavbarOther from '../../Components/Navbar/NavbarOther';
import Footer from '../../Components/Footer';
import CartEmpty from '../../Images/CartEmpty.png';
import PayShop from '../../Images/PayShop.png';
import AddShop from '../../Images/AddShop.png';
import CloseIcon from '@material-ui/icons/Close';
import { MDBIcon, MDBBtn } from 'mdbreact';
import './CartPage.css';


class CartPage extends Component {

    state = {
        dataCart: [],

        selectIdInput: null
    }

    componentDidMount() {
        this.props.getCart();
    }

    deleteCart = (idcart) => {
        this.props.deleteCart(idcart)
    }

    editQtyCart = (idcart) => {
        let newQty = this.refs.newQty.value;
        if (parseInt(newQty) <= 0) {
            alert('Masukan dengan benar!')
        } else {
            let dataCart = { qty: newQty }
            this.props.editCart(idcart, dataCart)
            this.setState({ selectIdInput: null })
        }
    }

    renderCart = () => {
        return this.props.dataCart.map((item, index) => {
            return (
                <div className="section-cart-1">
                    <div className="sub-section-cart-1">
                        <div className="section-cart-left">
                            <img src={API_URL_1 + item.productimage} alt="product-img" className="img-cart" />
                        </div>
                        <div className="section-cart-center">
                            <div className="cart-productname">{item.productname}</div>
                            <div className="sub-section-cart-product">
                                <label>Kategori Produk</label><span>: {item.categoryname}</span>
                            </div>
                            <div className="sub-section-cart-product">
                                <label>Berat Produk</label><span>: {item.weightlist}gr</span>
                            </div>
                            <div className="sub-section-cart-product">
                                <label>Harga Produk</label><span>: Rp. {item.pricelist.toLocaleString()},-</span>
                            </div>
                            <div className="sub-section-cart-product">
                                <label>Kuantias Produk</label>
                                <span>: {item.qty} pack
                                <span className="btn-change-qty">
                                        <input type="number" min="1" ref="newQty" style={{ width: 50, fontSize: 13 }} defaultValue={item.qty} />
                                        <MDBIcon icon="check" size="sm" style={{ cursor: "pointer", marginLeft: 5 }} onClick={() => this.editQtyCart(item.idcart)} />
                                    </span>
                                </span>
                            </div>
                            <div className="sub-section-cart-product">
                                <label>Total Harga</label><span>: Rp. {item.totalprice.toLocaleString()},-</span>
                            </div>
                        </div>
                        <div className="section-cart-right">
                            <div>
                                <img src={AddShop} alt="img-shop" className="img-shop" />
                            </div>
                            <div>
                                <Link to="product">
                                    <MDBBtn size="sm" color="primary">Tambah Belanja</MDBBtn>
                                </Link>
                            </div>
                        </div>
                        <div className="close-icon-cart">
                            <CloseIcon onClick={() => this.deleteCart(item.idcart)} />
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="body-cart">
                <div style={{ marginBottom: 50 }}>
                    <NavbarOther />
                </div>
                <div className="section-cart">
                    <div className="container">
                        {
                            this.props.dataCart.length === 0
                                ?
                                <center>
                                    <img src={CartEmpty} alt="cartEmpty" className="img-cart-empty"/>
                                    <div style={{ margin: 20 }}> Ooops, keranjang belanja anda kosong </div>
                                    <MDBBtn color="elegant" href="product">BELANJA SEKARANG</MDBBtn>
                                </center>
                                :
                                <div>
                                    <div className="title-cart"> Detail keranjang belanja anda </div>
                                    <div className="section-cart-card">
                                        {this.renderCart()}
                                        <div id="pay-cart">
                                            <div>
                                                <img src={PayShop} alt="img-shop" className="img-shop" />
                                            </div>
                                            <div>
                                                <Link to="transaction">
                                                    <MDBBtn size="md" color="elegant">Check Out</MDBBtn>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStatetoProps = ({ cart }) => {
    return {
        dataCart: cart.dataCart
    }
}

export default connect(mapStatetoProps, { getCart, deleteCart, editCart })(CartPage);