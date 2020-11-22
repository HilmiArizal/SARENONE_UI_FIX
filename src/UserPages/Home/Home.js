import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import Navbar from '../../Components/Navbar/NavbarHome';
import ProductHome from '../../UserPages/ProductHome/ProductHome';
import AboutHome from '../../UserPages/AboutHome/AboutHome';
import Footer from '../../Components/Footer';
import ImgBanner from '../../Images/Carousel4.png';
import { MDBBtn, MDBView, MDBMask } from 'mdbreact';
import './Home.css';


class Home extends Component {

    render() {
        return (
            <div id="section1" className="body-product-home">
                {/* Navbar */}
                <div style={{ marginBottom: 70 }}>
                    <Navbar />
                </div>

                {/* Beranda */}
                <Helmet>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
                    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
                </Helmet>
                <MDBView>
                    <img src={ImgBanner} className="carousel-Img" alt="carousel-Produk" />
                    <div className="carousel-caption d-none d-md-block" id="btn">
                        <MDBBtn href="/product" color="#b71c1c red darken-4" size="md" id="btn-shop-now">belanja sekarang</MDBBtn>
                    </div>
                    <MDBMask pattern={5}>

                    </MDBMask>
                </MDBView>

                {/* Kategori */}
                <ProductHome />

                <div className="line-section">
                    <hr />
                </div>

                {/* Tentang */}
                <AboutHome />

                {/* Footer */}
                <Footer />
            </div>
        );
    }
}

export default Home;