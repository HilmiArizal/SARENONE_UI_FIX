import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { MDBBtn, MDBView, MDBMask } from 'mdbreact';
import Carousel1 from '../Images/Carousel4.png';
import Carousel2 from '../Images/Carousel5.png';
import Carousel3 from '../Images/Carousel3.png';
import '../CSS/CarouselHome.css';


class CarouselHome extends Component {

    state = {}

    render() {
        return (
            <div>
                <Helmet>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
                    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
                </Helmet>
                <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel" id="section1" >
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <MDBView>
                                <img src={Carousel1} className="carousel-Img" alt="carousel-Produk" />
                                <div class="carousel-caption d-none d-md-block">
                                    <MDBBtn href="/product" color="#b71c1c red darken-4" size="md" style={{ width: 180, borderRadius: 50, marginBottom: 20 }}>belanja sekarang</MDBBtn>
                                </div>
                                <MDBMask pattern={5}>

                                </MDBMask>
                            </MDBView>
                        </div>
                        <div class="carousel-item">
                            <MDBView>
                                <img src={Carousel2} className="carousel-Img" alt="carousel-Produk" />
                                <div class="carousel-caption d-none d-md-block">
                                    <MDBBtn href="/product" color="#b71c1c red darken-4" size="md" style={{ width: 180, borderRadius: 50, marginBottom: 20 }}>belanja sekarang</MDBBtn>
                                </div>
                                <MDBMask pattern={5}>

                                </MDBMask>
                            </MDBView>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true" style={{ backgroundColor: "black", height: 50, width: 50 }}></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true" style={{ backgroundColor: "black", height: 50, width: 50 }}></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
        );
    }
}

export default CarouselHome;