import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { API_URL_1 } from '../../Helpers/API_URL';
import { MDBIcon, MDBRow, MDBCol } from 'mdbreact';
import './NavbarHome.css';


class CartNavbar extends Component {

    state = {
        dataQtyCart: []
    }

    componentDidMount() {
        this.getQtyCart();
    }

    getQtyCart = async () => {
        const token = localStorage.getItem('token')
        const res = await Axios.get(API_URL_1 + `cart/getQtyCart`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        this.setState({ dataQtyCart: res.data })
    }

    renderCart = () => {
        return this.state.dataQtyCart.map((item, index) => {
            return (
                <div key={index}>
                    {item.totalQty === null ? 0 : item.totalQty}
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                {
                    this.props.iduser === 0
                        ?
                        ''
                        :
                        <div id="cart-Navbar">
                            <div>
                                <MDBIcon icon="shopping-cart" size="md" />
                            </div>
                            <div id="qty-Cart" > {this.renderCart()} </div>
                        </div>
                }
            </div>
        );
    }
}

const mapStatetoProps = ({ user }) => {
    return {
        iduser: user.iduser
    }
}


export default connect(mapStatetoProps)(CartNavbar);