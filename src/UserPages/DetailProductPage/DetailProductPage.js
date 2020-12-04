import React, { Component } from 'react';
import { addCart } from '../../Redux/Actions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import { API_URL_1 } from '../../Helpers/API_URL';
import { MDBBtn, MDBContainer, MDBModal, MDBModalBody } from 'mdbreact';
import DoneIcon from '@material-ui/icons/Done';
import NavbarOther from '../../Components/Navbar/NavbarOther';
import Gmail from '../../Images/Gmail.png';
import './DetailProductPage.css';
import './DetailProductPage.css'
import '../ProductPage/ProductPage.css';
import Footer from '../../Components/Footer/Footer';
import Swal from 'sweetalert2';
import ReviewDetail from '../ReviewDetailPage/ReviewDetailPage';


class DetailProductPage extends Component {

    state = {
        dataProduct: [],
        dataList: [],

        newStockId: 0,
        newWeightId: 0,
        newPriceId: 0,
        newPriceName: 0,

        valueNumber: 1,
        chooseWeight: false,

        redirectCart: false,

        modal3: false
    }

    componentDidMount() {
        this.getByIdProduct();
        window.scrollTo(0, 0);
    }

    getByIdProduct = async () => {
        try {
            let getIdProduct = this.props.location.search.split('=')[1];
            const res = await Axios.get(API_URL_1 + `products/getProductById?idproduct=${getIdProduct}`)
            this.setState({ dataProduct: res.data[0], dataList: res.data })
        } catch (err) {
            // console.log(err)
        }
    }

    addClick = nr => () => {
        let { valueNumber } = this.state
        if (this.state.chooseWeight) {
            this.setState({ valueNumber: valueNumber + 1 });
        } else {
            let modalNumber = 'modal' + nr
            this.setState({
                [modalNumber]: !this.state[modalNumber]
            });
        }
    }

    minClick = nr => () => {
        let { valueNumber } = this.state;
        if (this.state.chooseWeight) {
            if (this.state.valueNumber <= 1) {
                this.setState({ valueNumber: valueNumber = 1 })
            } else {
                this.setState({ valueNumber: valueNumber - 1 });
            }
        } else {
            let modalNumber = 'modal' + nr
            this.setState({
                [modalNumber]: !this.state[modalNumber]
            });
        }
    }

    addToCart = () => {
        let userId = this.props.iduser;
        let stockId = this.state.newStockId;
        let productId = this.props.location.search.split('=')[1];
        let weightId = this.state.newWeightId;
        let priceId = this.state.newPriceId;
        let qty = this.state.valueNumber;
        let price = this.state.newPriceName;
        let totalprice = qty * price;
        let datacart = {
            stockId, userId, productId, weightId, priceId, qty, price, totalprice
        }
        if (weightId && qty) {
            this.props.addCart(datacart)
            Swal.fire({
                title: 'Mohon tunggu...',
                allowEscapeKey: false,
                allowOutsideClick: false,
                timer: 1000,
                onOpen: () => {
                    Swal.showLoading();
                }
            })
            setTimeout(() =>
                this.setState({ redirectCart: true })
                , 1000)
        } else {
            alert('Isi dengan benar!')
        }
        this.setState({ showTotalPrice: totalprice })
    }

    renderUnverificationAccount = () => {
        return (
            <div id="section-detail-product-1">
                <div>
                    <img src={Gmail} alt="Shop-Verified" id="img-unverified" style={{ width: '35%' }} />
                    <div id="title-unverified">Maaf {this.props.username}, akun anda belum terverifikasi.</div>
                    <p id="paragraph-unverified">Silahkan cek email anda untuk melakukan verifikasi terlebih dahulu...</p>
                    <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer">
                        <div id="btn-action-to-gmail">GO TO GMAIL</div>
                    </a>
                </div>
            </div>
        )
    }

