import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGroupByProduct, getCategory, getWishList, addWishList } from '../../Redux/Actions';
import NavbarOther from '../../Components/Navbar/NavbarOther';
import Footer from '../../Components/Footer/Footer';
import { API_URL_1 } from '../../Helpers/API_URL';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol, MDBRow, MDBContainer } from 'mdbreact';
import './ProductPage.css';


class ProductPage extends Component {

    state = {
        newIdCategory: '',
        offset: 0,
        modal14: false,

        icon: false,
        like: [],
        idproduct: 0
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
    }

    btnLike = (idproduct) => {
        // // console.log(idproduct)
        // let { like } = this.state;
        // let productId = { idproduct }
        // like.push(productId)
        // this.setState({ like: like })
        // console.log(like)
    }

    // onAddWishList = () => {
    //     let idproduct = this.state.idproduct;
    //     let iduser = this.props.iduser;
    //     this.props.addWishList(iduser, idproduct)
    //     this.setState({
    //         modal14: false,
    //         icon: true,
    //     })
    // }

    renderProducts = () => {
        return this.props.dataAllProduct.map((item, index) => {
            if (this.state.newIdCategory === item.categoryname) {
                return (
                    <MDBCol size="3" style={{ maxWidth: "13rem" }} key={index}>
                        <MDBCard id="card-Product">
                            {/* <div className="icon-favorite"><MDBIcon far icon="heart" /></div> */}
                            <MDBCardImage className="img-fluid" src={API_URL_1 + item.productimage} waves />
                            <MDBCardBody>
                                <MDBCardTitle id="title-card-product">
                                    <div>{item.productname}</div>
                                </MDBCardTitle>
                                <MDBBtn id="btn-card-product" size="sm" color="elegant" href={`detailproduct?idproduct=${item.idproduct}`} >Beli Sekarang</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                )

            } else if (this.state.newIdCategory === "Semua Produk") {
                return (
                    <MDBCol size="3" style={{ maxWidth: "13rem" }} key={index}>
                        <MDBCard id="card-Product">
                            {/* <div className="icon-favorite"><MDBIcon far icon="heart" /></div> */}
                            <MDBCardImage className="img-fluid" src={API_URL_1 + item.productimage} waves />
                            <MDBCardBody>
                                <MDBCardTitle id="title-card-product">
                                    <div>{item.productname}</div>
                                </MDBCardTitle>
                                <MDBBtn id="btn-card-product" size="sm" color="elegant" href={`detailproduct?idproduct=${item.idproduct}`} >Beli Sekarang</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                )

            } else if (this.state.newIdCategory === "") {
                return (
                    <MDBCol size="3" style={{ maxWidth: "13rem" }} key={index}>
                        <MDBCard id="card-Product">
                            <div>
                                {/* <div className="icon-favorite" onClick={() => this.btnLike(item.idproduct)} >
                                    <MDBIcon far icon="heart"></MDBIcon>
                                </div> */}

                                {/* <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
                                    <MDBModalHeader toggle={this.toggle(14)}>{item.productname}</MDBModalHeader>
                                    <MDBModalBody>
                                        <center>
                                            <div style={{ fontSize: '120%', fontWeight: 'bold' }}>Simpan ke wishlist ?</div>
                                            <MDBBtn size="sm" color="warning" onClick={() => this.setState({ modal14: false, icon: false })}>Batal</MDBBtn>
                                            <MDBBtn size="sm" color="primary" onClick={this.onAddWishList}>Simpan</MDBBtn>
                                        </center>
                                    </MDBModalBody>
                                </MDBModal> */}
                            </div>
                            <MDBCardImage className="img-fluid" src={API_URL_1 + item.productimage} waves />
                            <MDBCardBody>
                                <MDBCardTitle id="title-card-product">
                                    <div>{item.productname}</div>
                                </MDBCardTitle>
                                <MDBBtn id="btn-card-product" size="sm" color="elegant" href={`detailproduct?idproduct=${item.idproduct}`} >Beli Sekarang</MDBBtn>
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
    console.log(wishlist.dataWishList)
    return {
        dataAllProduct: products.dataAllProduct,
        dataCategory: categories.dataCategory,
        dataWishList: wishlist.dataWishList,
        iduser: user.iduser
    }
}

export default connect(mapStatetoProps, { getGroupByProduct, getCategory, getWishList, addWishList })(ProductPage);