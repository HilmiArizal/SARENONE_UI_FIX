import { MDBCard, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllAdminOnly } from '../../Redux/Actions';
import SidebarAdmin from '../../Components/Navbar/SidebarAdmin';
import { API_URL_1 } from '../../Helpers/API_URL';
import AkunImage from '../../Images/AkunImage.png';
import './ProfileAdmin.css';


class ProfileAdmin extends Component {

    state = {}

    componentDidMount() {
        this.props.getAllAdminOnly();
    }

    renderProfileAdmin = () => {

    }

    renderUser = () => {
        return this.props.dataAdmin_Only.map((item, index) => {
            return (
                <MDBCol>
                    <div className="sub-section-card-admin">
                        <div><img src={AkunImage} className="img-account" alt="img-account" /></div>
                        <div className="title-name-admin">{item.username}</div>
                        <div className="title-email-admin">{item.email}</div>
                    </div>
                </MDBCol>
            )
        })
    }

    renderProducts = () => {
        return this.props.dataProduct.map((item, index) => {
            return (
                <MDBCol className="card-section-admin" key={index}>
                    <MDBCard>
                        <img src={API_URL_1 + item.productimage} alt="product-img" className="product-img-admin" />
                    </MDBCard>
                </MDBCol>
            )
        })
    }

    render() {
        return (
            <div>
                <SidebarAdmin />
                <div style={{ marginLeft: '15%' }}>
                    <div class="w3-container w3-teal">
                        <div className="w3-container w3-teal">
                            <div className="title-profile-admin">PROFILE SARENONE</div>
                        </div>
                    </div>
                    <div className="card-section-admin">
                        <MDBContainer>
                            <MDBRow>
                                {this.renderUser()}
                            </MDBRow>
                        </MDBContainer>
                    </div>
                    <MDBRow>
                        {/* {this.renderProducts()} */}
                    </MDBRow>
                </div>
            </div>
        );
    }
}


const mapStatetoProps = ({ admin, products }) => {
    return {
        dataAdmin_Only: admin.dataAdmin_Only,
        dataProduct: products.dataProduct
    }
}

export default connect(mapStatetoProps, { getAllAdminOnly })(ProfileAdmin);