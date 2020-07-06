import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBMask, MDBView, MDBIcon } from 'mdbreact';
import form1 from '../Images/FORM-1.png';
import form2 from '../Images/FORM-2.png';
import gmailButton from '../Images/GmailButton.png';
import fbButton from '../Images/FacebookButton.png';
import twitterButton from '../Images/TwitterButton.png';
import { loginUser } from '../Redux/Actions'
import { connect } from 'react-redux';


class LoginPage extends Component {


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
            <div style={{ marginTop: 80 }}>
                <Helmet>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
                    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
                </Helmet>
                <MDBContainer>
                    <MDBCard>
                        <MDBRow>
                            <MDBCol md="4">
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
                                                    type="password"
                                                    validate
                                                    size="sm"
                                                    inputRef={(password) => this.password = password}
                                                />
                                            </div>
                                            <center>
                                                <div>
                                                    Lupa password ? <Link to="">Klik disini</Link>
                                                </div>
                                            </center>
                                            <MDBCard style={{ marginTop: 30, justifyContent: "center", padding: 20 }}>
                                                <div className="text-center" style={{ marginBottom: 20 }}>Login melalui:</div>
                                                <MDBRow>
                                                    <MDBCol size="4">
                                                        <div><img src={gmailButton} alt="gmail-Login" style={{ width: 60, height: 30, borderRadius: 5, cursor: 'pointer' }} onClick={this.otherBtnLogin} /></div>
                                                    </MDBCol>
                                                    <MDBCol size="4">
                                                        <div><img src={fbButton} alt="fb-Login" style={{ width: 60, height: 30, borderRadius: 5, cursor: 'pointer' }} onClick={this.otherBtnLogin} /></div>
                                                    </MDBCol>
                                                    <MDBCol size="4">
                                                        <div><img src={twitterButton} alt="twitter-Login" style={{ width: 60, height: 30, borderRadius: 5, cursor: 'pointer' }} onClick={this.otherBtnLogin} /></div>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCard>
                                        </MDBContainer>
                                        <center>
                                            <MDBBtn onClick={this.onBtnLogin} color="#c62828 red darken-3" size="sm" style={{ width: '80%', color: 'white', borderRadius: 50, marginTop: 30 }}>
                                                MASUK
                                            </MDBBtn>
                                            <div>Belum punyak akun ? <Link to="register">Klik disini</Link></div>
                                        </center>
                                    </form>
                                </MDBCardBody>
                            </MDBCol>
                            <MDBCol md="8">
                                <MDBCard>
                                    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
                                        <ol class="carousel-indicators">
                                            <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                                            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                                        </ol>
                                        <div class="carousel-inner">
                                            <div class="carousel-item active">
                                                <MDBView>
                                                    <img src={form2} class="d-block w-100" alt="carousel-Produk" />
                                                    <div class="carousel-caption d-none d-md-block"></div>
                                                    <MDBMask pattern={5}>

                                                    </MDBMask>
                                                </MDBView>
                                            </div>
                                            <div class="carousel-item">
                                                <MDBView>
                                                    <img src={form1} class="d-block w-100" alt="carousel-Produk" />
                                                    <div class="carousel-caption d-none d-md-block"></div>
                                                    <MDBMask pattern={5}>

                                                    </MDBMask>
                                                </MDBView>
                                            </div>
                                        </div>
                                        <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true" style={{ backgroundColor: "black", height: 50, width: 50 }}></span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                        <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true" style={{ backgroundColor: "black", height: 50, width: 50 }}></span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                    </div>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBContainer>
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