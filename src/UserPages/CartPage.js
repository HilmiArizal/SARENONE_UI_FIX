import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCart, deleteCart, editCart } from '../Redux/Actions';
// import NavbarWithout from '../Components/NavbarWithout';
import { MDBIcon, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import '../CSS/CartPage.css';
import CartEmpty from '../Images/CartEmpty.png';
import { Link } from 'react-router-dom';
import NavbarOther from '../Components/Navbar/NavbarOther';


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
        if (newQty === '0') {
            alert('Masukan dengan benar!')
        } else {
            let dataCart = { qty: newQty }
            this.props.editCart(idcart, dataCart)
            this.setState({ selectIdInput: null })
        }
    }

    renderCart = () => {
        return this.props.dataCart.map((item, index) => {
            if (this.state.selectIdInput === index) {
                return (
                    <tr className="text-center" key={index}>
                        <td>{index + 1}</td>
                        <td>{item.productname}</td>
                        <td>{item.weightlist}gr</td>
                        <td>Rp. {item.pricelist.toLocaleString()} ,-</td>
                        <td>
                            <MDBRow>
                                <MDBCol size="7"><input type="number" min="1" ref="newQty" style={{ width: 50, fontSize: 10 }} defaultValue={item.qty} /></MDBCol>
                                <MDBCol size="5"><div id="btn-ActionCart" onClick={() => this.editQtyCart(item.idcart)}><MDBIcon icon="check" size="sm" /></div> </MDBCol>
                            </MDBRow>
                        </td>
                        <td>Rp. {item.totalprice.toLocaleString()} ,-</td>
                        <td>
                            <center>
                                <MDBRow>
                                    <MDBCol size="6">
                                        <div id="btn-ActionCart" onClick={() => this.deleteCart(item.idcart)}><MDBIcon icon="trash" size="sm" /></div>
                                    </MDBCol>
                                    <MDBCol size="6">
                                        <Link to="product">
                                            <div id="btn-ActionCart"><MDBIcon icon="plus" size="sm" /></div>
                                        </Link>
                                    </MDBCol>
                                </MDBRow>
                            </center>
                        </td>
                    </tr>
                )
            }
            return (
                <tr className="text-center" key={index}>
                    <td>{index + 1}</td>
                    <td>{item.productname}</td>
                    <td>{item.weightlist}gr</td>
                    <td>Rp. {item.pricelist.toLocaleString()} ,-</td>
                    <td>
                        <MDBRow>
                            <MDBCol size="7">{item.qty} pack </MDBCol>
                            <MDBCol size="5">   <div id="btn-ActionCart" onClick={() => this.setState({ selectIdInput: index })}><MDBIcon icon="cog" size="sm" /></div> </MDBCol>
                        </MDBRow>
                    </td>
                    <td>Rp. {item.totalprice.toLocaleString()} ,-</td>
                    <td>
                        <center>
                            <MDBRow>
                                <MDBCol size="6">
                                    <div id="btn-ActionCart" onClick={() => this.deleteCart(item.idcart)}><MDBIcon icon="trash" size="sm" /></div>
                                </MDBCol>
                                <MDBCol size="6">
                                    <Link to="product">
                                        <div id="btn-ActionCart"><MDBIcon icon="plus" size="sm" /></div>
                                    </Link>
                                </MDBCol>
                            </MDBRow>
                        </center>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <NavbarOther />
                <div class="w3-container">
                    <div className="container">
                        {
                            this.props.dataCart.length === 0
                                ?
                                <center>
                                    <img src={CartEmpty} alt="cartEmpty" style={{ width: 250, marginTop: 50 }} />
                                    <div style={{ margin: 20 }}> Ooops, keranjang belanja anda kosong </div>
                                    <MDBBtn color="elegant" href="product">BELANJA SEKARANG</MDBBtn>
                                </center>
                                :
                                <center>
                                    <div style={{ margin: 50, fontSize: '150%' }}> Detail keranjang belanja anda </div>
                                    <table class="table table-sm table table-bordered">
                                        <thead>
                                            <tr className="text-center">
                                                <th scope="col">NO. </th>
                                                <th scope="col">NAMA PRODUK</th>
                                                <th scope="col">BERAT KEMASAN</th>
                                                <th scope="col">HARGA</th>
                                                <th scope="col">KUANTITAS</th>
                                                <th scope="col">TOTAL</th>
                                                <th scope="col">AKSI</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderCart()}
                                        </tbody>
                                    </table>
                                    <center>
                                        <Link to="transaction">
                                            <MDBBtn color="elegant" size="md" style={{ margin: 30 }}>BAYAR SEKARANG</MDBBtn>
                                        </Link>
                                    </center>
                                </center>
                        }
                    </div>
                </div>
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