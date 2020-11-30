import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SidebarAdmin from '../../Components/Navbar/SidebarAdmin';
import { getTransactionProcess, editStatusTransaction, deleteTransaction } from '../../Redux/Actions';
import { MDBIcon, MDBModal, MDBModalHeader, MDBModalBody } from 'mdbreact';
import { API_URL_1 } from '../../Helpers/API_URL';
import Axios from 'axios';
import './StatusTransaction.css';


class ProcessTransaction extends Component {

    state = {
        dataCartTransaction: [],

        newStatusTransaction: '',
        usernameCheck: '',
        datatimeCheck: '',

        search: '',

        selectStatus: false,
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
        this.props.getTransactionProcess();
        this.getCartTransaction();
    }

    getCartTransaction = async () => {
        const res = await Axios.get(API_URL_1 + `transaction/getTransactionDetailProcess`)
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
        this.props.deleteTransaction(datetime)
    }

    renderDetailImageTransaction = () => {
        return this.props.dataTransactionProcess.map((item, index) => {
            if (this.state.datetimeCheck === item.datetime && this.state.usernameCheck === item.username) {

                return (
                    <div key={index}>
                        <img src={API_URL_1 + item.imagetransaction} alt="img-transaction" width="400px" />
                    </div>
                )
            } return (
                <></>
            )
        })
    }

    renderDetailCart = () => {
        return this.state.dataCartTransaction.map((item, index) => {
            if (this.state.datetimeCheck === item.datetime && this.state.usernameCheck === item.username) {
                return (
                    <div className="section-check-transaction" key={index}>
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
            } return (
                <></>
            )
        })
    }

    renderDetailTransaction = () => {
        return this.props.dataTransactionProcess.map((item, index) => {
            if (this.state.datetimeCheck === item.datetime && this.state.usernameCheck === item.username) {
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
            } else {
                return <></>
            }
        })
    }

    renderGetTransactionProcess = () => {
        let filteredDate = this.props.dataTransactionProcess.filter(
            (item) => {
                return item.datetime.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            }
        )
        return (
            filteredDate.map((item, index) => {
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
                            <div className="btn-action-transaction">
                                <div className="btn-action-process-transaction" onClick={() => this.editStatusTransaction(item.datetime)}>
                                    <MDBIcon icon="check" />
                                </div>
                                <div className="btn-action-process-transaction" onClick={() => this.deleteTransaction(item.datetime)}>
                                    <MDBIcon icon="trash" size="sm" />
                                </div>
                            </div>
                        </td>
                    </tr>
                )
            })
        )
    }

    render() {
        return (
            <div>
                <SidebarAdmin />
                <div style={{ marginLeft: '15%' }}>
                    <div className="w3-container w3-teal">
                        <div className="title-status-transaction">KELOLA TRANSAKSI</div>
                    </div>
                    <div className="section-status-transaction">
                        <Link className="fail-status" to="transactionfail">
                            BELUM BAYAR
                        </Link>
                        <Link className="process-status-checked" to="transactionprocess">
                            DALAM PROSES
                        </Link>
                        <Link className="success-status" to="transactionsuccess">
                            SUDAH BAYAR
                        </Link>
                    </div>
                    <div className="w3-container">
                        <div className="container">
                            <form className="form-search-admin">
                                <input type="text" className="form-control" placeholder="Cari sesuai tanggal &amp; jam" onChange={(e) => this.setState({
                                    search: e.target.value
                                })} />
                            </form>
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
                                    {this.renderGetTransactionProcess()}
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
        dataTransactionProcess: transactionstatus.dataTransactionProcess
    }
}

export default connect(mapStatetoProps, { getTransactionProcess, editStatusTransaction, deleteTransaction })(ProcessTransaction);