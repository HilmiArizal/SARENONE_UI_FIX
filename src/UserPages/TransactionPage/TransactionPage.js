import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCart, addProfileData, getTransaction, addTransaction, getTransactionMethod, deleteCartUser, addTransactionHistory, editProfileData, getProvince, getCity } from '../../Redux/Actions';
import Axios from 'axios';
import { API_URL_1 } from '../../Helpers/API_URL';
import NavbarOther from '../../Components/Navbar/NavbarOther';
import Footer from '../../Components/Footer';
import NoImage from '../../Images/NoImage.png'
import Success from '../../Images/Confirmation.png';
import { MDBRow, MDBCol, MDBContainer, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody } from 'mdbreact';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Swal from 'sweetalert2';
import './TransactionPage.css';


class TransactionPage extends Component {

    state = {
        dataTotalCart: [],

        addNewData: [],

        totaltransaction: 0,
        methodeId: 0,
        methodeName: '',
        addDescription: '',
        addExpedition: '',

        image: undefined,
        previewImage: undefined,
        addImage: false,

        redirectHome: false,

        modal4: false,
        checkBox: false,
        copyText: false,
        transactionCode: ''
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    componentDidMount() {
        this.props.getCart();
        this.getTotalTransaction();
        this.props.getTransaction();
        this.props.getTransactionMethod();
        this.getDataByName();
        window.scrollTo(0, 0);
    }

    getDataByName = async () => {
        const token = localStorage.getItem('token');
        const res = await Axios.get(API_URL_1 + `buyer/getProfileDataByName`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        this.setState({ dataByName: res.data })
    }

    getTotalTransaction = async () => {
        const token = localStorage.getItem('token')
        const res = await Axios.get(API_URL_1 + `cart/getTotalCart`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        this.setState({ dataTotalCart: res.data[0] })
    }

    handleCopy = () => {
        this.setState({
            copyText: !this.state.copyText
        })
        let copy = document.getElementById("copy-value");
        copy.select();
        document.execCommand("copy");
        alert("copy")
    }

    onChangeAddDescription = (e) => {
        let description = this.refs.description.value;
        this.setState({
            modal4: false,
            addDescription: description
        })
    }

    onChangeCheckBox = () => {
        if (this.state.checkBox === true) {
            document.getElementById("myCheck").checked = true
        } else {
            this.setState({ modal4: true })
            document.getElementById("myCheck").checked = false
        }
    }

    onCheckTransactionId = () => {
        let transactionCode = this.state.transactionCode;
        if (this.state.addNewData.transactionId === parseInt(transactionCode)) {
            this.setState({
                checkBox: !this.state.checkBox,
                modal4: false
            })
            document.getElementById("myCheck").checked = true
            alert('Berhasil')
        }else{
            alert('Kode transaksi salah!')
        }
    }

    addImageProfile = (e) => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0],
                previewImage: URL.createObjectURL(e.target.files[0]),
                addImage: true
            })
        }
    }

    addProfileData = () => {
        let userId = this.props.iduser;
        let name = this.refs.name.value;
        let phonenumber = this.refs.phonenumber.value;
        let address = this.refs.address.value;
        let expedition = this.state.addExpedition;
        let description = this.state.addDescription === '' ? '-' : this.state.addDescription;
        let metodetransactionName = this.state.methodeName;
        let imagetransaction = this.state.previewImage;
        let transactionId = Date.now() + Math.random();
        let profiledata = {
            name,
            phonenumber: parseInt(phonenumber),
            address,
            expedition,
            description,
            userId: parseInt(userId),
            metodetransactionName,
            imagetransaction,
            transactionId: parseInt(transactionId)
        }
        console.log(profiledata)
        if (name && phonenumber && address && expedition && metodetransactionName && imagetransaction) {
            this.setState({ addNewData: profiledata })
            // this.state.addNewData.push(profiledata)
            // this.props.addProfileData(profiledata)
        } else {
            alert('Harus di isi!')
        }
    }

    addTransaction = () => {
        this.props.dataCart.map((item) => {
            let name = this.state.addNewData.name;
            let phonenumber = this.state.addNewData.phonenumber;
            let address = this.state.addNewData.address;
            let expedition = this.state.addNewData.expedition;
            let description = this.state.addNewData.description;
            let transactionId = this.state.addNewData.transactionId;

            let userId = this.props.iduser;
            let totaltransaction = this.state.dataTotalCart.totaltransaksi;
            let statustransaction = 'Dalam Proses';
            let { image } = this.state;
            let metodetransactionId = this.state.methodeId;

            let stockId = item.stockId
            let username = this.props.username;
            let productname = item.productname;
            let weightlist = item.weightlist;
            let pricelist = item.pricelist;
            let qty = item.qty;
            let totalprice = item.totalprice;

            let dataProfile = {
                name, phonenumber, address, expedition, description, userId, transactionId
            }
            let dataTransaction = {
                userId, totaltransaction, statustransaction, metodetransactionId, transactionId
            }
            let datahistorytransaction = {
                userId, username, productname, weightlist, pricelist, qty, totalprice, stockId
            }
            if (image) {
                if (userId && totaltransaction && statustransaction && metodetransactionId) {
                    this.props.addProfileData(dataProfile)
                    this.props.addTransaction(dataTransaction, image)
                    this.props.addTransactionHistory(datahistorytransaction)
                    // this.props.deleteCartUser(userId)
                    // this.setState({ redirectHome: true })
                    Swal.fire({
                        imageUrl: `${Success}`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    alert('Mohon diisi dengan lengkap')
                }
            } else {
                alert("Upload bukti transaksi!")
            }
        })
    }

    renderTransactionMethod = () => {
        return this.props.dataTransactionMethod.map((item, index) => {
            return (
                <MDBCol key={index}>
                    <center>
                        <img src={API_URL_1 + item.bankimage} alt="bankImage" width='30%' />
                        <div><input type="radio" name="method" onClick={() => this.setState({ methodeId: item.idmetodetransaction, methodeName: item.bankname + ' -> ' + item.rekeningname })} /> </div>
                        {
                            this.state.methodeId === 0 ? ''
                                :
                                this.state.methodeId === item.idmetodetransaction ? <div className="rekening-text">{item.rekeningname}<br />CV. HEAVEN SENTOSA</div>
                                    :
                                    ''
                        }
                    </center>
                </MDBCol>
            )
        })
    }

    renderAddImage = () => {
        const { previewImage } = this.state;
        return (
            <div>
                {
                    previewImage
                        ?
                        <center>
                            <img src={previewImage} alt="bukti-transaksi" className="img-trf" />
                        </center>
                        :
                        <center>
                            <img src={NoImage} alt="bukti-transaksi" className="img-trf" />
                        </center>
                }
                <div className="input-img">
                    <input type="file" onChange={this.addImageProfile} />
                </div>
            </div>
        )
    }

    renderResultsDataProfile = () => {
        return (
            <div className="section-transaction-left-after">
                <form className="results-form-left">
                    <div>
                        <label>Nama Lengkap Pembeli :</label>
                        <div>{this.state.addNewData.name}</div>
                    </div>
                    <div>
                        <label>No. Handphone / WA :</label>
                        <div>{this.state.addNewData.phonenumber}</div>
                    </div>
                    <div>
                        <label>Alamat Lengkap Pembeli :</label>
                        <div>{this.state.addNewData.address}</div>
                    </div>
                    <div>
                        <label>Ekpedisi :</label>
                        <div>{this.state.addNewData.expedition}</div>
                    </div>
                    <div>
                        <label>Keterangan Pembeli :</label>
                        <div>{this.state.addNewData.description}</div>
                    </div>
                </form>
            </div>
        )
    }

    renderResultsDataTransaction = () => {
        return (
            <div className="section-transaction-right-after">
                <form className="results-form-right">
                    <div>
                        <label>Total Transaksi :</label>
                        <div>Rp. {parseInt(this.state.dataTotalCart.totaltransaksi).toLocaleString()},-</div>
                    </div>
                    <div>
                        <label>Transaksi Via Bank :</label>
                        <div>{this.state.addNewData.metodetransactionName}</div>
                    </div>
                    <div>
                        <label>Bukti Transaksi :</label>
                        <img src={this.state.addNewData.imagetransaction} alt="bukti-transaksi" className="img-trf" />
                    </div>
                </form>
            </div>
        )
    }

    renderInputProfile = () => {
        return (
            <div>
                {
                    this.state.addNewData.length === 0
                        ?
                        <form className="form-transaction">
                            <div>
                                <label>Nama Lengkap Pembeli :</label>
                                <span>
                                    <input type="text" className="form-control" ref="name" />
                                </span>
                            </div>
                            <div>
                                <label>No. Handphone / WA :</label>
                                <span>
                                    <input type="number" className="form-control" ref="phonenumber" />
                                </span>
                            </div>
                            <div>
                                <label>Alamat Lengkap Pembeli :</label>
                                <span>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" ref="address"></textarea>
                                </span>
                            </div>
                            {
                                this.state.addDescription === ''
                                    ?
                                    <div>
                                        <label>Tambahkan keterangan dari pembeli kepada penjual (Request) :</label>
                                        <div className="before-description">
                                            <div onClick={this.toggle(4)} className="check-description-before">Tambahkan keterangan</div>
                                            <MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} size="lg">
                                                <MDBModalHeader toggle={this.toggle(4)}>Saya ingin sesuatu?</MDBModalHeader>
                                                <MDBModalBody>
                                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" ref="description"></textarea>
                                                    <hr />
                                                    <center>
                                                        <MDBBtn size="sm" color="primary" onClick={this.onChangeAddDescription}>Simpan</MDBBtn>
                                                    </center>
                                                </MDBModalBody>
                                            </MDBModal>
                                        </div>
                                    </div>
                                    :
                                    <div className="after-description">
                                        <div className="text-description-after">Tambahan keterangan telah disimpan <div onClick={this.toggle(4)} className="check-description-after">Lihat disini</div> </div>
                                        <div>
                                            <MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} size="lg">
                                                <MDBModalHeader toggle={this.toggle(4)}>Saya ingin sesuatu?</MDBModalHeader>
                                                <MDBModalBody>
                                                    <p>
                                                        {this.state.addDescription}
                                                    </p>
                                                    <hr />
                                                    <center>
                                                        <MDBBtn size="sm" color="danger" onClick={() => this.setState({ modal4: false, addDescription: '' })}>Hapus</MDBBtn>
                                                    </center>
                                                </MDBModalBody>
                                            </MDBModal>
                                        </div>
                                    </div>

                            }
                            <div>
                                <label>Pilih pengiriman</label>
                                <span>
                                    <select className="form-control" style={{ cursor: 'pointer' }} onChange={(e) => this.setState({ addExpedition: e.target.value })}>
                                        <option selected disabled hidden>...</option>
                                        <option>JNE</option>
                                        <option>GO SEND</option>
                                        <option>EKSPEDISI INTERNAL (Sekitar Bandung)</option>
                                    </select>
                                </span>
                            </div>
                        </form>
                        :
                        this.renderResultsDataProfile()
                }
            </div>
        )
    }

    renderInputTransaction = () => {
        return (
            <div>
                {
                    this.state.addNewData.length === 0
                        ?
                        <form>
                            <div className="total-transaction">
                                Total Belanja : Rp. {parseInt(this.state.dataTotalCart.totaltransaksi).toLocaleString()},-
                            </div>
                            <div className="text-center"> PILIH PEMBAYARAN VIA TRANSFER </div>
                            <MDBRow>
                                {this.renderTransactionMethod()}
                            </MDBRow>
                            <hr />
                            {
                                this.state.methodeId === 0
                                    ?
                                    ''
                                    :
                                    <div>
                                        <div className="text-center"> UPLOAD BUKTI TRANSAKSINYA DISINI </div>
                                        {this.renderAddImage()}
                                    </div>
                            }
                        </form>
                        :
                        this.renderResultsDataTransaction()
                }
            </div>
        )
    }

    renderDataTransaction = () => {
        return (
            <div className="section-card-transaction">
                {this.state.addNewData.length === 0
                    ?
                    <div>
                        <div className="transaction-title">
                            Lengkapi data untuk proses pengiriman
                    </div>
                        <hr />
                    </div>
                    :
                    <div>
                        <div className="transaction-title">
                            Mohon di cek kembali agar proses pengiriman berjalan dengan lancar
                    </div>
                        <hr />
                        <div className="transaction-code">
                            Kode Transaksi Anda :
                            <div className="form-input-text">
                                <input type="text" id="copy-value" value={this.state.addNewData.transactionId} />
                                <FileCopyIcon onClick={this.state.copyText === false ? this.handleCopy : ''} style={this.state.copyText === false ? { cursor: 'pointer', marginTop: '2%' } : { marginTop: '2%', color: 'grey' }} />
                            </div>
                        </div>
                    </div>
                }
                <div className="section-transaction">
                    <div className="section-transaction-left">
                        {this.renderInputProfile()}
                    </div>
                    <div className="section-transaction-right">
                        {this.renderInputTransaction()}
                    </div>
                </div>

                {
                    this.state.addNewData.length === 0
                        ?
                        <div className="save-data-profile" onClick={this.addProfileData}>LANJUTKAN</div>
                        :
                        <div>
                            <hr />
                            <div className="checkout-transaction">
                                <label>
                                    <input type="checkbox" id="myCheck" style={{ cursor: 'pointer' }} onClick={this.onChangeCheckBox} />
                                </label>
                                <MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} size="lg">
                                    <MDBModalHeader toggle={this.toggle(4)}>Konfirmasikan kode transaksi!</MDBModalHeader>
                                    <MDBModalBody>
                                        <input type="text" className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => this.setState({ transactionCode: e.target.value })} />
                                        <hr />
                                        <center>
                                            <MDBBtn size="sm" color="primary" onClick={this.onCheckTransactionId}>OK!</MDBBtn>
                                        </center>
                                    </MDBModalBody>
                                </MDBModal>
                                <div>Checklist dan konfirmasi kode transaksi</div>
                            </div>
                            {
                                this.state.checkBox
                                    ?
                                    <div className="btn-checkout-transaction" onClick={this.addTransaction}>BAYAR</div>
                                    :
                                    <button disabled className="btn-checkout-transaction-disable">BAYAR</button>
                            }
                        </div>
                }

            </div>
        )
    }

    render() {

        if (this.state.redirectHome) {
            return (
                <Redirect to="/">

                </Redirect>
            )
        }
        return (
            <div className="body-transaction">
                <div className="section-transaction-page">
                    <div style={{ marginTop: 30 }}>
                        <NavbarOther />
                    </div>
                    <MDBContainer>
                        {this.renderDataTransaction()}
                    </MDBContainer>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStatetoProps = ({ user, cart, buyer, transaction, transactionmethod }) => {
    return {
        iduser: user.iduser,
        username: user.username,
        dataCart: cart.dataCart,
        dataBuyerProfile: buyer.dataBuyerProfile,
        dataTransaction: transaction.dataTransaction,
        dataTransactionMethod: transactionmethod.dataTransactionMethod,
        dataProvince: transaction.dataProvince,
        dataCity: transaction.dataCity,
        dataDistrics: transaction.dataDistrics
    }
}

export default connect(mapStatetoProps, { getCart, addProfileData, getTransaction, addTransaction, getTransactionMethod, deleteCartUser, addTransactionHistory, editProfileData, getProvince, getCity })(TransactionPage);