import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { loginAdmin } from '../../Redux/Actions';
import { connect } from 'react-redux';
import './LoginAdmin.css';


class LoginAdmin extends Component {

    state = {}

    onBtnLogin = () => {
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        let datalogin = {
            username, password
        }
        this.props.loginAdmin(datalogin);
    }

    render() {
        if (this.props.role === 'admin') {
            return (
                <Redirect to="homeadmin">

                </Redirect>
            )
        }

        return (
            <div>
                <div className="body-login-admin">
                    <div class="container">
                        <div id="login-row" class="row justify-content-center align-items-center">
                            <div id="login-column" class="col-md-6">
                                <div id="login-box" class="col-md-12">
                                    <form className ="card-login-admin">
                                        <h3 class="text-center" id="text-info-title">SARENONE ADMIN</h3>
                                        <hr/>
                                        <div class="form-group" style={{ marginTop: 30 }}>
                                            <label for="username" id="text-info">Username:</label><br />
                                            <input type="text" name="username" class="form-control" ref="username" />
                                        </div>
                                        <div class="form-group">
                                            <label for="password" id="text-info">Password:</label><br />
                                            <input type="password" name="password" class="form-control" ref="password" />
                                        </div>
                                        <center>
                                            <div class="form-group" style={{ marginTop: 30 }} >
                                                <input type="button" value="submit" class="btn btn-md" id="btn-custom-admin" onClick={this.onBtnLogin} />
                                            </div>
                                        </center>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({ user }) => {
    return {
        role: user.role
    }
}

export default connect(mapStatetoProps, { loginAdmin })(LoginAdmin);