    renderProduct = () => {
        const { dataProduct } = this.state;
        return (
            <div>
                <div id="section-detail-product-1">
                    <div id="section-detail-product-left">
                        <img src={API_URL_1 + dataProduct.productimage} alt="imgDetailProduct" className="img-detailProduct" />
                    </div>

                    <div id="section-detail-product-right">
                        <div className="title-detail-product">{dataProduct.productname}{this.state.chooseWeight ? <DoneIcon id="check-detail-product" /> : ""}</div>
                        <p>{dataProduct.productdescription}</p>

                        {this.renderList()}

                        <div className="section-detail-product-3">
                            {this.renderInputValueNumber()}
                        </div>
                    </div>
                </div>
                {
                    this.props.iduser === 0
                        ?
                        ''
                        :
                        < div style={{ marginTop: '2%' }}>
                            <ReviewDetail productname={dataProduct.productname} idproduct={{idproduct:dataProduct.idproduct}} />
                        </div>
                }
            </div>

        )
    }

    renderList = () => {
        return this.state.dataList.map((item, index) => {
            return (
                <div id="sub-section-product-2">
                    <div id="sub-section-weight">
                        <label>Berat kemasan</label><span>: {item.weightlist}gr</span>
                    </div>
                    <div id="sub-section-price">
                        <label>Harga Produk</label>
                        <span>: Rp. {item.pricelist.toLocaleString()},-</span>
                    </div>
                    <div id="sub-section-price">
                        <label>Stok Tersedia</label>
                        <span style={{ color: item.totalstock === 0 ? 'red' : 'green' }}>: {item.totalstock === 0 ? 'Sold Out' : item.totalstock + ' pack'}  </span>
                    </div>

                    <MDBModal isOpen={this.state.modal3} size="sm" centered>
                        <MDBModalBody>
                            <div className="section-checkbox-detail-product">
                                <div className="title-checkbox">Pilihan produk yang anda cari sudah sesuai ?</div>
                                {
                                    this.state.chooseWeight === true
                                        ?
                                        <div className="choose-checkbox">
                                            <div className="choose-yes-after"><DoneIcon style={{ fontSize: 25 }} /></div>
                                        </div>
                                        :
                                        <div className="choose-checkbox">
                                            <center>
                                                <div className="choose-yes" onClick={() => this.setState({
                                                    chooseWeight: true, modal3: false, newStockId: item.idstock, newWeightId: item.idweight, newPriceId: item.idprice, newPriceName: item.pricelist
                                                })}>Sudah</div>
                                                <div className="choose-no" onClick={() => this.setState({ modal3: false })}>Tidak, cari produk lagi</div>
                                            </center>
                                        </div>
                                }
                            </div>
                        </MDBModalBody>
                    </MDBModal>
                </div >
            )
        })
    }

    renderInputValueNumber = () => {
        return (
            <div>
                <div className="text-center">
                    {this.props.iduser === 0 ?
                        <MDBBtn id="btn-login-detail-product" size="sm" color="elegant" href="/login">SILAHKAN UNTUK LOGIN!</MDBBtn> :
                        <div>
                            <label className="title-quantity-detail-product">Jumlah yang akan dibeli</label>
                            <div className="def-number-input number-input" id="quantity-detail">
                                <button onClick={this.minClick(3)} className="minus"></button>
                                <input className="quantity" name="quantity" value={this.state.valueNumber} onChange={() => console.log('change')}
                                    type="number" />
                                <button onClick={this.addClick(3)} className="plus"></button>
                            </div>
                            <hr />
                            {this.state.valueNumber * this.state.newPriceName === 0 ?
                                <div className="total-price-detail-product"> Total Harga Rp. 0,-</div> :
                                <div className="total-price-detail-product"> Total Harga Rp. {this.state.valueNumber * this.state.newPriceName},-</div>}
                            <MDBBtn id="btn-fix-detail-product" size="sm" color="elegant" onClick={this.addToCart}>TAMBAH KERANJANG</MDBBtn>
                        </div>
                    }
                </div>
            </div>
        )
    }

    render() {
        if (this.state.redirectCart) {
            return (
                <Redirect to="cart">

                </Redirect>
            )
        }
        return (
            <div className="body-detail-product">
                <NavbarOther />
                <div className="section-detail-product">
                    <div className="title-detail-product"></div>
                    <MDBContainer>
                        <div class="jumbotron">
                            {
                                this.props.status === 'unverified' ? this.renderUnverificationAccount() : this.renderProduct()
                            }
                        </div>
                    </MDBContainer>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStatetoProps = ({ user }) => {
    return {
        iduser: user.iduser,
        username: user.username,
        status: user.status
    }
}

export default connect(mapStatetoProps, { addCart })(DetailProductPage);