import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGroupByProduct, getCategory } from '../Redux/Actions';
// import NavbarWithout from '../Components/NavbarWithout';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol, MDBRow, MDBContainer } from 'mdbreact';
import { API_URL_1 } from '../Helpers/API_URL';
import '../CSS/ProductPage.css';
import Footer from '../Components/Footer';
import Axios from 'axios';
import NavbarOther from '../Components/Navbar/NavbarOther';

class ProductPage extends Component {

    state = {
        dataProductSecondGrade: [],

        newIdCategory: '',

        offset: 0
    }

    componentDidMount() {
        this.props.getGroupByProduct();
        this.props.getCategory();
        this.getProductSecondGrade();
    }

    getProductSecondGrade = async () => {
        const res = await Axios.get(API_URL_1 + `products/getProductSecondGrade`)
        this.setState({ dataProductSecondGrade: res.data })
    }

    renderProductSecondGrade = () => {
        return this.state.dataProductSecondGrade.map((item, index) => {
            if (this.state.newIdCategory === item.categoryname) {
                return (
                    <MDBCol size="3" style={{ maxWidth: "18rem" }} key={index}>
                        <MDBCard id="card-Product">
                            <MDBCardImage className="img-fluid" src={API_URL_1 + item.productimage} waves />
                            <MDBCardBody>
                                <MDBCardTitle style={{ fontSize: 15 }}>{item.productname}</MDBCardTitle>
                                <MDBBtn size="sm" color="elegant" href={`detailproduct?idproduct=${item.idproduct}`}>Beli Sekarang</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                )
            } else if (this.state.newIdCategory === "Semua Produk") {
                return (
                    <MDBCol size="3" style={{ maxWidth: "18rem" }} key={index}>
                        <MDBCard id="card-Product">
                            <MDBCardImage className="img-fluid" src={API_URL_1 + item.productimage} waves />
                            <MDBCardBody>
                                <MDBCardTitle style={{ fontSize: 15 }}>{item.productname}</MDBCardTitle>
                                <MDBBtn size="sm" color="elegant" href={`detailproduct?idproduct=${item.idproduct}`} >Beli Sekarang</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                )
            } else if (this.state.newIdCategory === "") {
                return (
                    <MDBCol size="3" style={{ maxWidth: "18rem" }} key={index}>
                        <MDBCard id="card-Product">
                            <MDBCardImage className="img-fluid" src={API_URL_1 + item.productimage} waves />
                            <MDBCardBody>
                                <MDBCardTitle style={{ fontSize: 15 }}>{item.productname}</MDBCardTitle>
                                <MDBBtn size="sm" color="elegant" href={`detailproduct?idproduct=${item.idproduct}`} >Beli Sekarang</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                )
            } else {
                return (
                    <div></div>
                )
            }
        })
    }

    renderProducts = () => {
        return this.props.dataProduct.map((item, index) => {
            if (this.state.newIdCategory === item.categoryname) {
                if (item.productgrade === 'Premium Grade') {
                    return (
                        <MDBCol size="3" style={{ maxWidth: "18rem" }} key={index}>
                            <MDBCard id="card-Product">
                                <MDBCardImage className="img-fluid" src={API_URL_1 + item.productimage} waves />
                                <MDBCardBody>
                                    <MDBCardTitle style={{ fontSize: 15 }}>{item.productname}</MDBCardTitle>
                                    <MDBBtn size="sm" color="elegant" href={`detailproduct?idproduct=${item.idproduct}`}>Beli Sekarang</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    )
                }
            } else if (this.state.newIdCategory === "Semua Produk") {
                if (item.productgrade === 'Premium Grade') {
                    return (
                        <MDBCol size="3" style={{ maxWidth: "18rem" }} key={index}>
                            <MDBCard id="card-Product">
                                <MDBCardImage className="img-fluid" src={API_URL_1 + item.productimage} waves />
                                <MDBCardBody>
                                    <MDBCardTitle style={{ fontSize: 15 }}>{item.productname}</MDBCardTitle>
                                    <MDBBtn size="sm" color="elegant" href={`detailproduct?idproduct=${item.idproduct}`} >Beli Sekarang</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    )
                }
            } else if (this.state.newIdCategory === "") {
                if (item.productgrade === 'Premium Grade') {
                    return (
                        <MDBCol size="3" style={{ maxWidth: "18rem" }} key={index}>
                            <MDBCard id="card-Product">
                                <MDBCardImage className="img-fluid" src={API_URL_1 + item.productimage} waves />
                                <MDBCardBody>
                                    <MDBCardTitle style={{ fontSize: 15 }}>{item.productname}</MDBCardTitle>
                                    <MDBBtn size="sm" color="elegant" href={`detailproduct?idproduct=${item.idproduct}`} >Beli Sekarang</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    )
                }
            } else {
                return (
                    <div></div>
                )
            }
        })
    }

    renderCategories = () => {
        return this.props.dataCategory.map((item, index) => {
            return (
                <option  >
                    {item.categoryname}
                </option>
            )
        })
    }

    render() {
        return (
            <div >
                <NavbarOther />
                <MDBContainer>
                    <div className="text-Product" style={{ marginTop: 30 }}>PILIH BERDASARKAN KATEGORI
                        <center>
                            <div>
                                <MDBRow>
                                    <MDBCol size="4"></MDBCol>
                                    <MDBCol size="4">
                                        <select className="form-control" onChange={(e) => this.setState({ newIdCategory: e.target.value })}>
                                            <option onChange={() => this.setState({ newIdCategory: 0 })}>Semua Produk</option>
                                            {this.renderCategories()}
                                        </select>
                                    </MDBCol>
                                    <MDBCol size="4"></MDBCol>
                                </MDBRow>
                            </div>
                        </center>
                    </div>
                    <div className="jumbotron" style={{ minHeight: '75vh' }}>
                        <center>
                            <MDBRow>
                                {this.renderProducts()}
                            </MDBRow>
                        </center>
                    </div>
                </MDBContainer>
                <div><Footer /></div>
            </div>
        );
    }
}

const mapStatetoProps = ({ products, categories }) => {
    return {
        dataProduct: products.dataProduct,
        dataCategory: categories.dataCategory
    }
}

export default connect(mapStatetoProps, { getGroupByProduct, getCategory })(ProductPage);