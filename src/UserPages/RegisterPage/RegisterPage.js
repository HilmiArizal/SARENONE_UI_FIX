import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { MDBContainer, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import { getAllUsers, registerUser } from '../../Redux/Actions';
import './RegisterPage.css';



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
            // console.log(err)
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
            <div className="body-register">
                <div className="section-register">
                    <MDBContainer>
                        <MDBCard>
                            <div className="section-register-1">
                                <MDBCardBody>
                                    <Link to="/">
                                        <div><MDBIcon far icon="times-circle" size="lg" style={{ color: 'black' }} /></div>
                                    </Link>
                                    <form>
                                        <p className="h4 text-center py-4">SILAHKAN DAFTAR!</p>
                                        <MDBContainer>
                                            <div className="">
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
                                                                        <div style={{ color: 'green', fontSize: 12 }}>Terlihat bagus</div>
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
                                                                        <div style={{ color: 'green', fontSize: 12 }}>Terlihat bagus juga</div>
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
        dataUsers: user.dataUsers
    }
}

export default connect(mapStatetoProps, { getAllUsers, registerUser })(RegisterPage);