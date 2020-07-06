import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import '../CSS/LoginAdmin.css';
import { loginAdmin } from '../Redux/Actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


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
                <Helmet>
                    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
                    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
                    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                </Helmet>
                <div id="login">
                    <h3 class="text-center text-white pt-5">Login form</h3>
                    <div class="container">
                        <div id="login-row" class="row justify-content-center align-items-center">
                            <div id="login-column" class="col-md-6">
                                <div id="login-box" class="col-md-12">
                                    <form id="login-form" class="form" action="" method="post">
                                        <h3 class="text-center text-info">SARENONE ADMIN</h3>
                                        <div class="form-group" style={{ marginTop: 30 }}>
                                            <label for="username" class="text-info">Username:</label><br />
                                            <input type="text" name="username" class="form-control" ref="username" />
                                        </div>
                                        <div class="form-group">
                                            <label for="password" class="text-info">Password:</label><br />
                                            <input type="password" name="password" class="form-control" ref="password" />
                                        </div>
                                        <center>
                                            <div class="form-group" style={{ marginTop: 30 }} >
                                                <input type="button" value="submit" class="btn btn-info btn-md" onClick={this.onBtnLogin} />
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