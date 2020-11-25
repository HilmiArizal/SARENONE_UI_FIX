import React, { Component } from 'react';
import SidebarAdmin from '../Components/SidebarAdmin';
import { getTransactionComplete, editStatusTransaction, deleteTransaction } from '../Redux/Actions';
import { connect } from 'react-redux';
import { MDBIcon, MDBCol, MDBBtn, MDBRow, MDBModal, MDBModalHeader, MDBModalBody } from 'mdbreact';
import { API_URL_1 } from '../Helpers/API_URL';
import '../CSS/PreviewImage.css'
import Axios from 'axios';
import './ProcessTransaction/ProcessTransaction.css';

class ManageTransaction extends Component {

    state = {
        dataProcessTransaction: [],

        newStatusTransaction: '',
        usernameCheck: '',
        datatimeCheck: '',
        address: '',

        modal1: false,
        modal2: false
    }

    toggle = () => {
        this.setState({
            modal1: !this.state.modal1
        });
    }


    toggle2 = () => {
        this.setState({
            modal2: !this.state.modal2
        });
    }

    componentDidMount() {
        this.props.getTransactionComplete();
        this.getProcessTransaction();
    }

    getProcessTransaction = async () => {
        const res = await Axios.get(API_URL_1 + `transaction/getTransactionCompleteNoGroupBy`)
        this.setState({ dataProcessTransaction: res.data })
    }

    functionModalImg = () => {
        var modal = document.getElementById("myModal");

        var img = document.querySelectorAll(".img-y");
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");
        for (let i = 0; i < img.length; i++) {
            img[i].onclick = function () {
                modal.style.display = "block";
                modalImg.src = this.src;
                captionText.innerHTML = this.alt;
            }
        }

        var span = document.getElementsByClassName("close")[0];

        span.onclick = function () {
            modal.style.display = "none";
        }
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

    renderAddress = () => {
        return this.props.dataTransactionComplete.map((item, index) => {
            if (this.state.address === item.address) {
                return (
                    <div className="row" style={{ color: 'black' }}>
                        <div className="col-4">Alamat</div> : <div className="col-6">{item.address}</div>
                        <div className="col-4">Keterangan</div> : <div className="col-6">{item.description}</div>
                    </div>
                )
            }
        })
    }

    renderDetailTransaction = () => {
        return this.props.dataTransactionComplete.map((item, index) => {
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
                        {/* <div>{item.productname}</div>
                        <div>{item.pricelist.toLocaleString()}</div>
                        <div>{item.weightlist} gr</div>
                        <div>{item.qty} pack</div>
                        <div>{item.totalprice.toLocaleString()}</div> */}
                    </div>
                )
        })
    }

