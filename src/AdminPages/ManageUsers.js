import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers_Admin } from '../Redux/Actions';
import SidebarAdmin from '../Components/SidebarAdmin';
import { MDBBtn } from 'mdbreact';
import { deleteAccount } from '../Redux/Actions';


class ManageUser extends Component {

    componentDidMount() {
        this.props.getAllUsers_Admin();
    }

    deleteAccount = (iduser) => {
        this.props.deleteAccount(iduser)
    }

    renderGetAllUser = () => {
        return this.props.dataUsers_Admin.map((item, index) => {
            return (
                <tr className="text-center">
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.status === 'unverified' ? <div style={{backgroundColor:'grey'}}>{item.status}</div>: item.status}</td>
                    <td>{item.registerdate} ;  {item.registertime}</td>
                    <td>
                        <MDBBtn size="sm" onClick={() => this.deleteAccount(item.iduser)}>Hapus Akun</MDBBtn>
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
                    <div class="w3-container w3-teal">
                        <center>
                            <h1>KELOLA USER</h1>
                        </center>
                    </div>
                    <div class="w3-container">
                        <div className="container">
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col"><div className="d-flex justify-content-center">NO. </div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">USERNAME</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">EMAIL</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">STATUS</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">TANGGAL &amp; JAM DAFTAR</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">AKSI</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderGetAllUser()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({ admin }) => {
    return {
        dataUsers_Admin: admin.dataUsers_Admin
    }
}

export default connect(mapStatetoProps, { getAllUsers_Admin, deleteAccount })(ManageUser);