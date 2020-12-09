import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategory } from '../../Redux/Actions';
import { API_URL_1 } from '../../Helpers/API_URL';
import BestProduct from './BestProductHome';
import { MDBContainer, MDBBtn } from 'mdbreact';
import './ProductHome.css';
import { Link } from 'react-router-dom';


class ProductHome extends Component {

    componentDidMount() {
        this.props.getCategory()
    }

    functionModalImg = () => {
        var modal = document.getElementById("myModal");

        var img = document.querySelectorAll(".img-x");
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");
        for (let i = 0; i < img.length; i++) {
            img[i].onclick = function () {
                modal.style.display = "block";
                modalImg.src = this.src;
                captionText.innerHTML = this.alt;
            }
        }

        var span = document.getElementsByClassName("close")[0];

        span.onclick = function () {
            modal.style.display = "none";
        }
    }

    renderDataCategories = () => {
        return this.props.categories.map((item, index) => {
            return (
                <div className="card-product-home-margin">
                    {/* <MDBCard style={{ width: "12rem" }}> */}
                    <img id="myImg" class="img-category-home" src={API_URL_1 + item.categoryimage} alt="category-Img" waves width="150px" onClick={this.functionModalImg} />
                    {/* </MDBCard> */}
                    <div id="myModal" className="modal">
                        <span className="close" style={{ color: "white" }}>&times;</span>
                        <img className="modal-content" alt="category-Img" id="img01" />
                        <div id="caption"></div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div id="section2">
                <div className="body-product-home">
                    <div className="section-product-home">
                        <MDBContainer>
                            <div className="card-product-home">
                                <div className="title-product-home">PRODUK KAMI</div>
                                <div className="sub-section-product-home-1">
                                    <div className="img-product-home">
                                        {this.renderDataCategories()}
                                    </div>
                                    <center>
                                        <Link to="/product">
                                            <MDBBtn id="btn-product-home" color="elegant" size="sm" style={{ color: '#ffffff', marginTop: 20 }}> LIHAT DETAIL PRODUK</MDBBtn>
                                        </Link>
                                    </center>
                                </div>
                                <br />
                                <div>
                                    <BestProduct />
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