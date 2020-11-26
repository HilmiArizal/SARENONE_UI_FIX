import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers_Admin } from '../../Redux/Actions';
import SidebarAdmin from '../../Components/SidebarAdmin';
import { MDBBtn } from 'mdbreact';
import { deleteAccount } from '../../Redux/Actions';
import './ManageUsers.css';


class ManageUsers extends Component {

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
                    <td>{item.status === 'unverified' ? <div className="status-unverified">{item.status}</div> : item.status}</td>
                    <td>{item.role}</td>
                    <td>{item.registerdate} / {item.registertime}</td>
                    <td>
                        <div className="btn-action-remove-users" onClick={() => this.deleteAccount(item.iduser)}>HAPUS AKUN</div>
                        {/* <MDBBtn size="sm" onClick={() => this.deleteAccount(item.iduser)}>Hapus Akun</MDBBtn> */}
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
                            <div className="title-users-manage">KELOLA USER</div>
                        </center>
                    </div>
                    <div class="w3-container">
                        <div className="container" style={{ marginTop: 50 }}>
                            <table class="table table-sm">
                                <thead>
                                    <tr className="thead-users-manage">
                                        <th scope="col"><div className="d-flex justify-content-center">NO. </div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">USERNAME</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">EMAIL</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">STATUS</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">ROLE</div></th>
                                        <th scope="col"><div className="d-flex justify-content-center">TANGGAL &amp; JAM REGISTRASI</div></th>
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

export default connect(mapStatetoProps, { getAllUsers_Admin, deleteAccount })(ManageUsers);