import React, { Component } from 'react';
import NavbarUser from '../Components/NavbarUser';
import CarouselHome from '../Components/CarouselHome';
import Footer from '../Components/Footer';
import '../CSS/HomePage.css';
import CategoriesProduct from './CategoriesProduct';
import AboutHome from './AboutHome';


class HomePage extends Component {

    render() {
        return (
            <div >
                <div><NavbarUser /></div>
                <div style={{ marginBottom: 70, border: '2px solid white' }} id="beranda"></div>
                <div id="beranda"><CarouselHome /></div>
                <div style={{  border: '2px solid white' }} id="produk"></div>
                <div><CategoriesProduct /></div>
                <div style={{ border: '2px solid white' }} id="tentang"></div>
                <div><AboutHome/></div>
                <div><Footer /></div>
            </div>
        );
    }
}

export default HomePage;