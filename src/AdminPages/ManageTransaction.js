import React, { Component } from 'react';
import SidebarAdmin from '../Components/SidebarAdmin';
import { getTransactionComplete, editStatusTransaction } from '../Redux/Actions';
import { connect } from 'react-redux';
import { MDBIcon, MDBCol, MDBBtn, MDBRow } from 'mdbreact';
import { API_URL_1 } from '../Helpers/API_URL';
import '../CSS/PreviewImage.css'


class ManageTransaction extends Component {

    state = {
        newStatusTransaction: ''
    }

    componentDidMount() {
        this.props.getTransactionComplete();
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

    editStatusTransaction = (idtransaction) => {
        let statustransaction = this.state.newStatusTransaction;
        let datatransaction = { statustransaction };
        this.props.editStatusTransaction(idtransaction, datatransaction)
        alert('Berhasil')
    }

    renderGetTransaction = () => {
        return this.props.dataTransactionComplete.map((item, index) => {
            return (
                <tr className="text-center" key={index}>
                    <td>{index + 1}</td>
                    <td>{item.username.toUpperCase()}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>0{item.phonenumber}</td>
                    <td>Rp. {item.totaltransaction.toLocaleString()},- </td>
                    <td>{item.bankname}</td>
                    <td><img id="myImg" className="img-y" src={API_URL_1 + item.imagetransaction} alt="imageTransaction" style={{ height: 30, width: 30 }}
                        onClick={this.functionModalImg} />
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
                        <div style={{ backgroundColor: 'black', cursor: 'pointer' }} onClick={() => this.editStatusTransaction(item.idtransaction)}>
                            <MDBIcon icon="check" style={{ color: 'white' }} />
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
                                        <th scope="col"><div className="d-flex justify-content-center">USERNAME </div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">NAMA PEMBELI</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">ALAMAT</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">NO.HP</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">TOTAL</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">BANK</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">BUKTI</div></th>
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

export default connect(mapStatetoProps, { getTransactionComplete, editStatusTransaction })(ManageTransaction);