import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBestProduct } from '../../Redux/Actions';
import { API_URL_1 } from '../../Helpers/API_URL';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import './ProductHome.css';



class BestProductHome extends Component {

    componentDidMount() {
        this.props.getBestProduct();
    }

    renderBestProduct = () => {
        return this.props.dataProduct.map((item, index) => {
            return (
                <MDBCol md="3" id="col-best-product" key={index}>
                    <Link id="link-best-product" to={`detailproduct?idproduct=${item.idproduct}`}>
                        <MDBCard id="card-best-product">
                            <center>
                                <MDBCardImage className="img-fluid" src={API_URL_1 + item.productimage} id="img-best-product" />
                            </center>
                            <MDBCardBody id="body-best-product">
                                <MDBCardTitle id="title-best-product">{item.productname}</MDBCardTitle>
                            </MDBCardBody>
                        </MDBCard>
                    </Link>
                </MDBCol>
            )
        })
    }

    render() {
        return (
            <div >
                <MDBContainer>
                    <div className="sub-section-best-product-home-1">
                        <div className="title-product-home">PRODUK SARENONE</div>
                        {/* <div className="img-best-product-home"> */}
                        <MDBRow>
                            {this.renderBestProduct()}
                        </MDBRow>
                        {/* </div> */}
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

const mapStatetoProps = ({ products }) => {
    return {
        dataProduct: products.dataProduct
    }
}

export default connect(mapStatetoProps, { getBestProduct })(BestProductHome);