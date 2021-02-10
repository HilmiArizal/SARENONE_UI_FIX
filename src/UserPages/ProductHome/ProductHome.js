import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategory } from '../../Redux/Actions';
import BestProduct from './BestProductHome';
import { MDBContainer, MDBBtn } from 'mdbreact';
import './ProductHome.css';
import { Link } from 'react-router-dom';


class ProductHome extends Component {

    componentDidMount() {
        this.props.getCategory()
    }

    render() {
        return (
            <div id="section2">
                <div className="body-product-home">
                    <div className="section-product-home">
                        <MDBContainer>
                            <div className="card-product-home">
                                <div>
                                    <BestProduct />
                                </div>
                                <div className="d-flex justify-content-center" style={{ marginTop: "5%" }}>
                                    <Link to="product">
                                        <MDBBtn color="elegant">Lihat produk lainnya</MDBBtn>
                                    </Link>
                                </div>
                            </div>
                        </MDBContainer>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({ categories }) => {
    return {
        categories: categories.dataCategory
    }
}

export default connect(mapStatetoProps, { getCategory })(ProductHome);