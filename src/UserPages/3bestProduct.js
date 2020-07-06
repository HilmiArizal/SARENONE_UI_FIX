import React, { Component } from 'react';
import { getBestProduct } from '../Redux/Actions';
import { connect } from 'react-redux';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol, MDBRow, MDBContainer } from 'mdbreact';
import { API_URL_1 } from '../Helpers/API_URL';
import '../CSS/CategoriesProduct.css';



class BestProduct extends Component {

    componentDidMount() {
        this.props.getBestProduct();
    }

    renderBestProduct = () => {
        return this.props.dataProduct.map((item, index) => {
            return (
                <MDBCol size="4" style={{ maxWidth: "25rem" }} key={index}>
                    <MDBCard id="card-Product">
                        <MDBCardImage className="img-fluid" src={API_URL_1 + item.productimage} waves />
                        <MDBCardBody>
                            <MDBCardTitle style={{ fontSize: 20 }}>{item.productname}</MDBCardTitle>
                            <MDBBtn size="sm" color="elegant" href={`detailproduct?idproduct=${item.idproduct}`}>Beli Sekarang</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-center produkKami-Categories">3 PRODUK TERLARIS</div>
                <MDBContainer>
                    <center>
                        <MDBRow>
                            {this.renderBestProduct()}
                        </MDBRow>
                    </center>
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

export default connect(mapStatetoProps, { getBestProduct })(BestProduct);