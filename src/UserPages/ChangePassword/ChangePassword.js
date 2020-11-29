import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import { API_URL_1 } from '../../Helpers/API_URL';
import { MDBIcon } from 'mdbreact';
import './ChangePassword.css';


const ChangePassword = ({ iduser }) => {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [char, setChar] = useState(false);
    const [num, setNum] = useState(false);
    const [show, setShow] = useState(false);
    const [border, setBorder] = useState(false);
    const [upperCase, setUpperCase] = useState(false);
    const [redirectHome, setRedirectHome] = useState(false);


    const onBtnChangePassword = () => {
        const dataPassword = { oldPassword, newPassword, confirmNewPassword };
        if (char && num && upperCase) {
            Axios.patch(API_URL_1 + `users/changePassword?iduser=${iduser}`, dataPassword)
                .then((res) => {
                    alert(res.data)
                    setRedirectHome(true)
                })
                .catch((err) => {
                    alert(err.response.data)
                })
        } else {
            alert('Password tidak sesuai kriteria')
        }
    }

    const handleChange = (e) => {
        let num = /[0-9]/;
        setNewPassword(e.target.value);
        setNum(num.test(newPassword))
        setChar(newPassword.length > 7)
        setUpperCase(newPassword.charAt(0) === newPassword.charAt(0).toUpperCase())
        setBorder(num.test(newPassword) && newPassword.length > 7 && newPassword.charAt(0) === newPassword.charAt(0).toUpperCase())
        console.log(newPassword.charAt(0))
    }

    const showOpen = () => {
        setShow(true)
    }

    if (redirectHome) {
        return (
            <Redirect to="/"></Redirect>
        )
    }

    return (
        <div className="body-change-password">
            <div className="section-change-password">
                <Link to="/">
                    <div className="btn-back-home"><MDBIcon icon="arrow-circle-left" /></div>
                </Link>
                <div className="card-change-password">
                    <div className="title-change-password">Silahkan untuk mengubah password</div>
                    <hr />
                    <form className="form-change-password">
                        <label>Password Lama</label>
                        <div >
                            <input className="form-control" type="password" placeholder="Password lama" onChange={(e) => setOldPassword(e.target.value)} />
                        </div>
                        <label>Password Baru</label>
                        <div>
                            <input className="form-control" type="password" placeholder="Password baru" onChange={handleChange} onFocus={showOpen} />
                            {
                                show
                                    ?
                                    <div>
                                        <div className={char && num && upperCase ? 'test-password-good' : 'test-password-bad'}>{char && num && upperCase ? 'Keamanan password baik' : 'Keamanan password lemah'}</div>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        <label>Konfirmasi Password Baru</label>
                        <div>
                            <input className="form-control" type="password" placeholder="Konfirmasi password baru" onChange={(e) => setConfirmNewPassword(e.target.value)} style={{ borderColor: border ? "green" : "red" }} />
                        </div>
                        <hr />
                        <div>
                            <div className="btn-action-change-password" onClick={onBtnChangePassword}>SUBMIT</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStatetoProps = ({ user }) => {
    return {
        iduser: user.iduser
    }
}

export default connect(mapStatetoProps)(ChangePassword);