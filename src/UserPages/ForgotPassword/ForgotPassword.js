import Axios from 'axios';
import { MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { API_URL_1 } from '../../Helpers/API_URL';
import './ForgotPassword.css';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [modal, setModal] = useState(true);
    const [success, setSuccess] = useState(false);

    const toggle = () => {
        setModal(false)
    }

    const onBtnSendMail = () => {
        Axios.post(API_URL_1 + `users/forgotPassword`, { email })
            .then((res) => {
                // alert(res.data)
                setSuccess(true)
                // setModal(false)
            })
            .catch((err) => {
                alert(err.response.data)
            })
    }

    if (!modal) {
        return (
            <Redirect to="login"></Redirect>
        )
    }


    return (
        <div className="body-forgot-password">
            {
                success
                    ?
                    <MDBModal isOpen={modal} toggle={setModal} centered>
                        <MDBModalHeader toggle={toggle}>Berhasil!</MDBModalHeader>
                        <MDBModalBody>
                            <div className="card-forgot-password">
                                <div className="section-forgot-password">
                                    <div>
                                       <div style={{fontSize:'90%', textAlign:"center"}}>Silahkan untuk cek email!</div>
                                    </div>
                                </div>
                            </div>
                        </MDBModalBody>
                    </MDBModal>
                    :
                    <MDBModal isOpen={modal} toggle={setModal} centered>
                        <MDBModalHeader toggle={toggle}>Masukan email anda!</MDBModalHeader>
                        <MDBModalBody>
                            <div className="card-forgot-password">
                                <div className="section-forgot-password">
                                    <div>
                                        <input className="form-control" type="text" placeholder="Masukan email" onChange={(e) => setEmail(e.target.value)} style={{fontSize:"90%"}} />
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div className="btn-forgot-password" onClick={onBtnSendMail}>SUBMIT</div>
                                </div>
                            </div>
                        </MDBModalBody>
                    </MDBModal>
            }
        </div>
    )
}

export default ForgotPassword;