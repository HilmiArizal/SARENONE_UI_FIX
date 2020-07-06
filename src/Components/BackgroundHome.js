import React, { Component } from 'react';
import '../CSS/HomePage.css'


class BackgroundHome extends Component {

    state = {}

    render() {
        return (
            <div class="jumbotron jumbotron-fluid">
                <div class="container text-center">
                    {/* <img src={Sausage} width="25%" class="rounded-circle img-thumbnail" /> */}
                    <h1 class="display-4">Hilmi Arizal</h1>
                    <p class="lead">Selamat Datang di Portfolio Hilmi</p>
                </div>
            </div>
        );
    }
}

export default BackgroundHome;