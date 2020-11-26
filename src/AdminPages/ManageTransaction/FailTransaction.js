import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTransactionFail, editStatusTransaction, deleteTransaction } from '../../Redux/Actions';
import Axios from 'axios';
import { API_URL_1 } from '../../Helpers/API_URL';
import SidebarAdmin from '../../Components/SidebarAdmin';
import { MDBIcon, MDBModal, MDBModalHeader, MDBModalBody } from 'mdbreact';
import './StatusTransaction.css';


class FailTransaction extends Component {

    state = {
        dataTransactionFail: [],
        dataCartTransaction: [],

        newStatusTransaction: '',
        timeTransaction: '',

        modal1: false,
        modal2: false,
        modal3: false
    }

    toggle1 = () => {
        this.setState({
            modal1: !this.state.modal1
        });
    }

    toggle2 = () => {
        this.setState({
            modal2: !this.state.modal2
        });
    }

    toggle3 = () => {
        this.setState({
            modal3: !this.state.modal3
        });
    }

    componentDidMount() {
        this.props.getTransactionFail();
        this.getTransactionDetailFail();
    }

    getTransactionDetailFail = async () => {
        const res = await Axios.get(API_URL_1 + `transaction/getTransactionDetailFail`)
        this.setState({ dataCartTransaction: res.data })
    }

    editStatusTransaction = (datetime) => {
        let statustransaction = this.state.newStatusTransaction;
        let datatransaction = { statustransaction };
        if (statustransaction === '') {
            alert('Maaf anda belum memilih status transaksi!')
        } else {
            this.props.editStatusTransaction(datetime, datatransaction)
            alert('Status transaksi berhasil di ubah')
        }
    }

    deleteTransaction = (datetime) => {
        this.props.deleteTransaction(datetime);
        this.getTransactionFail();
    }

    renderDetailImageTransaction = () => {
        return this.props.dataTransactionFail.map((item, index) => {
            if (this.state.datetimeCheck === item.datetime && this.state.usernameCheck === item.username)
                return (
                    <div>
                        <img src={API_URL_1 + item.imagetransaction} alt="img-transaction" width="400px" />
                    </div>
                )
        })
    }

    renderDetailCart = () => {
        return this.state.dataCartTransaction.map((item, index) => {
            if (this.state.datetimeCheck === item.datetime && this.state.usernameCheck === item.username)
                return (
                    <div className="section-check-transaction">
                        <div>
                            <label>Nama Produk</label>
                            <span>: {item.productname}</span>
                        </div>
                        <div>
                            <label>Kategori Produk</label>
                            <span>: {item.categoryname}</span>
                        </div>
                        <div>
                            <label>Berat Produk</label>
                            <span>: {item.weightlist}gr</span>
                        </div>
                        <div>
                            <label>Harga Produk</label>
                            <span>: Rp. {item.pricelist.toLocaleString()},-</span>
                        </div>
                        <div>
                            <label>Kuantitas Produk</label>
                            <span>: {item.qty} pack</span>
                        </div>
                        <div>
                            <label>Total Harga Produk</label>
                            <span>: Rp. {item.totalprice.toLocaleString()},-</span>
                        </div>
                    </div>
                )
        })
    }

    renderDetailTransaction = () => {
        return this.props.dataTransactionFail.map((item, index) => {
            if (this.state.datetimeCheck === item.datetime && this.state.usernameCheck === item.username)
                return (
                    <div className="section-check-transaction">
                        <div>
                            <label>Nama Pembeli</label>
                            <span>: {item.name}</span>
                        </div>
                        <div>
                            <label>Alamat Pembeli</label>
                            <span>: {item.address}</span>
                        </div>
                        <div>
                            <label>Phone Number/WA</label>
                            <span>: {item.phonenumber}</span>
                        </div>
                        <div>
                            <label>Ekspedisi</label>
                            <span>: {item.expedition}</span>
                        </div>
                        <div>
                            <label>Keterangan</label>
                            <span>: {item.description}</span>
                        </div>
                        <div>
                            <label>Bank</label>
                            <span>: {item.bankname + ' -> ' + item.rekeningname}</span>
                        </div>
                        <div>
                            <label>Total Transaksi</label>
                            <span>: Rp. {item.totaltransaction.toLocaleString()},-</span>
                        </div>
                    </div>
                )
        })
    }

