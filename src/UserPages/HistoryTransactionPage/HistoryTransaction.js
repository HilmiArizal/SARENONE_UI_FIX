import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactionHistory } from '../../Redux/Actions';
import Axios from 'axios';
import { API_URL_1 } from '../../Helpers/API_URL';
import NavbarOther from '../../Components/Navbar/NavbarOther';
import { MDBContainer, MDBModal, MDBModalHeader, MDBModalBody } from 'mdbreact';
import '../HistoryTransactionPage/HistoryTransaction.css';
import Footer from '../../Components/Footer/Footer';


class HistoryTransaction extends Component {

    state = {
        dataHistoryTransaction: [],

        timeTransaction: '',

        modal: false
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        this.props.getTransactionHistory();
        this.getDetailTransactionHistory();
        window.scrollTo(0, 0);
    }

    getDetailTransactionHistory = async () => {
        let userId = this.props.iduser;
        const res = await Axios.get(API_URL_1 + `transaction/getDetailTransaction?userId=${userId}`)
        this.setState({ dataHistoryTransaction: res.data })
    }

    renderDetailTransactionHistory = () => {
        return this.state.dataHistoryTransaction.map((item, index) => {
            if (this.state.timeTransaction === item.datetime) {
                return (
                    <tr className="text-center">
                        <td>{item.productname}</td>
                        <td>{item.pricelist.toLocaleString()}</td>
                        <td>{item.weightlist} gr</td>
                        <td>{item.qty} pack</td>
                        <td>{item.totalprice.toLocaleString()}</td>
                    </tr>
                )
            } else {
                return (
                    <div></div>
                )
            }
        })
    }

    renderHistoryTransaction = () => {
        return this.props.dataTransactionHistory.map((item, index) => {
            return (
                <tr className="tbody-transaction-history">
                    <td>{index + 1}</td>
                    <td>{item.datetime}</td>
                    <td>Rp. {item.totaltransaction.toLocaleString()},-</td>
                    <td>{item.statustransaction === 'Sudah Bayar' ? 'Dalam Pengiriman' : item.statustransaction}</td>
                    <td>{item.transactionId}</td>
                    <td>
                        <div className="btn-cart-history-transaction" onClick={() => { this.toggle(); this.setState({ timeTransaction: item.datetime }) }}>LIHAT DETAIL</div>
                        <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                            <MDBModalHeader toggle={this.toggle}>DETAIL BELANJA</MDBModalHeader>
                            <MDBModalBody>
                                <table class="table table-sm">
                                    <thead>
                                        <tr className="table-head-history-transaction">
                                            <th scope="col">Nama Produk</th>
                                            <th scope="col">Harga </th>
                                            <th scope="col">Berat</th>
                                            <th scope="col">Kuantitas</th>
                                            <th scope="col">Total Harga</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderDetailTransactionHistory()}
                                    </tbody>
                                </table>
                            </MDBModalBody>
                        </MDBModal>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="body-history-transaction">
                <div style={{ marginTop: 70 }}>
                    <NavbarOther />
                </div>
                <MDBContainer>
                    <div className="title-history-transaction"> RIWAYAT TRANSAKSI</div>
                    <div className="card-history-transaction">
                        {
                            this.props.dataTransactionHistory.length > 0
                                ?
                                <table class="table table-sm">
                                    <thead>
                                        <tr className="table-head-history-transaction" >
                                            <th scope="col">No.</th>
                                            <th scope="col">Jam &amp; Tanggal Transaksi</th>
                                            <th scope="col">Total Transaksi </th>
                                            <th scope="col">Status Transaksi </th>
                                            <th scope="col">Kode Transaksi </th>
                                            <th scope="col">Detail Belanja</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderHistoryTransaction()}
                                    </tbody>
                                </table>
                                :
                                <center>
                                    Belum ada transaksi
                            </center>
                        }
                    </div>
                </MDBContainer>
                <Footer />
            </div>
        );
    }
}

const mapStatetoProps = ({ user, transactionhistory }) => {
    return {
        iduser: user.iduser,
        username: user.username,
        dataTransactionHistory: transactionhistory.dataTransactionHistory
    }
}

export default connect(mapStatetoProps, { getTransactionHistory })(HistoryTransaction);