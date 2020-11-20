import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGroupByProduct, getCategory, getWeight, getPrice, deleteProduct, addProducts } from '../Redux/Actions';
import SidebarAdmin from '../Components/SidebarAdmin';
import { MDBRow, MDBCol, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput, MDBIcon } from 'mdbreact';
import NoImage from '../Images/NoImage.png';
import { API_URL_1 } from '../Helpers/API_URL';
import { Redirect } from 'react-router-dom';


class Products extends Component {

    state = {
        dataStock: [],
        dataStockName: [],

        changeCategoryId: '',
        changeCategoryName: '',
        changeWeightId: '',
        changeWeightName: '',
        changePriceId: '',
        changePriceName: '',
        selectGrade: '',

        image: undefined,
        previewImage: undefined,
        addImage: false,

        modal4: false,

        redirectAllProduct: false
    }

    componentDidMount() {
        this.props.getGroupByProduct();
        this.props.getCategory();
        this.props.getWeight();
        this.props.getPrice();
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

    onChangeSelectWeight = (e) => {
        this.setState({ changeWeightId: parseInt(e.target.value) })
        this.setState({ changeWeightName: e.target[e.target.selectedIndex].text })
    }

    onChangeSelectPrice = (e) => {
        this.setState({ changePriceId: parseInt(e.target.value) })
        this.setState({ changePriceName: e.target[e.target.selectedIndex].text })
    }

    addProductImage = (e) => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0],
                previewImage: URL.createObjectURL(e.target.files[0]),
                addImage: true
            })
        }
    }

    addStock = () => {
        const { dataStock, dataStockName } = this.state;
        let weight = this.state.changeWeightId;
        let price = this.state.changePriceId;
        let totalstock = this.refs.totalstock.value;
        let weightName = this.state.changeWeightName;
        let priceName = this.state.changePriceName;
        if (weight && price && totalstock) {
            dataStock.push([weight, price, parseInt(totalstock)])
            dataStockName.push([weightName, priceName, totalstock])
            this.setState({ dataStockName: dataStockName })
            alert('Stock Berhasil Ditambahkan')
        } else {
            alert('Isi dengan Benar!')
        }
    }

    addProduct = () => {
        let { image } = this.state;
        let productname = this.productname.value;
        let productcategoryId = this.state.changeCategoryId;
        let productdescription = this.refs.productdescription.value;
        let productgrade = this.state.selectGrade;
        let datastock = this.state.dataStock;
        let dataproducts = {
            productname,
            productcategoryId,
            productdescription,
            productgrade
        }
        let data = {
            dataproducts,
            datastock
        }
        if (datastock.length !== 0) {
            if (productname && productcategoryId && productdescription && image) {
                this.setState({ modal4: false })
                this.props.addProducts(data, image)
                this.setState({redirectAllProduct: true})
            } else {
                alert('Tolong isi dengan benar')
            }
        } else {
            alert('Tolong isi stocknya dulu')
        }
    }

    deleteProduct = (idproduct, idstock) => {
        this.props.deleteProduct(idproduct, idstock)
    }

    renderBodyAddProduct = () => {
        return this.state.dataStockName.map((item, index) => {
            return (
                <tr className="text-center" key={index}>
                    <th scope="col" style={{ width: '30%' }}>
                        <center>
                            {item[0]}
                        </center>
                    </th>
                    <th scope="col" style={{ width: '30%' }}>
                        <center>
                            {item[1]}
                        </center>
                    </th>
                    <th scope="col" style={{ width: '30%' }}>
                        <center>
                            {item[2]}
                        </center>
                    </th>
                    <th scope="col" style={{ width: '15%' }}>
                        <center>
                            <MDBIcon icon="check" size="lg" style={{ marginTop: 8 }} />
                        </center>
                    </th>
                </tr>
            )
        })
    }

    renderInputAddProduct = () => {
        const { previewImage } = this.state;
        return (
            <div className="text-center">
                <MDBRow>
                    <MDBCol size="4"></MDBCol>
                    <MDBCol size="4"><MDBInput label="Nama Produk" size="sm" inputRef={(productname) => this.productname = productname} /></MDBCol>
                    <MDBCol size="4"></MDBCol>
                </MDBRow>
                <center>
                    <div className="row">
                        <div className="col-6">
                            <select className="form-control" onChange={(e) => this.setState({selectGrade: e.target.value})} style={{ fontSize: 12, width: '80%', margin: 20 }}>
                                <option disabled hidden selected>Pilih Grade/Kelas</option>
                                <option>Premium Grade</option>
                                <option>Second Grade</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <select className="form-control" onChange={this.onChangeSelectCategory} style={{ fontSize: 12, width: '80%', margin: 20 }}>
                                <option disabled hidden selected>Pilih Kategori</option>
                                {this.renderSelectOptionCategory()}
                            </select>
                        </div>
                    </div>
                </center>
                <div class="w3-container" >
                    <div className="container">
                        <table class="table table-sm">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">BERAT</th>
                                    <th scope="col">HARGA</th>
                                    <th scope="col">STOK</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderBodyAddProduct()}
                            </tbody>
                            <tfoot>
                                <tr className="text-center">
                                    <th scope="col" style={{ width: '30%' }}>
                                        <center>
                                            <select className="form-control" onChange={this.onChangeSelectWeight} style={{ fontSize: 10, width: '70%' }} >
                                                <option disabled hidden selected>Pilih</option>
                                                {this.renderSelectOptionWeight()}
                                            </select>
                                        </center>
                                    </th>
                                    <th scope="col" style={{ width: '30%' }}>
                                        <center>
                                            <select className="form-control" onChange={this.onChangeSelectPrice} style={{ fontSize: 10, width: '80%' }} >
                                                <option disabled hidden selected>Pilih</option>
                                                {this.renderSelectOptionPrice()}
                                            </select>
                                        </center>
                                    </th>
                                    <th scope="col" style={{ width: '30%' }}>
                                        <center>
                                            <input placeholder="Tambah" type="number" className="form-control" ref="totalstock" style={{ fontSize: 10, width: '60%' }} />
                                        </center>
                                    </th>
                                    <th scope="col" style={{ width: '10%' }}>
                                        <center>
                                            <MDBIcon far icon="plus-square" size="lg" style={{ marginTop: 8, cursor: 'pointer' }} onClick={this.addStock} />
                                        </center>
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div style={{ margin: 20 }}>
                    {
                        previewImage
                            ?
                            <div>
                                <img src={previewImage} alt="productimage" style={{ height: 100, width: 140 }} />
                            </div>
                            :
                            <div>
                                <img src={NoImage} alt="productimage" style={{ height: 100, width: 140 }} />
                            </div>
                    }
                    <input type="file" onChange={this.addProductImage} style={{ fontSize: 10 }} />
                </div>
                <div className="input-group" style={{ padding: 20 }}>
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon">
                            <i className="fas fa-pencil-alt prefix"></i>
                        </span>
                    </div>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" style={{ fontSize: 10 }} ref="productdescription"></textarea>
                </div>
            </div>
        )
    }

    renderGetProduct = () => {
        return this.props.dataProduct.map((item, index) => {
            return (
                <tr className="text-center">
                    <td>{index + 1}</td>
                    <td>{item.productname}</td>
                    <td><img src={API_URL_1 + item.productimage} alt="imageProduct" style={{ height: 40, width: 60 }} /></td>
                    <td>
                        <MDBBtn color="primary" href={`detailproducts?idproduct=${item.idproduct}`} size="sm">Detail</MDBBtn>
                        <MDBBtn color="purple" size="sm" onClick={() => this.deleteProduct(item.idproduct, item.idstock)}>Hapus</MDBBtn>
                    </td>
                </tr>
            )
        })
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
                    {item.weightlist}gr
                </option>
            )
        })
    }

    renderSelectOptionPrice = () => {
        return this.props.dataPrice.map((item, index) => {
            return (
                <option value={item.idprice} key={index}>
                    Rp. {item.pricelist.toLocaleString()}
                </option>
            )
        })
    }

    render() {
        if(this.state.redirectAllProduct){
            return(
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
                    <center>
                        <MDBRow style={{ margin: 30 }}>
                            <MDBCol size="3"><MDBBtn href="manageallproduct" color="white">Semua Produk</MDBBtn></MDBCol>
                            <MDBCol size="3"><MDBBtn href="manageproducts" >Kelola Produk</MDBBtn></MDBCol>
                            <MDBCol size="3"><MDBBtn href="managecategories" color="white">Kelola Kategori</MDBBtn></MDBCol>
                            <MDBCol size="3"><MDBBtn href="manageweightlist" color="white">Kelola List</MDBBtn></MDBCol>
                        </MDBRow>
                    </center>
                    <center>
                        <MDBBtn size="sm" color="elegant" onClick={this.toggle(4)} style={{ marginBottom: 20 }}>Tambah Produk</MDBBtn>
                    </center>
                    <MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} fullHeight position="top">
                        <MDBModalHeader toggle={this.toggle(4)}>Produk baru nih, silahkan isi ya:)</MDBModalHeader>
                        <MDBModalBody>
                            {this.renderInputAddProduct()}
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggle(4)}>Close</MDBBtn>
                            <MDBBtn color="primary" onClick={this.addProduct}>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    <div class="w3-container">
                        <div className="container">
                            <table class="table table-sm">
                                <thead>
                                    <tr className="text-center">
                                        <th scope="col">NO.</th>
                                        <th scope="col">NAMA PRODUK</th>
                                        <th scope="col">GAMBAR PRODUK</th>
                                        <th scope="col">AKSI <div style={{ fontSize: 8 }}>*(Hapus: Termasuk List, Stok)</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderGetProduct()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({ products, categories, weight, price }) => {
    return {
        dataProduct: products.dataProduct,
        dataCategory: categories.dataCategory,
        dataWeight: weight.dataWeight,
        dataPrice: price.dataPrice
    }
}

export default connect(mapStatetoProps, { getGroupByProduct, getCategory, getPrice, getWeight, deleteProduct, addProducts })(Products);