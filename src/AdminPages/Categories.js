import React, { Component } from 'react';
import NoImage from '../Images/NoImage.png';
import { MDBBtn, MDBIcon, MDBRow, MDBCol } from 'mdbreact';
import { connect } from 'react-redux';
import { getCategory, addCategory, editCategory, deleteCategory } from '../Redux/Actions';
import { API_URL_1 } from '../Helpers/API_URL';
import SidebarAdmin from '../Components/SidebarAdmin';


class CategoriesManage extends Component {

    state = {
        image: undefined,
        previewImage: undefined,
        addImage: false,

        imageEdit: undefined,
        previewImageEdit: undefined,
        changeImage: false,

        selectIdInput: null
    }

    componentDidMount() {
        this.props.getCategory()
    }

    addCategoryImage = (e) => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0],
                previewImage: URL.createObjectURL(e.target.files[0]),
                addImage: true
            })
        }
    }

    editCategoryImage = (e) => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0],
                previewImageEdit: URL.createObjectURL(e.target.files[0]),
                changeImage: true
            })
        }
    }

    addCategories = () => {
        let { image } = this.state;
        let categoryname = this.refs.categoryname.value;
        let addimage = this.state.addImage;
        let data = { categoryname }
        let datacategory = { data, addimage }
        if (categoryname === '' || addimage === false) {
            alert('Harus Di Isi!')
        } else {
            this.props.addCategory(image, datacategory)
        }
    }

    editCategories = (idcategory) => {
        let { image } = this.state;
        let categoryname = this.refs.categoryname.value;
        let changeimage = this.state.changeImage;
        let data = { categoryname }
        let datacategory = { data, changeimage }
        if (categoryname === '' || changeimage === false) {
            alert('Harus Di Isi!')
        } else {
            this.props.editCategory(idcategory, image, datacategory)
            this.setState({selectIdInput: null})
        }
    }

    deleteCategories = (idcategory, categoryimage) => {
        this.props.deleteCategory(idcategory, categoryimage)
    }

    renderInputEditDeleteCategories = () => {
        const { previewImageEdit, selectIdInput } = this.state;
        return this.props.categories.map((item, index) => {
            if (selectIdInput === index) {
                return (
                    <tr className="text-center">
                        <td>{index + 1}</td>
                        <td>
                            <center>
                                <input className="form-control" type="text" defaultValue={item.categoryname} ref="categoryname" style={{ width: 150, fontSize: 10 }} />
                            </center>
                        </td>
                        <td>
                            {
                                previewImageEdit
                                    ?
                                    <div>
                                        <img src={previewImageEdit} alt="categoryimage" style={{ height: 40, width: 40 }} />
                                    </div>
                                    :
                                    <div>
                                        <img src={API_URL_1 + item.categoryimage} alt="categoryimage" style={{ height: 40, width: 40 }} />
                                    </div>
                            }
                            <input type="file" onChange={this.editCategoryImage} style={{ fontSize: 10 }} />
                        </td>
                        <td>
                            <MDBBtn size="sm" color="primary" onClick={() => this.setState({ selectIdInput: null })}>Batal</MDBBtn>
                            <MDBBtn size="sm" onClick={() => this.editCategories(item.idcategory)}>Simpan</MDBBtn>
                        </td>
                    </tr>
                )
            }
            return (
                <tr className="text-center">
                    <td>{index + 1}</td>
                    <td>{item.categoryname}</td>
                    <td>
                        <img src={API_URL_1 + item.categoryimage} alt="categoryimage" waves width="40px" />
                    </td>
                    <td>
                        <MDBBtn size="sm" color="primary" onClick={() => this.setState({ selectIdInput: index })}>Ubah</MDBBtn>
                        <MDBBtn size="sm" color="purple" onClick={() => this.deleteCategories(item.idcategory, item.categoryimage)}>Hapus</MDBBtn>
                    </td>
                </tr>
            )
        })
    }

    renderInputAddCategories = () => {
        const { previewImage } = this.state;
        return (
            <tr className="text-center">
                <td><MDBIcon icon="plus" /></td>
                <td>
                    <center>
                        <input className="form-control" type="text" placeholder="Nama Kategori" ref="categoryname" style={{ width: 150, fontSize: 10 }} />
                    </center>
                </td>
                <td>
                    {
                        previewImage
                            ?
                            <div>
                                <img src={previewImage} alt="categoryimage" style={{ height: 40, width: 40 }} />
                            </div>
                            :
                            <div>
                                <img src={NoImage} alt="categoryimage" style={{ height: 40, width: 40 }} />
                            </div>
                    }
                    <input type="file" onChange={this.addCategoryImage} />
                </td>
                <td>
                    <MDBBtn size="sm" color="elegant" onClick={this.addCategories}>TAMBAH</MDBBtn>
                </td>
            </tr>
        )
    }

    render() {
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
                            <MDBCol size="3"><MDBBtn href="manageproducts" color="white">Kelola Produk</MDBBtn></MDBCol>
                            <MDBCol size="3"><MDBBtn href="managecategories">Kelola Kategori</MDBBtn></MDBCol>
                            <MDBCol size="3"><MDBBtn href="manageweightlist" color="white">Kelola List</MDBBtn></MDBCol>
                        </MDBRow>
                    </center>
                    <div class="w3-container">
                        <div className="container">
                            <table class="table table-sm">
                                <thead>
                                    <tr className="text-center">
                                        <th scope="col">NO. </th>
                                        <th scope="col">NAMA KATEGORI</th>
                                        <th scope="col">GAMBAR KATEGORI</th>
                                        <th scope="col">AKSI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderInputEditDeleteCategories()}
                                </tbody>
                                <tfoot>
                                    {this.renderInputAddCategories()}
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStatetoProps = ({ categories }) => {
    return {
        categories: categories.dataCategory
    }
}


export default connect(mapStatetoProps, { getCategory, addCategory, editCategory, deleteCategory })(CategoriesManage);