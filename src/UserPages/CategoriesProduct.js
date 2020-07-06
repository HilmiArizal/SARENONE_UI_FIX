import React, { Component } from 'react';
import { MDBCard, MDBCol, MDBRow, MDBContainer, MDBBtn } from 'mdbreact';
import { getCategory } from '../Redux/Actions';
import { connect } from 'react-redux';
import { API_URL_1 } from '../Helpers/API_URL';
import '../CSS/CategoriesProduct.css';
import '../CSS/PreviewImage.css'
import BestProduct from './3bestProduct';


class CategoriesProduct extends Component {

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
                <MDBCol>
                    <center>
                        <MDBCard style={{ width: "12rem" }}>
                            <center>
                                <img id="myImg" class="img-x" src={API_URL_1 + item.categoryimage} alt="category-Img" waves width="150px" onClick={this.functionModalImg} />
                            </center>
                        </MDBCard>
                        <div id="myModal" class="modal">
                            <span className="close" style={{ color: "white" }}>&times;</span>
                            <img className="modal-content" alt="category-Img" id="img01" />
                            <div id="caption"></div>
                        </div>
                    </center>
                </MDBCol>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid">
                <div className="d-flex justify-content-center produkKami-Categories">PRODUK KAMI</div>
                    <MDBContainer>
                        <div className="d-flex justify-content-center">
                            <MDBRow>
                                {this.renderDataCategories()}
                            </MDBRow>
                        </div>
                        <center>
                            <MDBBtn href="product" color="#b71c1c red darken-4" size="sm" style={{ color: 'white', margin: 30 }}> LIHAT DETAIL PRODUK</MDBBtn>
                        </center>
                        <div><BestProduct /></div>
                    </MDBContainer>
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

export default connect(mapStatetoProps, { getCategory })(CategoriesProduct);