import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBestProduct } from '../../Redux/Actions';
import { API_URL_1 } from '../../Helpers/API_URL';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBContainer } from 'mdbreact';
import './ProductHome.css';



class BestProductHome extends Component {

    componentDidMount() {
        this.props.getBestProduct();
    }

    renderBestProduct = () => {
        return this.props.dataProduct.map((item, index) => {
            return (
                <div key={index} id="card-best-product-margin" >
                    <MDBCard id="card-best-product">
                        <center>
                            <MDBCardImage className="img-fluid" src={API_URL_1 + item.productimage} waves id="img-best-product" />
                        </center>
                        <MDBCardBody>
                            <MDBCardTitle id="title-best-product">{item.productname}</MDBCardTitle>
                            <Link id="btn-best-product" to={`detailproduct?idproduct=${item.idproduct}`}>Beli Sekarang</Link>
                        </MDBCardBody>
                    </MDBCard>
                </div>
            )
        })
    }

    render() {
        return (
            <div >
                <MDBContainer>
                    <div className="sub-section-best-product-home-1">
                        <div className="title-product-home">3 PRODUK TERLARIS</div>
                        <div className="img-best-product-home">
                            {this.renderBestProduct()}
                        </div>
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