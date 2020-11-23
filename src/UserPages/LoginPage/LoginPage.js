import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { loginUser } from '../../Redux/Actions'
import twitterButton from '../../Images/TwitterButton.png';
import gmailButton from '../../Images/GmailButton.png';
import fbButton from '../../Images/FacebookButton.png';
import newLogoSarenOne from '../../Images/NewLogo.png';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBMask, MDBView, MDBIcon } from 'mdbreact';
import './LoginPage.css';


class LoginPage extends Component {

    state = {
        showPassword: true
    }

    onBtnLogin = () => {
        let username = this.username.value;
        let password = this.password.value;
        let dataLogin = { username, password }
        this.props.loginUser(dataLogin)
    }

    otherBtnLogin = () => {
        alert('Maaf untuk sementara belum bisa mendaftar melalui ini')
    }

    render() {
        if (this.props.status === 'unverified') {
            return (
                <Redirect to="/unverified">

                </Redirect>
            )
        } else {
            if (this.props.role === 'user') {
                return (
                    <Redirect to="/">

                    </Redirect>
                )
            }
        }
        return (
            <div className="body-login">
                <div className="section-login">

                    <Helmet>
                        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
                        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
                    </Helmet>
                    <MDBContainer>
                        <MDBCard>
                            <div className="section-login-1">
                                <div className="section-login-left">
                                    <MDBCardBody>
                                        <Link to="/">
                                            <div><MDBIcon far icon="times-circle" size="lg" style={{ color: 'black' }} /></div>
                                        </Link>
                                        <form>
                                            <p className="h4 text-center py-4">HI, SARENONE CUSTOMER</p>
                                            <MDBContainer>
                                                <div className="grey-text">
                                                    <MDBInput
                                                        label="Username/Email"
                                                        icon="user"
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                        size="sm"
                                                        inputRef={(username) => this.username = username}
                                                    />
                                                    <MDBInput
                                                        label="Password"
                                                        icon="lock"
                                                        group
                                                        type={this.state.showPassword ? "password" : "text"}
                                                        validate
                                                        size="sm"
                                                        inputRef={(password) => this.password = password}
                                                    />
                                                    <i className={this.state.showPassword ? "fa fa-eye password-icon" : "fa fa-eye-slash password-icon"}
                                                        onClick={() => this.setState({ showPassword: !this.state.showPassword })}>
                                                    </i>
                                                </div>
                                                <center>
                                                    <div>
                                                        Lupa password ? <Link to="">Klik disini</Link>
                                                    </div>
                                                </center>
                                                <MDBCard style={{ marginTop: 30, justifyContent: "center", padding: 20 }}>
                                                    <div className="text-center" style={{ marginBottom: 20 }}>Login melalui:</div>
                                                    <div className="card-alternative-login">
                                                        <div><img src={gmailButton} alt="gmail-Login" style={{ width: 60, height: 30, borderRadius: 5, cursor: 'pointer' }} onClick={this.otherBtnLogin} /></div>

                                                        <div><img src={fbButton} alt="fb-Login" style={{ width: 60, height: 30, borderRadius: 5, cursor: 'pointer' }} onClick={this.otherBtnLogin} /></div>

                                                        <div><img src={twitterButton} alt="twitter-Login" style={{ width: 60, height: 30, borderRadius: 5, cursor: 'pointer' }} onClick={this.otherBtnLogin} /></div>
                                                    </div>

                                                </MDBCard>
                                            </MDBContainer>
                                            <center>
                                                <MDBBtn id="myBtn" onClick={this.onBtnLogin} color="#c62828 red darken-3" size="sm" style={{ width: '80%', color: 'white', borderRadius: 50, marginTop: 30 }}>
                                                    MASUK
                                            </MDBBtn>
                                                <div>Belum punyak akun ? <Link to="register">Klik disini</Link></div>
                                            </center>
                                        </form>
                                    </MDBCardBody>
                                </div>
                                <div className="section-login-right">
                                    <MDBCard>
                                        <MDBView>
                                            <img src={newLogoSarenOne} className="d-block w-100" alt="carousel-Produk" id="img-Login" />
                                            <div class="carousel-caption d-none d-md-block"></div>
                                            <MDBMask pattern={5}>

                                            </MDBMask>
                                        </MDBView>
                                    </MDBCard>
                                </div>
                            </div>

                        </MDBCard>
                    </MDBContainer>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({ user }) => {
    return {
        role: user.role,
        status: user.status
    }
}

export default connect(mapStatetoProps, { loginUser })(LoginPage);