import React, { Component } from 'react';
import SidebarAdmin from '../../Components/Navbar/SidebarAdmin';
import { MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux';
import { getWeight, getPrice, addWeight, editWeight, deleteWeight, addPrice, editPrice, deletePrice } from '../../Redux/Actions';


class ManagePriceWeight extends Component {

    state = {
        selectIdInputWeight: null,
        selectIdInputPrice: null
    }

    componentDidMount() {
        this.props.getWeight();
        this.props.getPrice();
    }

    addWeight = () => {
        let weightlist = this.refs.weightlist.value;
        let dataweight = {
            weightlist: parseInt(weightlist)
        }
        if (weightlist) {
            this.props.addWeight(dataweight);
        } else {
            alert('Isi dengan benar')
        }
    }

    editWeight = (idweight) => {
        let weightlist = this.refs.weightlist.value;
        let dataweight = {
            weightlist: parseInt(weightlist)
        }
        if (weightlist) {
            this.props.editWeight(idweight, dataweight)
            this.setState({ selectIdInputWeight: null })
        } else {
            alert('Isi dengan benar')
        }
    }

    deleteWeight = (idweight) => {
        this.props.deleteWeight(idweight);
    }

    addPrice = () => {
        let pricelist = this.refs.pricelist.value;
        let dataprice = {
            pricelist: parseInt(pricelist)
        }
        if (pricelist) {
            this.props.addPrice(dataprice);
        } else {
            alert('Isi dengan benar')
        }
    }

    editPrice = (idprice) => {
        let pricelist = this.refs.pricelist.value;
        let dataprice = {
            pricelist: parseInt(pricelist)
        }
        if (pricelist) {
            this.props.editPrice(idprice, dataprice)
            this.setState({ selectIdInputPrice: null })
        } else {
            alert('Isi dengan benar')
        }
    }

    deletePrice = (idprice) => {
        this.props.deletePrice(idprice);
    }

    renderInputEditDeleteWeight = () => {
        const { selectIdInputWeight } = this.state;
        return this.props.dataWeight.map((item, index) => {
            if (selectIdInputWeight === index) {
                return (
                    <tr className="text-center">
                        <td>{index + 1}</td>
                        <td>
                            <center><input type="number" className="form-control" ref="weightlist" defaultValue={item.weightlist} style={{ width: 80, fontSize: 12 }} /></center></td>
                        <td>
                            <MDBBtn size="sm" color="primary" onClick={() => this.setState({ selectIdInputWeight: null })}>Batal</MDBBtn>
                            <MDBBtn size="sm" onClick={() => this.editWeight(item.idweight)}>Simpan</MDBBtn>
                        </td>
                    </tr>
                )
            }
            return (
                <tr className="text-center">
                    <td>{index + 1}</td>
                    <td>{item.weightlist}</td>
                    <td>
                        <MDBBtn size="sm" color="primary" onClick={() => this.setState({ selectIdInputWeight: index })}>Ubah</MDBBtn>
                        <MDBBtn size="sm" color="danger" onClick={() => this.deleteWeight(item.idweight)}>Hapus</MDBBtn>
                    </td>
                </tr>
            )
        })
    }

    renderInputEditDeletePrice = () => {
        const { selectIdInputPrice } = this.state;
        return this.props.dataPrice.map((item, index) => {
            if (selectIdInputPrice === index) {
                return (
                    <tr className="text-center">
                        <td>{index + 1}</td>
                        <td>
                            <center><input type="number" className="form-control" ref="pricelist" defaultValue={item.pricelist} style={{ width: 80, fontSize: 12 }} /></center></td>
                        <td>
                            <MDBBtn size="sm" color="primary" onClick={() => this.setState({ selectIdInputPrice: null })}>Batal</MDBBtn>
                            <MDBBtn size="sm" onClick={() => this.editPrice(item.idprice)}>Simpan</MDBBtn>
                        </td>
                    </tr>
                )
            }
            return (
                <tr className="text-center">
                    <td>{index + 1}</td>
                    <td>{item.pricelist}</td>
                    <td>
                        <MDBBtn size="sm" color="primary" onClick={() => this.setState({ selectIdInputPrice: index })}>Ubah</MDBBtn>
                        <MDBBtn size="sm" color="danger" onClick={() => this.deletePrice(item.idprice)}>Hapus</MDBBtn>
                    </td>
                </tr>
            )
        })
    }

    renderInputAddWeight = () => {
        return (
            <tr className="text-center">
                <td><MDBIcon icon="plus" /></td>
                <td><center><input type="number" className="form-control" ref="weightlist" placeholder="Tambah Berat" style={{ width: 140, fontSize: 12 }} /></center></td>
                <td>
                    <MDBBtn size="sm" color="elegant" onClick={this.addWeight} >TAMBAH</MDBBtn>
                </td>
            </tr>
        )
    }

    renderInputAddPrice = () => {
        return (
            <tr className="text-center">
                <td><MDBIcon icon="plus" /></td>
                <td><center><input type="number" className="form-control" ref="pricelist" placeholder="Tambah Berat" style={{ width: 140, fontSize: 12 }} /></center></td>
                <td>
                    <MDBBtn size="sm" color="elegant" onClick={this.addPrice} >TAMBAH</MDBBtn>
                </td>
            </tr>
        )
    }

    render() {
        return (
            <div>
                <SidebarAdmin />
                <div style={{ marginLeft: '15%' }}>
                    <div class="w3-container w3-teal">
                        <div className="w3-container w3-teal">
                            <div className="title-products-manage">KELOLA HARGA &amp; BERAT</div>
                        </div>
                    </div>
                    <MDBRow style={{ marginTop: 50 }}>
                        <MDBCol size="6">
                            <div class="w3-container">
                                <div className="container">
                                    <div className="title-weight">LIST HARGA</div>
                                    <table class="table table-sm">
                                        <thead>
                                            <tr className="thead-products-manage">
                                                <th scope="col">NO. </th>
                                                <th scope="col">NAMA HARGA</th>
                                                <th scope="col">AKSI</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderInputEditDeletePrice()}
                                        </tbody>
                                        <tfoot>
                                            {this.renderInputAddPrice()}
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </MDBCol>
                        <MDBCol size="6">
                            <div class="w3-container" >
                                <div className="container">
                                    <div className="title-weight">LIST BERAT</div>
                                    <table class="table table-sm">
                                        <thead>
                                            <tr className="thead-products-manage">
                                                <th scope="col">NO. </th>
                                                <th scope="col">NAMA BERAT</th>
                                                <th scope="col">AKSI</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderInputEditDeleteWeight()}
                                        </tbody>
                                        <tfoot>
                                            {this.renderInputAddWeight()}
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({ weight, price }) => {
    return {
        dataWeight: weight.dataWeight,
        dataPrice: price.dataPrice
    }
}

export default connect(mapStatetoProps, { getWeight, getPrice, addWeight, editWeight, deleteWeight, addPrice, editPrice, deletePrice })(ManagePriceWeight);