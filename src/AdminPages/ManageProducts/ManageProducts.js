import React, { Component } from 'react';
import { connect } from 'react-redux';
import SidebarAdmin from '../../Components/Navbar/SidebarAdmin';
import { getAllProductComplete, deleteProduct } from '../../Redux/Actions';
import { API_URL_1 } from '../../Helpers/API_URL';
import { MDBCol, MDBIcon, MDBModal, MDBModalBody, MDBRow } from 'mdbreact';
import './PaginationNumber.css';
import './ManageProducts.css';
import { Link } from 'react-router-dom';


class ManageProducts extends Component {

    state = {
        offset: 0,
        currentPage: 1,


        modal: false,

        simpleProductDescription: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount(choosenOffset) {
        let newoffset = this.state.offset;
        this.props.getAllProductComplete(newoffset, choosenOffset);
    }

    productDescription = (desc) => {
        if (desc) {
            var resultsProductDescription = []
            var arrSplit = desc.split(' ');
            for (var i = 0; i < 4; i++) {
                resultsProductDescription.push(arrSplit[i])
            }
            return resultsProductDescription.join(' ')
        }
    }

    deleteProducts = (idproduct, idstock, choosenOffset) => {
        let newoffset = this.state.offset;
        this.props.deleteProduct(idproduct, idstock, newoffset, choosenOffset)
    }

    renderPaginationProduct = () => {
        let page = [];
        for (var i = 0; i < 5; i++) {
            page.push({ number: i })
        }
        return page.map((item) => {
            return (
                <Link style={{ marginTop: 2 }} className={(this.state.currentPage === page ? 'active' : '') + 'controls'} key={page} id={page}
                    onClick={() => {
                        this.props.getAllProductComplete(item.number === 0 ? item.number : item.number * 5)
                        // this.props.deleteProducts(item.number === 0 ? item.number : item.number * 5)
                        this.setState({ offset: item.number })
                    }}
                >{item.number + 1}</Link>
            )
        })
    }

    renderGetProduct = () => {
        return this.props.dataProduct.map((item, index) => {
            return (
                <tr className="tbody-products-manage">
                    <td><div className="td-products-manage">{index + 1}</div></td>
                    <td>
                        <div className="td-products-manage">
                            <img src={API_URL_1 + item.productimage} alt="imageProduct" style={{ height: 60 }} />
                        </div>
                    </td>
                    <td><div className="td-products-manage">{item.categoryname}</div></td>
                    <td><div className="td-products-manage">{item.productname}</div></td>
                    <td>
                        <div className="section-modal-product-description">
                            <div className="modal-product-description" >{this.productDescription(item.productdescription)}
                            </div>
                            <div className="point-modal-product-description" onClick={() => this.setState({ simpleProductDescription: item.productdescription, modal: true })}>
                                ...
                        </div>
                        </div>

                        <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg" centered>
                            <MDBModalBody>
                               <div style={{ fontSize:'150%'}}> {this.state.simpleProductDescription}</div>
                            </MDBModalBody>
                        </MDBModal>
                    </td>
                    <td><div className="td-products-manage">{item.weightlist} gr</div></td>
                    <td> <div className="td-products-manage">{item.pricelist === null ? '' : <div>Rp. {item.pricelist.toLocaleString()},-  </div>} </div></td>
                    <td><div className="td-products-manage">{item.totalstock}</div></td>
                    <td>
                        <div>
                            <Link to={`editproducts?idproduct=${item.idproduct}`}>

                                <div className="btn-action-products-manage">UBAH</div>
                            </Link>
                            <div className="btn-action-products-manage" onClick={() => this.deleteProducts(item.idproduct, item.idstock)}>HAPUS</div>
                        </div>
                    </td>
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
                        <div className="w3-container w3-teal">
                            <div className="title-products-manage">KELOLA PRODUK</div>
                        </div>
                    </div>
                    <div class="w3-container">
                        <div className="container" style={{ marginTop: 25 }}>
                            <MDBRow>
                                <MDBCol size="4">
                                    <div className="icon-add-products">
                                        <Link to="managecategories">
                                            KELOLA KATEGORI
                                        </Link>
                                    </div>
                                </MDBCol>
                                <MDBCol size="4">
                                    <div className="icon-add-products">
                                        <Link to="addproducts">
                                            TAMBAH PRODUK
                                        </Link>
                                    </div>
                                </MDBCol>
                                <MDBCol size="4">
                                    <div className="icon-add-products">
                                        <Link to="managepriceweight">
                                            KELOLA HARGA &amp; BERAT
                                        </Link>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                            <table class="table table-sm">
                                <thead>
                                    <tr className="thead-products-manage">
                                        <th scope="col"><div className="d-flex justify-content-center">NO </div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">GAMBAR</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">KATEGORI </div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">NAMA</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">DESKRIPSI</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">BERAT</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">HARGA</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">STOK</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">AKSI</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderGetProduct()}
                                </tbody>
                            </table>
                            <div className="section-pagination">
                                <div className="pagination d-flex justify-content-center">
                                    <div className="row">
                                        <Link onClick={() => {
                                            this.props.getAllProductComplete((offset - 1) * 5)
                                            this.setState({ offset: offset === 0 ? offset : offset - 1 })
                                        }
                                        } style={{ fontSize: 20 }}><MDBIcon icon="angle-double-left" size="lg" />
                                        </Link>
                                        {this.renderPaginationProduct()}
                                        <Link onClick={() => {
                                            this.props.getAllProductComplete((offset + 1) * 5)
                                            this.setState({ offset: offset === 5 ? offset : offset + 1 })
                                        }
                                        } style={{ fontSize: 20 }}><MDBIcon icon="angle-double-right" size="lg" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
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

export default connect(mapStatetoProps, { getAllProductComplete, deleteProduct })(ManageProducts);