import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBMask, MDBView, MDBIcon, MDBAnimation } from 'mdbreact';
import form1 from '../Images/FORM-1.png';
import form2 from '../Images/FORM-2.png';
import { getAllUsers, registerUser } from '../Redux/Actions';
import { connect } from 'react-redux';
import '../CSS/Login.css';


class RegisterPage extends Component {

    state = {
        showPassword: false,
        showConfirmPassword: false,

        char: false,
        num: false,
        show: false,
        border: false,

        whileStop: false,

        redirectLogin: false
    }

    componentDidMount() {
        this.props.getAllUsers();
    }

    handleChange = (e) => {
        let password = e.target.value;
        let num = /[0-9]/;
        this.setState({
            num: num.test(password),
            char: password.length > 7,
            border: (num.test(password) && (password.length > 7))
        })
    }

    showOption = () => {
        this.setState({ show: true })
    }

    onBtnRegister = async () => {
        try {
            let { whileStop, char, num } = this.state;
            const { dataUsers } = this.props;
            let username = this.username.value;
            let email = this.email.value;
            let password = this.password.value;
            let confirmPassword = this.confirmPassword.value;
            if (username === '' || email === '' || password === '' || confirmPassword === '') {
                alert('Harus di isi semua!')
            } else {
                if (password !== confirmPassword) {
                    alert('Password harus sama!')
                } else {
                    for (var i = 0; i < dataUsers.length; i++) {
                        if (username === dataUsers[i].username) {
                            alert('Username tersedia!')
                            whileStop = false
                            break;
                        } else {
                            whileStop = true
                        }
                    }
                    if (whileStop) {
                        if (char && num) {
                            let dataRegister = { username, email, password }
                            this.props.registerUser(dataRegister)
                            this.setState({ redirectLogin: true })
                            alert('Berhasil')
                        } else {
                            alert('Tidak Tepat')
                        }
                    }
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { redirectLogin, show, char, num, border } = this.state;
        if (redirectLogin) {
            return (
                <Redirect to="/login">

                </Redirect>
            )
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
                                                    label="Username"
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
                                                    label="Email"
                                                    value="hilmi.arizal36@gmail.com"
                                                    icon="envelope"
                                                    group
                                                    type="email"
                                                    validate
                                                    error="wrong"
                                                    success="right"
                                                    size="sm"
                                                    ref="email"
                                                    inputRef={(email) => this.email = email}
                                                />
                                                <MDBInput
                                                    label="Password"
                                                    icon="lock"
                                                    group
                                                    type={this.state.showPassword ? "text" : "password"}
                                                    validate
                                                    size="sm"
                                                    ref="password"
                                                    inputRef={(password) => this.password = password}
                                                    onChange={this.handleChange} onFocus={this.showOption}
                                                />
                                                <i className={this.state.showPassword ? "fa fa-eye-slash register" : "fa fa-eye register"}
                                                    onClick={() => this.setState({ showPassword: !this.state.showPassword })}>
                                                </i>
                                                <MDBInput
                                                    label="Confirm password"
                                                    icon="exclamation-triangle"
                                                    group
                                                    type={this.state.showConfirmPassword ? "text" : "password"}
                                                    validate
                                                    error="wrong"
                                                    success="right"
                                                    size="sm"
                                                    inputRef={(confirmPassword) => this.confirmPassword = confirmPassword}
                                                    style={{ borderColor: border ? 'green' : 'red' }}
                                                />
                                                <i className={this.state.showConfirmPassword ? "fa fa-eye-slash confirmRegis" : "fa fa-eye confirmRegis"}
                                                    onClick={() => this.setState({ showConfirmPassword: !this.state.showConfirmPassword })}>
                                                </i>
                                            </div>
                                            <div>
                                                {
                                                    show
                                                        ?
                                                        <div>
                                                            {
                                                                char
                                                                    ?
                                                                    <center>
                                                                        <div style={{ color: 'green', fontSize:12 }}>Password 8 karakter oke</div>
                                                                    </center>
                                                                    :
                                                                    <center>
                                                                        <div style={{ color: 'red', fontSize: 12 }}>Password harus 8 karakter!</div>
                                                                    </center>

                                                            }
                                                            {
                                                                num
                                                                    ?
                                                                    <center>
                                                                        <div style={{ color: 'green', fontSize:12 }}>Password berikut angka oke juga</div>
                                                                    </center>
                                                                    :
                                                                    <center>
                                                                        <div style={{ color: 'red', fontSize: 12 }}>Password disertai angka!</div>
                                                                    </center>

                                                            }
                                                        </div>
                                                        :
                                                        null
                                                }
                                            </div>
                                        </MDBContainer>
                                        <center>
                                            {
                                                this.state.char && this.state.num
                                                    ?
                                                    <MDBBtn onClick={this.onBtnRegister} color="#c62828 red darken-3" size="sm" style={{ width: '80%', color: 'white', borderRadius: 50 }}>
                                                        DAFTAR
                                            </MDBBtn>
                                                    :
                                                    <MDBBtn disabled={this.onBtnRegister} color="#c62828 red darken-3" size="sm" style={{ width: '80%', color: 'white', borderRadius: 50 }}>
                                                        DAFTAR
                                            </MDBBtn>
                                            }
                                            <div>Sudah punyak akun ? <Link to="login">Masuk disini</Link></div>
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
        dataUsers: user.dataUsers
    }
}

export default connect(mapStatetoProps, { getAllUsers, registerUser })(RegisterPage);