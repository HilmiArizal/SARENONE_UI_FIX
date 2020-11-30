import Axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { API_URL_1 } from '../../Helpers/API_URL';
import './ResetPassword.css';


const ResetPassword = (props) => {

    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [char, setChar] = useState(false);
    const [num, setNum] = useState(false);
    const [upper, setUpper] = useState(false);
    const [border, setBorder] = useState(false);
    const [show, setShow] = useState(false);
    const [redirectLogin, setRedirectLogin] = useState(false);


    const handleChangeResetPassword = (e) => {
        let num = /[0-9]/;
        setNewPassword(e.target.value);
        setNum(num.test(newPassword));
        setChar(newPassword.length > 6);
        setUpper(newPassword.charAt(0) === newPassword.charAt(0).toUpperCase())
        setBorder(num.test(newPassword) && newPassword.length > 6 && newPassword.charAt(0) === newPassword.charAt(0).toUpperCase())
    }

    const onBtnResetPassword = () => {
        let splitToken = props.location.search.split('')
        let token = splitToken.slice(7).join("")
        const dataPassword = { newPassword, confirmNewPassword, token };
        if (char && num && upper) {
            Axios.patch(API_URL_1 + `users/resetPassword`, dataPassword)
            .then((res) => {
                alert(res.data)
                setRedirectLogin(true)
            })
            .catch((err) => {
                alert(err.response.data)
            })
        }else{
            alert('Karakter tidak sesuai kriteria!')
        }
    }

    const showOpen = () => {
        setShow(true)
    }

    if(redirectLogin){
        return (
            <Redirect to="/login">

            </Redirect>
        )
    }

    return (
        <div className="body-reset-password">
            <div className="card-reset-password">
                <form className="section-reset-password">
                    <div className="title-reset-password">RESET PASSWORD</div>
                    <hr />
                    <div className="password-reset">
                        <label>Password Baru</label>
                        <div>
                            <input className="form-control" type="text" placeholder="Masukan Password Baru" onChange={handleChangeResetPassword} onFocus={showOpen} />
                            {/* <div style={{ color: 'red', fontSize: '80%' }}>Keamanan password lemah</div> */}
                            {
                                show
                                    ?
                                    <div>
                                        <div className={char && num && upper ? "test-password-good" : "test-password-bad"}>{char && num && upper ? "Keamanan password baik" : "Keamanan password lemah (Huruf pertama besar, disertai angka dan minimal 8 karakter)"}</div>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                    <div className="password-reset">
                        <label>Konfirmasi Password Baru</label>
                        <div>
                            <input className="form-control" type="text" placeholder="Masukan Konfirmasi Password Baru" onChange={(e) => setConfirmNewPassword(e.target.value)} style={{ borderColor: border ? "green" : "red" }} />
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div className="btn-reset-password" onClick={onBtnResetPassword}>SUBMIT</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword;