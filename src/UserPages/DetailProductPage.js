import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { MDBRow, MDBCol, MDBBtn, MDBContainer } from 'mdbreact';
import '../CSS/DetailProduct.css';
import '../CSS/InputNumber.css'
import NavbarWithout from '../Components/NavbarWithout';
import { addCart } from '../Redux/Actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class DetailProdukPage extends Component {

    state = {
        dataProduct: [],
        dataList: [],

        newStockId: 0,
        newWeightId: 0,
        newPriceId: 0,
        newPriceName: 0,

        valueNumber: 1,
        chooseWeight: false,

        redirectCart: false
    }

    componentDidMount() {
        this.getByIdProduct();
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

    addClick = () => {
        let { valueNumber } = this.state
        if (this.state.chooseWeight) {
            this.setState({ valueNumber: valueNumber + 1 });
        } else {
            alert('Anda belum memilih berat kemasannya')
        }
    }

    minClick = () => {
        let { valueNumber } = this.state;
        if (this.state.chooseWeight) {
            if (this.state.valueNumber <= 1) {
                this.setState({ valueNumber: valueNumber = 1 })
            } else {
                this.setState({ valueNumber: valueNumber - 1 });
            }
        } else {
            alert('Anda belum memilih berat kemasannya')
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
            this.setState({ redirectCart: true })
        } else {
            alert('Isi dengan benar!')
        }
        this.setState({ showTotalPrice: totalprice })
    }

    renderProduct = () => {
        const { dataProduct } = this.state;
        return (
            <MDBRow>
                <MDBCol size="6">
                    <img src={API_URL_1 + dataProduct.productimage} alt="imgDetailProduct" className="img-detailProduct" />
                </MDBCol>
                <MDBCol size="6">
                    <h1>{dataProduct.productname}</h1>
                    <p>{dataProduct.productdescription}</p>
                    <MDBRow style={{ marginTop: 40 }}>
                        <MDBCol size="6">
                            <center>
                                <div style={{ borderBottom: '2px solid black', marginBottom: 20 }}>Pilih berat kemasan</div>
                                {this.renderList()}
                            </center>
                        </MDBCol>
                        <MDBCol size="6">
                            <center>
                                <div style={{ borderBottom: '2px solid black', marginBottom: 20 }}>Jumlah yang akan dibeli</div>
                                {this.renderInputValueNumber()}
                            </center>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        )
    }

    renderList = () => {
        return this.state.dataList.map((item, index) => {
            return (
                <MDBRow key={index}>
                    <MDBCol size="2">
                        <input type="radio" name="list" onClick={() => this.setState({
                            newStockId: item.idstock, newWeightId: item.idweight, newPriceId: item.idprice, newPriceName: item.pricelist, chooseWeight: true
                        })} />
                    </MDBCol>
                    <MDBCol size="4">
                        <div>{item.weightlist}gr</div>
                    </MDBCol>
                    <MDBCol size="6">
                        <div>Rp. {item.pricelist.toLocaleString()}</div>
                    </MDBCol>
                </MDBRow>
            )
        })
    }

    renderInputValueNumber = () => {
        return (
            <div className="def-number-input number-input">
                <button onClick={this.minClick} className="minus"></button>
                <input className="quantity" name="quantity" value={this.state.valueNumber} onChange={() => console.log('change')}
                    type="number" />
                <button onClick={this.addClick} className="plus"></button>
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
            <div>
                <NavbarWithout />
                <div style={{ marginTop: 80 }}>
                    <MDBContainer>
                        <div class="jumbotron">
                            {this.renderProduct()}
                            <hr class="my-4" />
                            <div className="text-center">
                                {this.props.iduser === 0 ?
                                    <MDBBtn color="elegant" href="/login" style={{ borderRadius: 50 }}>LOGIN</MDBBtn> :
                                    <div>
                                        {this.state.valueNumber * this.state.newPriceName === 0 ?
                                            <div> Total Harga Rp. ,-</div> :
                                            <div> Total Harga Rp. {this.state.valueNumber * this.state.newPriceName},-</div>}
                                        <MDBBtn color="elegant" onClick={this.addToCart}>TAMBAH KERANJANG</MDBBtn>
                                    </div>
                                }
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
        iduser: user.iduser
    }
}

export default connect(mapStatetoProps, { addCart })(DetailProdukPage);