    renderGetTransaction = () => {
        return this.props.dataTransactionComplete.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                        <div style={{ backgroundColor: 'black', cursor: 'pointer', color: 'white', fontSize: 12, padding: 1 }} onClick={() => { this.toggle(); this.setState({ usernameCheck: item.username, datetimeCheck: item.datetime }) }}>
                            <center>CLICK</center>
                            <MDBModal isOpen={this.state.modal1} toggle={this.toggle} size="lg">
                                <MDBModalHeader toggle={this.toggle}></MDBModalHeader>
                                <MDBModalBody>
                                    {this.renderDetailTransaction()}
                                    {/* <table class="table table-sm">
                                        <thead>
                                            <tr className="text-center">
                                                <th scope="col"> Akun</th>
                                                <th scope="col">Nama Produk</th>
                                                <th scope="col">Harga </th>
                                                <th scope="col">Berat</th>
                                                <th scope="col">Kuantitas</th>
                                                <th scope="col">Total Harga</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderDetailTransaction()}
                                        </tbody>
                                    </table> */}
                                </MDBModalBody>
                            </MDBModal>
                        </div>
                    </td>
                    <td>
                        <div style={{ backgroundColor: 'black', cursor: 'pointer', color: 'white', fontSize: 12, padding: 1 }} onClick={() => { this.toggle(); this.setState({ usernameCheck: item.username, datetimeCheck: item.datetime }) }}>
                            <center>CLICK</center>
                            <MDBModal isOpen={this.state.modal1} toggle={this.toggle} size="lg">
                                <MDBModalHeader toggle={this.toggle}></MDBModalHeader>
                                <MDBModalBody>
                                    {this.renderDetailTransaction()}
                                    {/* <table class="table table-sm">
                                        <thead>
                                            <tr className="text-center">
                                                <th scope="col"> Akun</th>
                                                <th scope="col">Nama Produk</th>
                                                <th scope="col">Harga </th>
                                                <th scope="col">Berat</th>
                                                <th scope="col">Kuantitas</th>
                                                <th scope="col">Total Harga</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderDetailTransaction()}
                                        </tbody>
                                    </table> */}
                                </MDBModalBody>
                            </MDBModal>
                        </div>
                    </td>
                    <td>{item.username.toUpperCase()}</td>
                    <td>{item.datetime}</td>
                    <td>Rp. {item.totaltransaction.toLocaleString()},- </td>
                    {/* <td>
                        <div style={{ backgroundColor: 'black', cursor: 'pointer', color: 'white', fontSize: 12, padding: 1 }} onClick={() => { this.toggle2(); this.setState({ address: item.address }) }}>
                            <center>ALAMAT</center>
                            <MDBModal isOpen={this.state.modal2} toggle={this.toggle2} size="lg">
                                <MDBModalHeader toggle={this.toggle2}></MDBModalHeader>
                                <MDBModalBody>
                                    {this.renderAddress()}
                                </MDBModalBody>
                            </MDBModal>
                        </div>
                    </td>
                    <td>0{item.phonenumber}</td>
                    <td>{item.bankname}</td>
                    <td><img id="myImg" className="img-y" src={API_URL_1 + item.imagetransaction} alt="imageTransaction" style={{ height: 30, width: 30 }}
                        onClick={this.functionModalImg} />
                        <div id="myModal" class="modal">
                            <span className="close" style={{ color: "white" }}>&times;</span>
                            <img className="modal-content" alt="category-Img" id="img01" style={{ height: 500 }} />
                            <div id="caption"></div>
                        </div>
                    </td> */}
                    <td>
                        <div>
                            <img id="myImg" className="img-y" src={API_URL_1 + item.imagetransaction} alt="imageTransaction" style={{ height: 20, width: 30 }}
                                onClick={this.functionModalImg} />
                        </div>
                        <div id="myModal" class="modal">
                            <span className="close" style={{ color: "white" }}>&times;</span>
                            <img className="modal-content" alt="category-Img" id="img01" style={{ height: 500 }} />
                            <div id="caption"></div>
                        </div>
                    </td>
                    <td>
                        <select defaultValue={item.statustransaction} onChange={(e) => this.setState({ newStatusTransaction: e.target.value })} >
                            <option>Belum Bayar</option>
                            <option>Dalam Proses</option>
                            <option>Sudah Bayar</option>
                        </select>
                    </td>
                    <td>
                        <div className="row">
                            <div className="col-6">
                                <div style={{ backgroundColor: 'black', cursor: 'pointer' }} onClick={() => this.editStatusTransaction(item.datetime)}>
                                    <MDBIcon icon="check" style={{ color: 'white' }} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div style={{ backgroundColor: 'black', cursor: 'pointer' }} onClick={() => this.deleteTransaction(item.datetime)}>
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
                        <center>
                            <h1>KELOLA TRANSAKSI</h1>
                        </center>
                    </div>
                    <center>
                        <MDBRow style={{ margin: 30 }}>
                            <MDBCol size="4"><MDBBtn href="transactionfail" color="white">Belum Bayar</MDBBtn></MDBCol>
                            <MDBCol size="4"><MDBBtn href="managetransaction">Sedang Proses</MDBBtn></MDBCol>
                            <MDBCol size="4"><MDBBtn href="transactionsuccess" color="white">Sudah Bayar</MDBBtn></MDBCol>
                        </MDBRow>
                    </center>
                    <div className="w3-container">
                        <div className="container">
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col"><div className="d-flex justify-content-center">NO. </div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">DETAIL BELANJA</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">DETAIL TRANSAKSI</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">USERNAME</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">TGL &amp; JAM TRANSAKSI</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">TOTAL TRANSAKSI</div></th>
                                        {/* <th scope="col"><div className="d-flex justify-content-center">ALAMAT</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">NO.HP</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">BANK</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">BUKTI</div></th> */}
                                        <th scope="col"><div className="d-flex justify-content-center">BUKTI TRANSAKSI</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">STATUS</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">AKSI</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderGetTransaction()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({ transactioncomplete }) => {
    return {
        dataTransactionComplete: transactioncomplete.dataTransactionComplete
    }
}

export default connect(mapStatetoProps, { getTransactionComplete, editStatusTransaction, deleteTransaction })(ManageTransaction);