import React, { Component } from 'react';
import SidebarAdmin from '../Components/SidebarAdmin';
import { getProductById, getCategory, getWeight, getPrice, getStock, editProducts, deleteStock } from '../Redux/Actions';
import { connect } from 'react-redux';
import { MDBIcon, MDBRow, MDBCol, MDBBtn, MDBModal, MDBModalBody, MDBModalFooter } from 'mdbreact';
import Axios from 'axios';
import { API_URL_1 } from '../Helpers/API_URL';
import { Redirect } from 'react-router-dom';


class DetailProduct extends Component {

    state = {
        dataProduct: [],
        newDataStock: [],

        changeCategoryId: '',
        changeCategoryName: '',
        selectGrade: '',

        addNewWeightId: '',
        addNewWeightName: '',
        addNewPriceId: '',
        addNewPriceName: '',
        addNewTotalStock: '',

        image: undefined,
        previewImage: undefined,
        changeimage: false,

        selectIdInput: null,
        redirectProduct: false,
        modal4: true
    }

    componentDidMount() {
        let idproduct = this.props.location.search.split('=')[1];
        this.getProductId();
        this.props.getCategory();
        this.props.getWeight();
        this.props.getPrice();
        this.props.getStock(idproduct);
    }

    getProductId = async () => {
        try {
            let idproduct = this.props.location.search.split('=')[1];
            const res = await Axios.get(API_URL_1 + `products/getProductById?idproduct=${idproduct}`)
            this.setState({ dataProduct: res.data[0] })
        } catch (err) {
            // console.log(err)
        }
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    onChangeSelectCategory = (e) => {
        this.setState({ changeCategoryId: parseInt(e.target.value) })
        this.setState({ changeCategoryName: e.target[e.target.selectedIndex].text })
    }

    onChangeSelectWeight = (e, index) => {
        let { dataStock } = this.props;
        dataStock[index].idweight = parseInt(e.target.value)
        dataStock[index].weightId = parseInt(e.target.value)
        dataStock[index].weightlist = parseInt(e.target[e.target.selectedIndex].text)
    }

    onChangeSelectPrice = (e, index) => {
        let { dataStock } = this.props;
        dataStock[index].idprice = parseInt(e.target.value)
        dataStock[index].priceId = parseInt(e.target.value)
        dataStock[index].pricelist = parseInt(e.target[e.target.selectedIndex].text);
    }

    onChangeSelectTotalStock = (e, index) => {
        let { dataStock } = this.props;
        dataStock[index].totalstock = parseInt(e.target.value)
    }

    editProductImage = (e) => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0],
                previewImage: URL.createObjectURL(e.target.files[0]),
                changeimage: true
            })
        }
    }

    newDataStock = () => {
        let { dataStock } = this.props;
        let productId = this.props.location.search.split('=')[1];
        let addWeightId = this.state.addNewWeightId;
        let addWeightName = this.state.addNewWeightName;
        let addPriceId = this.state.addNewPriceId;
        let addPriceName = this.state.addNewPriceName;
        let addTotalStock = this.state.addNewTotalStock;
        let addStockComplete = {
            idstock: null,
            productId: parseInt(productId),
            weightId: parseInt(addWeightId),
            weightlist: parseInt(addWeightName),
            priceId: parseInt(addPriceId),
            pricelist: parseInt(addPriceName),
            totalstock: parseInt(addTotalStock),
            idweight: parseInt(addWeightId),
            idprice: parseInt(addPriceId),
            idproduct: parseInt(productId),
        }
        if (addWeightId && addPriceId && addTotalStock) {
            dataStock.push(addStockComplete)
            this.setState({ newDataStock: dataStock })
        } else {
            alert('Isi dengan lengkap!')
        }
    }

    deleteStock = (idstock) => {
        let idproduct = this.props.location.search.split('=')[1];
        this.props.deleteStock(idstock, idproduct);
    }

    editProduct = () => {
        let productId = this.props.location.search.split('=')[1]
        let productname = this.refs.productname.value;
        let productcategoryId = this.state.changeCategoryId;
        let productdescription = this.refs.productdescription.value;
        let productgrade = this.state.selectGrade;
        let { image } = this.state;
        let changeimage = this.state.changeimage;
        let datastock = this.props.dataStock;
        let dataproducts = {
            productname, productcategoryId, productdescription, productgrade
        }
        console.log(dataproducts)
        let data = {
            productId,
            changeimage,
            dataproducts,
            datastock,
        }
        if (productcategoryId === '') {
            alert('Pilih lagi kategori!')
        } else {
            if (productname && productdescription) {
                this.props.editProducts(data, image, productId)
                alert(`Produk ${productname} berhasil diubah`)
                this.setState({ redirectProduct: true })
            } else {
                alert('Isi dengan benar!')
            }
        }
    }

    renderStockProduct = () => {
        return this.props.dataStock.map((item, index) => {
            if (this.state.selectIdInput === index) {
                return (
                    <tr className="text-center" key={index}>
                        <th scope="col" style={{ width: '25%' }}>
                            <center>
                                <select className="form-control" onChange={(e) => this.onChangeSelectWeight(e, index)} style={{ width: '60%' }} >
                                    <option disabled hidden selected>{item.weightlist}</option>
                                    {this.renderSelectOptionWeight()}
                                </select>
                            </center>
                        </th>
                        <th scope="col" style={{ width: '25%' }}>
                            <center>
                                <select className="form-control" onChange={(e) => this.onChangeSelectPrice(e, index)} style={{ width: '70%' }} >
                                    <option disabled hidden selected>{item.pricelist}</option>
                                    {this.renderSelectOptionPrice()}
                                </select>
                            </center>
                        </th>
                        <th scope="col" style={{ width: '25%' }}>
                            <center>
                                <center>
                                    <input defaultValue={item.totalstock} type="number" className="form-control" onChange={(e) => this.onChangeSelectTotalStock(e, index)} style={{ width: '30%' }} />
                                </center>
                            </center>
                        </th>
                        <th scope="col" style={{ width: '25%' }}>
                            <center>
                                <MDBIcon icon="check" size="lg" style={{ marginTop: 8 }} onClick={() => this.setState({ selectIdInput: null })} />
                            </center>
                        </th>
                    </tr>
                )
            }
            return (
                <tr className="text-center" key={index}>
                    <th scope="col" style={{ width: '25%' }}>
                        <center>
                            {item.weightlist}
                        </center>
                    </th>
                    <th scope="col" style={{ width: '25%' }}>
                        <center>
                            {item.pricelist}
                        </center>
                    </th>
                    <th scope="col" style={{ width: '25%' }}>
                        <center>
                            {item.totalstock}
                        </center>
                    </th>
                    <th scope="col" style={{ width: '25%' }}>
                        <center>
                            <MDBIcon icon="cog" size="lg" style={{ marginTop: 5, paddingRight: 20, cursor: 'pointer' }} onClick={() => this.setState({ selectIdInput: index })} />
                            <MDBIcon icon="trash" size="lg" style={{ marginTop: 5, paddingLeft: 20, cursor: 'pointer' }} onClick={() => this.deleteStock(item.idstock)} />
                        </center>
                    </th>
                </tr>
            )
        })
    }

    renderGetProduct = () => {
        const { previewImage, dataProduct } = this.state;
        return (
            <div className="text-center">
                <MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} size="center">
                    <MDBModalBody>
                        <div style={{ fontSize: 17 }}>
                            Anda akan mengubah produk {dataProduct.productname} ya:)
                            </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="primary" onClick={this.toggle(4)}>OK</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
                <center>
                    <div style={{ marginTop: 20 }}>NAMA PRODUK
                            <input className="form-control" type="text" ref="productname" defaultValue={dataProduct.productname} style={{ width: '25%', marginTop: 10 }} />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div style={{ marginTop: 30 }}>KELAS PRODUK</div>
                            <select className="form-control" onChange={(e) => this.setState({ selectGrade: e.target.value })} style={{ width: '50%', marginTop: 10 }} >
                                <option disabled hidden selected>PILIH GRADE/KELAS</option>
                                <option>Premium Grade</option>
                                <option>Second Grade</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <div style={{ marginTop: 30 }}>NAMA KATEGORI</div>
                            <select className="form-control" onChange={this.onChangeSelectCategory} style={{ width: '50%', marginTop: 10 }} >
                                <option disabled hidden selected>PILIH KATEGORI</option>
                                {this.renderSelectOptionCategory()}
                            </select>
                        </div>

                    </div>
                </center>
                <table class="table table-sm" style={{ marginTop: 30 }}>
                    <thead>
                        <tr className="text-center">
                            <th scope="col">BERAT PRODUK</th>
                            <th scope="col">HARGA PRODUK</th>
                            <th scope="col">STOK PRODUK</th>
                            <th scope="col">AKSI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderStockProduct()}
                    </tbody>
                    <tfoot>
                        <tr className="text-center">
                            <th scope="col" >
                                <center>
                                    <select className="form-control"
                                        onChange={(e) => this.setState({ addNewWeightId: e.target.value, addNewWeightName: e.target[e.target.selectedIndex].text })} style={{ width: '70%' }} >
                                        <option disabled hidden selected>TAMBAH BERAT</option>
                                        {this.renderSelectOptionWeight()}
                                    </select>
                                </center>
                            </th>
                            <th scope="col" >
                                <center>
                                    <select className="form-control"
                                        onChange={(e) => this.setState({ addNewPriceId: e.target.value, addNewPriceName: e.target[e.target.selectedIndex].text })} style={{ width: '70%' }} >
                                        <option disabled hidden selected>TAMBAH HARGA</option>
                                        {this.renderSelectOptionPrice()}
                                    </select>
                                </center>
                            </th>
                            <th scope="col" >
                                <center>
                                    <input placeholder="STOK" type="number" className="form-control" onChange={(e) => this.setState({ addNewTotalStock: e.target.value })} style={{ width: '30%' }} />
                                </center>
                            </th>
                            <th scope="col">
                                <center>
                                    <MDBIcon far icon="plus-square" size="lg" style={{ marginTop: 10, cursor: 'pointer' }} onClick={this.newDataStock} />
                                </center>
                            </th>
                        </tr>
                    </tfoot>
                </table>
                <div style={{ margin: 30 }}>
                    <div style={{ marginBottom: 10 }}>GAMBAR PRODUK</div>
                    {
                        previewImage
                            ?
                            <div>
                                <img src={previewImage} alt="productimage" style={{ height: 100, width: 100 }} />
                            </div>
                            :
                            <div>
                                <img src={API_URL_1 + dataProduct.productimage} alt="productimage" style={{ height: 100, width: 100 }} />
                            </div>
                    }
                    <input type="file" onChange={this.editProductImage} style={{ fontSize: 10 }} />
                </div>
                <MDBRow>
                    <MDBCol size="3"></MDBCol>
                    <MDBCol size="6">
                        <div style={{ marginBottom: 10 }}>UBAH DESKRIPSI</div>
                        <div className="input-group" >
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon">
                                    <i className="fas fa-pencil-alt prefix"></i>
                                </span>
                            </div>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="6" ref="productdescription" defaultValue={dataProduct.productdescription}></textarea>
                        </div>
                    </MDBCol>
                    <MDBCol size="3"></MDBCol>
                </MDBRow>
                <div style={{ marginTop: 20 }}>
                    <MDBBtn color="white" href="manageproducts">Kembali</MDBBtn>
                    <MDBBtn color="elegant" onClick={this.editProduct}>Simpan</MDBBtn>
                </div>
            </div>
        )
    }

    renderSelectOptionCategory = () => {
        return this.props.dataCategory.map((item, index) => {
            return (
                <option value={item.idcategory} key={index}>
                    {item.categoryname}
                </option>
            )
        })
    }

    renderSelectOptionWeight = () => {
        return this.props.dataWeight.map((item, index) => {
            return (
                <option value={item.idweight} key={index}>
                    {item.weightlist}
                </option>
            )
        })
    }

    renderSelectOptionPrice = () => {
        return this.props.dataPrice.map((item, index) => {
            return (
                <option value={item.idprice} key={index}>
                    {item.pricelist}
                </option>
            )
        })
    }

    render() {
        if (this.state.redirectProduct) {
            return (
                <Redirect to="manageallproduct">

                </Redirect>
            )
        }
        return (
            <div>
                <SidebarAdmin />
                <div style={{ marginLeft: '15%' }}>
                    <div class="w3-container w3-teal">
                        <center>
                            <h1>KELOLA PRODUK</h1>
                        </center>
                    </div>

                    <div class="w3-container">
                        <div className="container">
                            {this.renderGetProduct()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({ products, categories, weight, price, stock }) => {
    return {
        dataProduct: products.dataProduct,
        dataCategory: categories.dataCategory,
        dataWeight: weight.dataWeight,
        dataPrice: price.dataPrice,
        dataStock: stock.dataStock
    }
}

export default connect(mapStatetoProps, { getProductById, getCategory, getWeight, getPrice, getStock, editProducts, deleteStock })(DetailProduct);