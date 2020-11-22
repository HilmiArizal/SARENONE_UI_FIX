import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGroupByProduct, getCategory } from '../../Redux/Actions';
import NavbarOther from '../../Components/Navbar/NavbarOther';
import Footer from '../../Components/Footer';
import { API_URL_1 } from '../../Helpers/API_URL';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol, MDBRow, MDBContainer } from 'mdbreact';
import './ProductPage.css';


class ProductPage extends Component {

    state = {
        newIdCategory: '',
        offset: 0
    }

    componentDidMount() {
        this.props.getGroupByProduct();
        this.props.getCategory();
    }

    renderProducts = () => {
        return this.props.dataProduct.map((item, index) => {
            if (this.state.newIdCategory === item.categoryname) {
                if (item.productgrade === 'Premium Grade') {
                    return (
                        <MDBCol size="3" style={{ maxWidth: "15rem" }} key={index}>
                            <MDBCard id="card-Product">
                                <MDBCardImage className="img-fluid" src={API_URL_1 + item.productimage} waves />
                                <MDBCardBody>
                                    <MDBCardTitle id="title-card-product">{item.productname}</MDBCardTitle>
                                    <MDBBtn id="btn-card-product" size="sm" color="elegant" href={`detailproduct?idproduct=${item.idproduct}`} >Beli Sekarang</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    )
                }
            } else if (this.state.newIdCategory === "Semua Produk") {
                if (item.productgrade === 'Premium Grade') {
                    return (
                        <MDBCol size="3" style={{ maxWidth: "15rem" }} key={index}>
                            <MDBCard id="card-Product">
                                <MDBCardImage className="img-fluid" src={API_URL_1 + item.productimage} waves />
                                <MDBCardBody>
                                    <MDBCardTitle id="title-card-product">{item.productname}</MDBCardTitle>
                                    <MDBBtn id="btn-card-product" size="sm" color="elegant" href={`detailproduct?idproduct=${item.idproduct}`} >Beli Sekarang</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    )
                }
            } else if (this.state.newIdCategory === "") {
                if (item.productgrade === 'Premium Grade') {
                    return (
                        <MDBCol size="3" style={{ maxWidth: "15rem" }} key={index}>
                            <MDBCard id="card-Product">
                                <MDBCardImage className="img-fluid" src={API_URL_1 + item.productimage} waves />
                                <MDBCardBody>
                                    <MDBCardTitle id="title-card-product">{item.productname}</MDBCardTitle>
                                    <MDBBtn id="btn-card-product" size="sm" color="elegant" href={`detailproduct?idproduct=${item.idproduct}`} >Beli Sekarang</MDBBtn>
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
                <option>
                    {item.categoryname}
                </option>
            )
        })
    }

    render() {
        return (
            <div className="body-product-page">
                <div style={{ marginBottom: 70 }}>
                    <NavbarOther />
                </div>
                <MDBContainer>
                    <div className="title-product">PILIH BERDASARKAN KATEGORI</div>
                    <div className="section-product-1">
                        <div className="sub-section-product-1">
                            <select className="form-control" onChange={(e) => this.setState({ newIdCategory: e.target.value })}>
                                <option onChange={() => this.setState({ newIdCategory: 0 })}>Semua Produk</option>
                                {this.renderCategories()}
                            </select>
                        </div>
                    </div>
                    <div className="card-product-page">
                        <MDBRow id="card-item">
                            {this.renderProducts()}
                        </MDBRow>
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