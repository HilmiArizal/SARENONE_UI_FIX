import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGroupByProduct, getCategory, getWishList, addWishList } from '../../Redux/Actions';
import NavbarOther from '../../Components/Navbar/NavbarOther';
import Footer from '../../Components/Footer/Footer';
import { API_URL_1 } from '../../Helpers/API_URL';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow, MDBContainer } from 'mdbreact';
import './ProductPage.css';
import { Link } from 'react-router-dom';


class ProductPage extends Component {

    state = {
        newIdCategory: '',
        offset: 0
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    componentDidMount() {
        this.props.getGroupByProduct();
        this.props.getCategory();
        this.props.getWishList()
        window.scrollTo(0, 0);
    }

    renderProducts = () => {
        return this.props.dataAllProduct.map((item, index) => {
            if (this.state.newIdCategory === item.categoryname) {
                return (
                    <MDBCol size="3" style={{ maxWidth: "15rem" }} key={index}>
                        <MDBCard id="card-Product">
                            <div className="card-img-product">
                                <img className="img-product" src={API_URL_1 + item.productimage} alt="img-product" waves />
                                <Link to={`detailproduct?idproduct=${item.idproduct}`}>
                                    <div className="icon-favorite">
                                        Detail Produk
                            </div>
                                </Link>
                            </div>
                            <MDBCardBody>
                                <MDBCardTitle id="title-card-product">
                                    <div>{item.productname}</div>
                                </MDBCardTitle>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                )

            } else if (this.state.newIdCategory === "Semua Produk") {
                return (
                    <MDBCol size="3" style={{ maxWidth: "15rem" }} key={index}>
                        <MDBCard id="card-Product">
                            <div className="card-img-product">
                                <img className="img-product" src={API_URL_1 + item.productimage} alt="img-product" waves />
                                <Link to={`detailproduct?idproduct=${item.idproduct}`}>
                                    <div className="icon-favorite">
                                        Detail Produk
                                </div>
                                </Link>
                            </div>
                            <MDBCardBody>
                                <MDBCardTitle id="title-card-product">
                                    <div>{item.productname}</div>
                                </MDBCardTitle>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                )

            } else if (this.state.newIdCategory === "") {
                return (
                    <MDBCol size="3" style={{ maxWidth: "15rem" }} key={index}>
                        <MDBCard id="card-Product">
                            <div className="card-img-product">
                                <img className="img-product" src={API_URL_1 + item.productimage} alt="img-product" waves />
                                <Link to={`detailproduct?idproduct=${item.idproduct}`}>
                                    <div className="icon-favorite">
                                        Detail Produk
                                </div>
                                </Link>
                            </div>
                            <MDBCardBody>
                                <MDBCardTitle id="title-card-product">
                                    <div>{item.productname}</div>
                                </MDBCardTitle>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                )

            } else {
                return (
                    <></>
                )
            }
        })
    }

    renderCategories = () => {
        return this.props.dataCategory.map((item, index) => {
            return (
                <option key={index}>
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
                    <div className="section-product-1">
                        <div className="sub-section-product-1">
                            <select className="form-control" onChange={(e) => this.setState({ newIdCategory: e.target.value })}>
                                <option hidden selected disabled>PILIH BERDASARKAN KATEGORI</option>
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

const mapStatetoProps = ({ user, products, categories, wishlist }) => {
    return {
        dataAllProduct: products.dataAllProduct,
        dataCategory: categories.dataCategory,
        dataWishList: wishlist.dataWishList,
        iduser: user.iduser
    }
}

export default connect(mapStatetoProps, { getGroupByProduct, getCategory, getWishList, addWishList })(ProductPage);