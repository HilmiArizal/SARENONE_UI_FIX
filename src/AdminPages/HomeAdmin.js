import React, { Component } from 'react';
import SidebarAdmin from '../Components/SidebarAdmin';
import LogoSarenOne from '../Images/LogoSarenOne.png';
import { connect } from 'react-redux';


class HomeAdmin extends Component {

    state = {}

    render() {
        return (
            <div>
                <SidebarAdmin />
                <div style={{ marginLeft: '15%' }}>
                    <div class="w3-container w3-teal">
                        <center>
                            <h1>Hallo admin, {this.props.username}</h1>
                        </center>
                    </div>
                    <center>
                        <img src={LogoSarenOne} alt="Car" style={{ width: '25%' }} />
                    </center>
                    <div class="w3-container">

                    </div>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({user}) => {
    return{
        username: user.username
    }
}

export default connect(mapStatetoProps)(HomeAdmin);