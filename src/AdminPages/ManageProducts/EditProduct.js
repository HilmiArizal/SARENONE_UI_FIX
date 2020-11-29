import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getProductById, getCategory, getWeight, getPrice, getStock, editProducts, deleteStock } from '../../Redux/Actions';
import SidebarAdmin from '../../Components/SidebarAdmin';
import Axios from 'axios';
import { API_URL_1 } from '../../Helpers/API_URL';
import { MDBIcon } from 'mdbreact';
import './ManageProducts.css';


class EditProduct extends Component {

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

    onChangeSelectCategory = (e, index) => {
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
        let productcategoryId = this.state.changeCategoryId === '' ? this.state.dataProduct.idcategory : this.state.changeCategoryId;
        let productdescription = this.refs.productdescription.value;
        let productgrade = this.state.selectGrade === '' ? this.state.dataProduct.productgrade : this.state.selectGrade;
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
        console.log(data)
        if (productcategoryId === '' || productgrade === '') {
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
                    <tr className="section-stock" key={index}>
                        <th scope="col">
                            <select className="form-control" onChange={(e) => this.onChangeSelectWeight(e, index)} >
                                <option disabled hidden selected>{item.weightlist}</option>
                                {this.renderSelectOptionWeight()}
                            </select>
                        </th>
                        <th scope="col">
                            <select className="form-control" onChange={(e) => this.onChangeSelectPrice(e, index)} >
                                <option disabled hidden selected>{item.pricelist}</option>
                                {this.renderSelectOptionPrice()}
                            </select>
                        </th>
                        <th scope="col">
                            <input defaultValue={item.totalstock} type="number" className="form-control" onChange={(e) => this.onChangeSelectTotalStock(e, index)} />
                        </th>
                        <th scope="col" style={{ width: '15%' }}>
                            <MDBIcon icon="check" size="lg" className="icon-checklist" onClick={() => this.setState({ selectIdInput: null })} />
                        </th>
                    </tr>
                )
            }
            return (
                <tr className="text-center" key={index}>
                    <th scope="col">
                        <center>
                            {item.weightlist}
                        </center>
                    </th>
                    <th scope="col" >
                        <center>
                            {item.pricelist}
                        </center>
                    </th>
                    <th scope="col">
                        <center>
                            {item.totalstock}
                        </center>
                    </th>
                    <th scope="col" style={{ width: '15%' }} >
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
            <div className="section-edit-product">
                <div className="productname-title-edit">{dataProduct.productname}</div>
                <hr />
                <form className="form-edit-product">
                    <div className="section-productname">
                        <label>NAMA PRODUK</label>
                        <div> <input className="form-control" type="text" ref="productname" defaultValue={dataProduct.productname} /></div>
                    </div>
                    <div className="section-class-category">
                        <div className="row">
                            <div className="col-6">
                                <label style={{ marginTop: 20 }}>KELAS PRODUK</label>
                                <select className="form-control" onChange={(e) => this.setState({ selectGrade: e.target.value })} >
                                    <option disabled hidden selected>{dataProduct.productgrade}</option>
                                    <option>Premium Grade</option>
                                    <option>Second Grade</option>
                                </select>
                            </div>
                            <div className="col-6">
                                <label style={{ marginTop: 20 }}>NAMA KATEGORI</label>
                                <select className="form-control" onChange={this.onChangeSelectCategory}>
                                    <option disabled hidden selected>{dataProduct.categoryname}</option>
                                    {this.renderSelectOptionCategory()}
                                </select>
                            </div>
                        </div>
                    </div>
                    <table class="table table-sm" style={{ marginTop: 20 }}>
                        <thead>
                            <tr className="thead-edit-product">
                                <th scope="col"><label>BERAT PRODUK</label></th>
                                <th scope="col"><label>HARGA PRODUK</label></th>
                                <th scope="col"><label>STOK PRODUK</label></th>
                                <th scope="col"><label>AKSI</label></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderStockProduct()}
                        </tbody>
                        <tfoot>
                            <tr className="section-stock">
                                <th scope="col" >
                                    <center>
                                        <select className="form-control"
                                            onChange={(e) => this.setState({ addNewWeightId: e.target.value, addNewWeightName: e.target[e.target.selectedIndex].text })} >
                                            <option disabled hidden selected>TAMBAH BERAT</option>
                                            {this.renderSelectOptionWeight()}
                                        </select>
                                    </center>
                                </th>
                                <th scope="col" >
                                    <center>
                                        <select className="form-control"
                                            onChange={(e) => this.setState({ addNewPriceId: e.target.value, addNewPriceName: e.target[e.target.selectedIndex].text })} >
                                            <option disabled hidden selected>TAMBAH HARGA</option>
                                            {this.renderSelectOptionPrice()}
                                        </select>
                                    </center>
                                </th>
                                <th scope="col" >
                                    <center>
                                        <input placeholder="STOK" type="number" className="form-control" onChange={(e) => this.setState({ addNewTotalStock: e.target.value })} />
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
                    <div className="section-image" style={{ margin: 20 }}>
                        <label>GAMBAR PRODUK</label>
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
                        <input type="file" onChange={this.editProductImage} style={{ fontSize: 10, marginTop: 10 }} />
                    </div>
                    <div className="section-description">
                        <label >UBAH DESKRIPSI</label>
                        <div className="input-group" >
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon">
                                    <i className="fas fa-pencil-alt prefix"></i>
                                </span>
                            </div>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" ref="productdescription" defaultValue={dataProduct.productdescription}></textarea>
                        </div>
                    </div>

                </form>
                <hr />
                <div style={{ marginTop: 20 }}>
                    <div className="btn-action-edit-product" onClick={this.editProduct}>SIMPAN</div>
                </div>
                <Link to="manageproducts">
                    <div className="back-icon">
                        <MDBIcon icon="arrow-left" />
                    </div>
                </Link>
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
                <Redirect to="manageproducts">

                </Redirect>
            )
        }
        return (
            <div>
                <SidebarAdmin />
                <div style={{ marginLeft: '15%' }}>
                    <div className="w3-container w3-teal">
                        <div className="title-products-manage">KELOLA PRODUK</div>
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

export default connect(mapStatetoProps, { getProductById, getCategory, getWeight, getPrice, getStock, editProducts, deleteStock })(EditProduct);