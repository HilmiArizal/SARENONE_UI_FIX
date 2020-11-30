import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers_Admin } from '../../Redux/Actions';
import SidebarAdmin from '../../Components/Navbar/SidebarAdmin';
import { deleteAccount } from '../../Redux/Actions';
import './ManageUsers.css';


class ManageUsers extends Component {

    state = {
        search: ''
    }

    componentDidMount() {
        this.props.getAllUsers_Admin();
    }

    deleteAccount = (iduser) => {
        this.props.deleteAccount(iduser)
    }

    render() {
        let filteredName = this.props.dataUsers_Admin.filter(
            (item) => {
                return item.username.indexOf(this.state.search) !== -1;
            }
        )
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
                            <form className="form-search-admin">
                                <input type="text" className="form-control" placeholder="Cari user" onChange={(e) => this.setState({
                                    search: e.target.value
                                })} />
                            </form>
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
                                    {
                                        filteredName.map((item, index) => {
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
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
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