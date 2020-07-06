import React, { Component } from 'react';
import SidebarAdmin from '../Components/SidebarAdmin';
import { getAllProductComplete } from '../Redux/Actions';
import { connect } from 'react-redux';
import { MDBRow, MDBCol, MDBBtn, MDBIcon, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { API_URL_1 } from '../Helpers/API_URL';
import '../CSS/PaginationNumber.css'


class ManageProduct extends Component {

    state = {
        offset: 0,
        currentPage: 1,
        modal: false,

        productDesc: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount(choosenOffset) {
        let newoffset = this.state.offset
        this.props.getAllProductComplete(newoffset, choosenOffset);
    }

    productDescription = (desc) => {
        if (desc) {
            var resultsDesc = []
            var arrSplit = desc.split(' ');
            for (var i = 0; i < 4; i++) {
                resultsDesc.push(arrSplit[i])
            }
            return resultsDesc.join(' ')
        }
    }

    renderPaginationProduct = () => {
        let page = [];
        for (var i = 0; i < 5; i++) {
            page.push({ number: i })
        }
        return page.map((item) => {
            return (
                <a href="#" style={{ marginTop: 2 }} className={(this.state.currentPage === page ? 'active' : '') + 'controls'} key={page} id={page}
                    onClick={() => {
                        this.props.getAllProductComplete(item.number === 0 ? item.number : item.number * 5)
                        this.setState({ offset: item.number })
                    }}
                >{item.number + 1}</a>
            )
        })
    }

    renderGetProduct = () => {
        return this.props.dataProduct.map((item, index) => {
            return (
                <tr className="text-center">
                    <td>{item.categoryname}</td>
                    <td>{item.productname}</td>
                    <td><img src={API_URL_1 + item.productimage} alt="imageProduct" style={{ height: 30, width: 60 }} /></td>
                    <td>
                        <div onClick={() => this.setState({ productDesc: item.productdescription })}>{this.productDescription(item.productdescription)}<a onClick={this.toggle} style={{ cursor: 'pointer', backgroundColor: 'silver', padding:5}}>...</a>
                            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                <MDBModalBody>
                                    {this.state.productDesc}
                                </MDBModalBody>
                            </MDBModal>
                        </div>
                    </td>
                    <td>{item.weightlist} gr</td>
                    <td> {item.pricelist === null ? '' : <div>Rp. {item.pricelist.toLocaleString()},-  </div>} </td>
                    <td>{item.totalstock}</td>
                </tr>
            )
        })
    }

    render() {
        let { offset } = this.state;
        return (
            <div>
                <SidebarAdmin />
                <div style={{ marginLeft: '15%' }}>
                    <div class="w3-container w3-teal">
                        <center>
                            <h1>KELOLA PRODUK</h1>
                        </center>
                    </div>
                    <center>
                        <MDBRow style={{ margin: 30 }}>
                            <MDBCol size="3"><MDBBtn href="manageallproduct">Semua Produk</MDBBtn></MDBCol>
                            <MDBCol size="3"><MDBBtn href="manageproducts" color="white">Kelola Produk</MDBBtn></MDBCol>
                            <MDBCol size="3"><MDBBtn href="managecategories" color="white">Kelola Kategori</MDBBtn></MDBCol>
                            <MDBCol size="3"><MDBBtn href="manageweightlist" color="white">Kelola List</MDBBtn></MDBCol>
                        </MDBRow>
                    </center>
                    <div class="w3-container">
                        <div className="container">
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col"><div className="d-flex justify-content-center">KATEGORI </div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">NAMA</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">GAMBAR</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">DESKRIPSI</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">BERAT</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">HARGA</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">STOK</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderGetProduct()}
                                </tbody>
                            </table>
                            <center>
                                <div className="pagination d-flex justify-content-center" style={{ marginTop: 50 }}>
                                    <div className="row">
                                        <a href="#" onClick={() => {
                                            this.props.getAllProductComplete((offset - 1) * 5)
                                            this.setState({ offset: offset === 0 ? offset : offset - 1 })
                                        }
                                        } style={{ fontSize: 20 }}><MDBIcon icon="angle-double-left" size="lg" />
                                        </a>
                                        {this.renderPaginationProduct()}
                                        <a href="#" onClick={() => {
                                            this.props.getAllProductComplete((offset + 1) * 5)
                                            this.setState({ offset: offset === 5 ? offset : offset + 1 })
                                        }
                                        } style={{ fontSize: 20 }}><MDBIcon icon="angle-double-right" size="lg" />
                                        </a>
                                    </div>
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({ products }) => {
    return {
        dataProduct: products.dataProduct
    }
}

export default connect(mapStatetoProps, { getAllProductComplete })(ManageProduct);