import React, { Component } from 'react';
import CarouselHome from '../Components/CarouselHome';
import Footer from '../Components/Footer';
import '../CSS/HomePage.css';
import CategoriesProduct from './CategoriesProduct';
import AboutHome from './AboutHome';
import NavbarHome from '../Components/Navbar/NavbarHome';


class HomePage extends Component {

    render() {
        return (
            <div >
                <div style={{marginBottom:70}}><NavbarHome /></div>
                {/* <div style={{ marginBottom: 70, border: '2px solid white' }}></div> */}
                <div><CarouselHome /></div>
                <div><CategoriesProduct /></div>
                <div><AboutHome/></div>
                <div><Footer /></div>
            </div>
        );
    }
}

export default HomePage;