    renderGetTransactionFail = () => {
        return this.props.dataTransactionFail.map((item, index) => {
            return (
                <tr key={index} className="tbody-process-transaction">
                    <td>{index + 1}</td>
                    <td>
                        <div>
                            <div className="btn-modal-detail-cart" onClick={() => { this.toggle1(); this.setState({ usernameCheck: item.username, datetimeCheck: item.datetime }) }}>CLICK</div>
                            <MDBModal isOpen={this.state.modal1} toggle={this.toggle1} size="lg">
                                <MDBModalHeader toggle={this.toggle1}></MDBModalHeader>
                                <MDBModalBody>
                                    {this.renderDetailCart()}
                                </MDBModalBody>
                            </MDBModal>
                        </div>
                    </td>
                    <td>
                        <div>
                            <div className="btn-modal-detail-transaction" onClick={() => { this.toggle2(); this.setState({ usernameCheck: item.username, datetimeCheck: item.datetime }) }}>CLICK</div>
                            <MDBModal isOpen={this.state.modal2} toggle={this.toggle2} size="lg">
                                <MDBModalHeader toggle={this.toggle2}></MDBModalHeader>
                                <MDBModalBody>
                                    {this.renderDetailTransaction()}
                                </MDBModalBody>
                            </MDBModal>
                        </div>
                    </td>
                    <td>{item.username.toUpperCase()}</td>
                    <td>{item.datetime}</td>
                    <td>Rp. {item.totaltransaction.toLocaleString()},- </td>
                    <td>
                        <div>
                            <div className="btn-modal-detail-transaction" onClick={() => { this.toggle3(); this.setState({ usernameCheck: item.username, datetimeCheck: item.datetime }) }}>CLICK</div>
                            <MDBModal isOpen={this.state.modal3} toggle={this.toggle3} size="lg">
                                <MDBModalBody>
                                    {this.renderDetailImageTransaction()}
                                </MDBModalBody>
                            </MDBModal>
                        </div>
                    </td>
                    <td>
                        <div>
                            {item.transactionId}
                        </div>
                    </td>
                    <td>
                        <div className="section-select-status">
                            {
                                this.state.datatimeCheck === item.datetime
                                    ?
                                    <div>
                                        <select onChange={(e) => this.setState({ newStatusTransaction: e.target.value })} >
                                            <option selected hidden disabled>{item.statustransaction}</option>
                                            <option>Belum Bayar</option>
                                            <option>Dalam Proses</option>
                                            <option>Sudah Bayar</option>
                                        </select>
                                        < MDBIcon icon="undo-alt" className="icon-select-status" onClick={() => this.setState({ datatimeCheck: '' })} />
                                    </div>
                                    :
                                    <div>
                                        {item.statustransaction}
                                        <MDBIcon icon="edit" className="icon-select-status" onClick={() => this.setState({ datatimeCheck: item.datetime })} />
                                    </div>
                            }
                            <div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="row">
                            <div className="col-6">
                                <div className="btn-action-process-transaction" onClick={() => this.editStatusTransaction(item.datetime)}>
                                    <MDBIcon icon="check" style={{ color: 'white' }} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="btn-action-process-transaction" onClick={() => this.deleteTransaction(item.datetime)}>
                                    <MDBIcon icon="trash" size="sm" style={{ color: 'white' }} />
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <SidebarAdmin />
                <div style={{ marginLeft: '15%' }}>
                    <div className="w3-container w3-teal">
                        <div className="w3-container w3-teal">
                            <div className="title-status-transaction">KELOLA TRANSAKSI</div>
                        </div>
                    </div>
                    <div className="section-status-transaction">
                        <Link className="fail-status-checked" to="transactionfail">
                            BELUM BAYAR
                        </Link>
                        <Link className="process-status" to="transactionprocess">
                            DALAM PROSES
                        </Link>
                        <Link className="success-status" to="transactionsuccess">
                            SUDAH BAYAR
                        </Link>
                    </div>
                    <div className="w3-container">
                        <div className="container">
                            <table className="table table-sm">
                                <thead>
                                    <tr className="thead-process-transaction">
                                        <th scope="col"><div className="d-flex justify-content-center">NO. </div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">DETAIL BELANJA</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">DETAIL TRANSAKSI</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">USERNAME</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">TGL &amp; JAM TRANSAKSI</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">TOTAL TRANSAKSI</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">BUKTI TRANSAKSI</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">KODE TRANSAKSI</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">STATUS TRANSAKSI</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">AKSI</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderGetTransactionFail()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStatetoProps = ({ transactionstatus }) => {
    return {
        dataTransactionFail: transactionstatus.dataTransactionFail
    }
}

export default connect(mapStatetoProps, { getTransactionFail, editStatusTransaction, deleteTransaction })(FailTransaction);
