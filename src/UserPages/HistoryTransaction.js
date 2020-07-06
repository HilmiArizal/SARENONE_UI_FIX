import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactionHistory } from '../Redux/Actions';
import NavbarWithout from '../Components/NavbarWithout';
import { MDBContainer, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdbreact';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';


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
    }

    getDetailTransactionHistory = async () => {
        let token = localStorage.getItem('token')
        const res = await Axios.get(API_URL_1 + `transaction/getDetailTransaction`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        this.setState({ dataHistoryTransaction: res.data })
    }

    renderDetailTransactionHistory = () => {
        return this.state.dataHistoryTransaction.map((item, index) => {
            if (this.state.timeTransaction === item.timetransaction)
                return (
                    <tr className="text-center">
                        <td>{item.productname}</td>
                        <td>{item.pricelist.toLocaleString()}</td>
                        <td>{item.weightlist} gr</td>
                        <td>{item.qty} pack</td>
                        <td>{item.totalprice.toLocaleString()}</td>
                    </tr>
                )
        })
    }

    renderHistoryTransaction = () => {
        return this.props.dataTransactionHistory.map((item, index) => {
            return (
                <tr className="text-center">
                    <td>{index + 1}</td>
                    <td>{item.transactiondate} - {item.transactiontime}</td>
                    <td>{item.name}</td>
                    <td>Rp. {item.totaltransaction.toLocaleString()}</td>
                    <td>{item.statustransaction}</td>
                    <td><div style={{ backgroundColor: 'black', color: 'white', cursor: 'pointer', borderRadius: 50 }} onClick={() => { this.toggle(); this.setState({ timeTransaction: item.transactiontime }) }}>LIHAT DETAIL</div>
                        <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                            <MDBModalHeader toggle={this.toggle}>DETAIL BELANJA</MDBModalHeader>
                            <MDBModalBody>
                                <table class="table table-sm">
                                    <thead>
                                        <tr className="text-center">
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
        console.log(this.state.dataHistoryTransaction)
        console.log(this.state.timeTransaction)
        return (
            <div>
                <NavbarWithout />
                <MDBContainer>
                    <div className="text-center" style={{ fontSize: 50 }}>RIWAYAT TRANSAKSI</div>
                    {
                        this.props.dataTransactionHistory.length > 0
                            ?
                            <table class="table table-sm">
                                <thead>
                                    <tr className="text-center">
                                        <th scope="col">No.</th>
                                        <th scope="col">Jam &amp; Tanggal Transaksi</th>
                                        <th scope="col">Nama Transaksi</th>
                                        <th scope="col">Total Transaksi </th>
                                        <th scope="col">Status Transaksi </th>
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
                </MDBContainer>
            </div>
        );
    }
}

const mapStatetoProps = ({ user, transactionhistory }) => {
    return {
        username: user.username,
        dataTransactionHistory: transactionhistory.dataTransactionHistory
    }
}

export default connect(mapStatetoProps, { getTransactionHistory })(HistoryTransaction);