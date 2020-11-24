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
import Swal from 'sweetalert2';
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
        redirectHome: false,

        modal4: false
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
        this.getDataById();
        this.props.getProvince();
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

    addProfileData = () => {
        let userId = this.props.iduser;
        let name = this.refs.name.value;
        let phonenumber = this.refs.phonenumber.value;
        let address = this.refs.address.value;
        let description = this.refs.description.value;
        let transactionId = Date.now() + Math.random()
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
            this.state.addNewData.push(profiledata)
            // this.props.addProfileData(profiledata)
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
            let transactionId = Date.now() + Math.random()
            console.log(transactionId)
            let datahistorytransaction = {
                userId, username, productname, weightlist, pricelist, qty, totalprice, stockId, transactionId
            }
            let datatransaction = {
                userId, totaltransaction, statustransaction, metodetransactionId,
            }
            if (image) {
                if (userId && totaltransaction && statustransaction && metodetransactionId) {
                    // this.props.addTransaction(datatransaction, image)
                    // this.props.deleteCartUser(userId)
                    // this.props.addTransactionHistory(datahistorytransaction)
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
                        <div><input type="radio" name="method" onClick={() => this.setState({ methodeId: item.idmetodetransaction })} /> </div>
                        {
                            this.state.methodeId === 0 ? ''
                                :
                                this.state.methodeId === item.idmetodetransaction ? <div>{item.rekeningname}<br />CV. HEAVEN SENTOSA</div>
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
                <center>
                    <input type="file" onChange={this.addImageProfile} />
                </center>
            </div>
        )
    }

    renderResultsDataProfile = () => {
        return (
            <div className="section-transaction-left-after">
                <form className="results-form">
                    <div>
                        <label>Nama Lengkap Pembeli</label>
                        <span>: {this.state.addNewData.name}</span>
                    </div>
                    <div>
                        <label>No. Handphone / WA</label>
                        <span>: {this.state.addNewData.phonenumber}</span>
                    </div>
                    <div>
                        <label>Alamat Lengkap Pembeli</label>
                        <span>: {this.state.addNewData.address}</span>
                    </div>
                    <div>
                        <label>Keterangan Pembeli</label>
                        <span>: {this.state.addNewData.description}</span>
                    </div>
                    <div>
                        <label>Kode Transaksi</label>
                        <span>: {this.state.addNewData.transactionId}</span>
                    </div>
                </form>
            </div>
        )
    }

    renderInputProfile = () => {
        if (this.state.inputData === false) {
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
                                <div>
                                    <label>Pilih pengiriman</label>
                                    <span>

                                        <select className="form-control">
                                            <option>JNE</option>
                                            <option>GO SEND</option>
                                            <option>EKSPEDISI INTERNAL (Sekitar Bandung)</option>
                                        </select>
                                    </span>
                                </div>
                                <div>
                                    <MDBBtn color="elegant" size="sm" onClick={this.toggle(4)}>Tambahkan Keterangan</MDBBtn>
                                    <MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} size="lg">
                                        <MDBModalHeader toggle={this.toggle(4)}>Saya ingin sesuatu?</MDBModalHeader>
                                        <MDBModalBody>
                                            {/* <label>Keterangan dari pembeli untuk penjual :</label> */}
                                            <span>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" ref="description"></textarea>
                                            </span>
                                        </MDBModalBody>

                                    </MDBModal>
                                </div>

                            </form>
                            :
                            this.renderResultsDataProfile()
                    }
                    <center>
                        <div>
                            {/* <MDBBtn size="md" color="elegant" onClick={this.addProfileData}> SUBMIT </MDBBtn> */}
                        </div>
                    </center>
                </div>
            )
        }
    }

    renderDataTransaction = () => {
        return (
            <div className="section-card-transaction">
                <div>
                    <div className="transaction-title">
                        Silahkan untuk mengisi data secara lengkap agar proses pengiriman berjalan dengan lancar
                    </div>
                    <hr />
                </div>

                <div className="section-transaction">
                    <div className="section-transaction-left">
                        {this.renderInputProfile()}
                    </div>
                    <div className="section-transaction-right">
                        <div className="text-center"> PILIH PEMBAYARAN VIA TRANSFER </div>
                        <MDBRow>
                            {this.renderTransactionMethod()}
                        </MDBRow>
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
                    </div>
                </div>
                <center>
                    <MDBBtn size="md" color="elegant" onClick={this.addTransaction}> BAYAR </MDBBtn>
                </center>
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
    console.log(transaction.dataProvince)
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