import React, { Component } from 'react';
import { getCart, addProfileData, getTransaction, addTransaction, getTransactionMethod, deleteCartUser, addTransactionHistory, editProfileData } from '../../Redux/Actions';
import { connect } from 'react-redux';
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from 'mdbreact';
// import NavbarWithout from '../Components/NavbarWithout';
import Axios from 'axios';
import { API_URL_1 } from '../../Helpers/API_URL';
import NoImage from '../../Images/NoImage.png'
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import Success from '../../Images/Confirmation.png';
import NavbarOther from '../../Components/Navbar/NavbarOther';
import './TransactionPage.css';


class TransactionPage extends Component {

    state = {
        dataByName: [],
        dataById: [],
        dataTotalCart: [],

        addOldData: [],
        addNewData: [],

        selectDataId: 0,
        selectDataIdFix: 0,

        totaltransaction: 0,
        methodeId: 0,

        image: undefined,
        previewImage: undefined,
        addImage: false,

        inputData: false,
        redirectHome: false
    }

    componentDidMount() {
        this.props.getCart();
        this.getTotalTransaction();
        this.props.getTransaction();
        this.props.getTransactionMethod();
        this.getDataByName();
        this.getDataById();
    }

    getDataByName = async () => {
        const token = localStorage.getItem('token')
        const res = await Axios.get(API_URL_1 + `buyer/getProfileDataByName`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        this.setState({ dataByName: res.data })
    }

    getDataById = async () => {
        const res = await Axios.get(API_URL_1 + `buyer/getProfileDataById?idprofilebuyer=${this.state.selectDataIdFix}`)
        this.setState({ dataById: res.data })
    }

    getTotalTransaction = async () => {
        const token = localStorage.getItem('token')
        const res = await Axios.get(API_URL_1 + `cart/getTotalCart`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        this.setState({ dataTotalCart: res.data })
    }

    getTransactionId = () => {
        const { dataTransaction } = this.props;
        let transactionId = 0
        for (var i = 0; i < dataTransaction.length; i++) {
            transactionId = dataTransaction[i].idtransaction
        }
        return transactionId + 1
    }

    onChangeSelectId = (e) => {
        this.setState({ selectDataId: parseInt(e.target.value) })
    }

    btnSelectIdFix = async (e) => {
        let idprofilebuyer = this.state.selectDataId;
        this.setState({ selectDataIdFix: idprofilebuyer })
        const res = await Axios.get(API_URL_1 + `buyer/getProfileDataById?idprofilebuyer=${idprofilebuyer}`)
        this.setState({ dataById: res.data })
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

    addOldProfileData = () => {
        this.state.dataById.map((item) => {
            let userId = this.props.iduser;
            let name = item.name;
            let phonenumber = item.phonenumber;
            let address = item.address;
            let description = item.description;
            let transactionId = this.getTransactionId();
            let profiledata = {
                userId: parseInt(userId),
                name,
                phonenumber: parseInt(phonenumber),
                address,
                description,
                transactionId: parseInt(transactionId)
            }
            this.setState({ addOldData: profiledata })
            this.props.editProfileData(profiledata)
        })
    }

    addNewProfileData = () => {
        let userId = this.props.iduser;
        let name = this.refs.name.value;
        let phonenumber = this.refs.phonenumber.value;
        let address = this.refs.address.value;
        let description = this.refs.description.value;
        let transactionId = this.getTransactionId();
        let profiledata = {
            userId: parseInt(userId),
            name,
            phonenumber: parseInt(phonenumber),
            address,
            description,
            transactionId: parseInt(transactionId)
        }
        if (name && phonenumber && address) {
            this.setState({ addNewData: profiledata })
            this.props.addProfileData(profiledata)
        } else {
            alert('Harus di isi!')
        }
    }

    addTransaction = () => {
        this.props.dataCart.map((item) => {
            let { image } = this.state;
            let userId = this.props.iduser;
            let totaltransaction = this.state.dataTotalCart[0].totaltransaksi;
            let statustransaction = 'Dalam Proses';
            let metodetransactionId = this.state.methodeId;
            let username = this.props.username;
            let stockId = item.stockId
            let productname = item.productname;
            let weightlist = item.weightlist;
            let pricelist = item.pricelist;
            let qty = item.qty;
            let totalprice = item.totalprice;
            let transactionId = this.getTransactionId();
            let datahistorytransaction = {
                userId, username, productname, weightlist, pricelist, qty, totalprice, stockId, transactionId
            }
            let datatransaction = {
                userId, totaltransaction, statustransaction, metodetransactionId,
            }
            if (image) {
                if (userId && totaltransaction && statustransaction && metodetransactionId) {
                    this.props.addTransaction(datatransaction, image)
                    this.props.deleteCartUser(userId)
                    this.props.addTransactionHistory(datahistorytransaction)
                    this.setState({ redirectHome: true })
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

    renderProduct = () => {
        return this.props.dataCart.map((item, index) => {
            return (
                <div key={index}> {index + 1}. {item.productname} {item.weightlist}gr/{item.qty} pack</div>
            )
        })
    }

    renderDataTotalCart = () => {
        return this.state.dataTotalCart.map((item, index) => {
            return (
                <div key={index} onChange={() => this.setState({ totaltransaction: item.totaltransaksi })}>Rp. {item.totaltransaksi.toLocaleString()} ,-</div>
            )
        })
    }

    renderSelectOptionName = () => {
        return this.state.dataByName.map((item, index) => {
            return (
                <option value={item.idprofilebuyer}>
                    {item.name}, {item.phonenumber}, {item.address}
                </option>
            )
        })
    }

    renderTransactionMethod = () => {
        return this.props.dataTransactionMethod.map((item, index) => {
            return (
                <MDBCol key={index}>
                    <center>
                        <img src={API_URL_1 + item.bankimage} alt="bankImage" width='30%' />
                        <div><input type="radio" name="method" onClick={() => this.setState({ methodeId: item.idmetodetransaction })} /> </div>
                        {
                            this.state.methodeId === 0 ? ''
                                :
                                this.state.methodeId === item.idmetodetransaction ? <div style={{ fontSize: '150%' }}>{item.rekeningname}</div>
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
                            <img src={previewImage} alt="bukti-transaksi" style={{ height: 300, width: 300 }} />
                        </center>
                        :
                        <center>
                            <img src={NoImage} alt="bukti-transaksi" style={{ height: 300, width: 300 }} />
                        </center>
                }
                <center>
                    <input type="file" onChange={this.addImageProfile} />
                </center>
            </div>
        )
    }

    renderDataId = () => {
        return this.state.dataById.map((item, index) => {
            return (
                <div>
                    <MDBRow style={{ marginTop: 10 }}>
                        <MDBCol size="3">Nama lengkap pembeli</MDBCol>:<MDBCol size="8">
                            <div className="row">
                                <div className="col-6">
                                    <div>{item.name}</div>
                                </div>
                            </div>

                        </MDBCol>
                    </MDBRow>
                    <MDBRow style={{ marginTop: 10 }}>
                        <MDBCol size="3">Nomor handphone pembeli</MDBCol>:<MDBCol size="8">
                            <div className="row">
                                <div className="col-6">
                                    <div>{item.phonenumber}</div>
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow style={{ marginTop: 10 }}>
                        <MDBCol size="3">Alamat lengkap pengiriman</MDBCol>:<MDBCol size="5">
                            <div>{item.address}</div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow style={{ marginTop: 10 }}>
                        <MDBCol size="3">Keterangan/permintaan dari pembeli untuk penjual</MDBCol>:<MDBCol size="5">
                            <div>{item.description}</div>
                        </MDBCol>
                        <MDBCol size="4"></MDBCol>
                    </MDBRow>
                    {
                        this.state.addOldData.length === 0
                            ?
                            <center>
                                <div style={{ marginTop: 30 }}>
                                    <MDBBtn size="md" color="elegant" onClick={this.addOldProfileData}> CEK PROFIL PEMBELI </MDBBtn>
                                </div>
                            </center>
                            :
                            ''
                    }
                </div>
            )
        })
    }

    renderNewDataId = () => {
        return (
            <div>
                <MDBRow style={{ marginTop: 10 }}>
                    <MDBCol size="3">Nama lengkap pembeli</MDBCol>:<MDBCol size="8">
                        <div className="row">
                            <div className="col-6">
                                <div>{this.state.addNewData.name}</div>
                            </div>
                        </div>

                    </MDBCol>
                </MDBRow>
                <MDBRow style={{ marginTop: 10 }}>
                    <MDBCol size="3">Nomor handphone pembeli</MDBCol>:<MDBCol size="8">
                        <div className="row">
                            <div className="col-6">
                                <div>0{this.state.addNewData.phonenumber}</div>
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow style={{ marginTop: 10 }}>
                    <MDBCol size="3">Alamat lengkap pengiriman</MDBCol>:<MDBCol size="5">
                        <div>{this.state.addNewData.address}</div>
                    </MDBCol>
                </MDBRow>
                <MDBRow style={{ marginTop: 10 }}>
                    <MDBCol size="3">Keterangan/permintaan dari pembeli untuk penjual</MDBCol>:<MDBCol size="5">
                        <div>{this.state.addNewData.description}</div>
                    </MDBCol>
                    <MDBCol size="4"></MDBCol>
                </MDBRow>
            </div>
        )
    }

    renderInputProfileBuyer = () => {
        if (this.state.inputData === false) {
            return (
                <div>
                    {
                        this.state.addNewData.length === 0
                            ?
                            <div>
                                <MDBRow style={{ marginTop: 10 }}>
                                    <MDBCol size="3">Nama lengkap pembeli</MDBCol>:<MDBCol size="8">
                                        <div className="row">
                                            <div className="col-6">
                                                <input type="text" className="form-control" ref="name" />
                                            </div>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow style={{ marginTop: 10 }}>
                                    <MDBCol size="3">Nomor handphone pembeli</MDBCol>:<MDBCol size="8">
                                        <div className="row">
                                            <div className="col-6">
                                                <input type="number" className="form-control" ref="phonenumber" />
                                            </div>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow style={{ marginTop: 10 }}>
                                    <MDBCol size="3">Alamat lengkap pengiriman</MDBCol>:<MDBCol size="5">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon">
                                                    <i className="fas fa-pencil-alt prefix"></i>
                                                </span>
                                            </div>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" ref="address"></textarea>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow style={{ marginTop: 10 }}>
                                    <MDBCol size="3">Keterangan/permintaan dari pembeli untuk penjual</MDBCol>:<MDBCol size="5">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon">
                                                    <i className="fas fa-pencil-alt prefix"></i>
                                                </span>
                                            </div>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" ref="description"></textarea>
                                        </div>
                                    </MDBCol>
                                    <MDBCol size="4"></MDBCol>
                                </MDBRow>
                                <center>
                                    <div style={{ marginTop: 30 }}>
                                        <MDBBtn size="md" color="elegant" onClick={this.addNewProfileData}> CEK PROFIL PEMBELI </MDBBtn>
                                        {/* <MDBBtn size="md" color="indigo" onClick={() => this.setState({ inputData: true })}> Pakai profil lama </MDBBtn> */}
                                    </div>
                                </center>
                            </div>
                            :
                            this.renderNewDataId()
                    }
                </div>
            )
        }
        return (
            <div>
                {
                    this.state.selectDataIdFix > 0
                        ?
                        this.renderDataId()
                        :
                        <div>
                            <select className="form-control" onChange={this.onChangeSelectId} >
                                <option disabled hidden selected >List data pembelian</option>
                                {this.renderSelectOptionName()}
                            </select>
                            <center>
                                <div style={{ marginTop: 30 }}>
                                    <MDBBtn size="md" color="elegant" onClick={this.btnSelectIdFix}> GUNAKAN PROFIL INI </MDBBtn>
                                    <MDBBtn size="md" color="indigo" onClick={() => this.setState({ inputData: false })}> Buat profil baru </MDBBtn>
                                </div>
                            </center>
                        </div>
                }
            </div>
        )
    }

    renderDataTransaction = () => {
        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <MDBRow>
                        <MDBCol size="4"></MDBCol><MDBCol size="2">Nama Produk</MDBCol>:<MDBCol size="4">{this.renderProduct()}</MDBCol><MDBCol size="2"></MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol size="4"></MDBCol><MDBCol size="2">Status Transaksi</MDBCol>:<MDBCol size="4">Belum Bayar</MDBCol><MDBCol size="2"></MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol size="4"></MDBCol><MDBCol size="2">Total Transaksi</MDBCol>:<MDBCol size="4">{this.renderDataTotalCart()}</MDBCol><MDBCol size="2"></MDBCol>
                    </MDBRow>
                    <div style={{ border: '1px solid black', margin: 30 }}></div>
                    {
                        this.state.addOldData.length === 0 && this.state.addNewData.length === 0
                            ?
                            this.renderInputProfileBuyer()
                            :
                            <div>
                                {this.renderInputProfileBuyer()}
                                <div className="text-center" style={{ marginTop: 30, fontSize: 30 }}> PILIH PEMBAYARAN VIA TRANSFER </div>
                                <MDBRow>
                                    {this.renderTransactionMethod()}
                                </MDBRow>
                                {
                                    this.state.methodeId === 0
                                        ?
                                        ''
                                        :
                                        <center>
                                            <div style={{ marginTop: 30, fontSize: 30 }}> UPLOAD BUKTI TRANSAKSINYA DISINI </div>
                                            {this.renderAddImage()}
                                        </center>
                                }
                                <center>
                                    <MDBBtn size="md" color="elegant" onClick={this.addTransaction} style={{ marginTop: 50 }}> BAYAR </MDBBtn>
                                </center>
                            </div>

                    }
                </div>
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
                <div style={{ marginTop: 80 }}>
                    <NavbarOther />
                </div>
                <MDBContainer>
                    {this.renderDataTransaction()}
                </MDBContainer>
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
        dataTransactionMethod: transactionmethod.dataTransactionMethod
    }
}

export default connect(mapStatetoProps, { getCart, addProfileData, getTransaction, addTransaction, getTransactionMethod, deleteCartUser, addTransactionHistory, editProfileData })(TransactionPage);