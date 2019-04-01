import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { connect } from 'react-redux'
import { handleRegisterUser } from '../actions/authedUser'
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Spinner from './Spinner';
class Register extends Component {
    state = {
        form: {
            name: "", emailId: "", contactNo: "", password: ""
        },
        formErrorMessage: {
            name: "", emailId: "", contactNo: "", password: ""
        },
        formValid: {
            name: false, emailId: false, contactNo: false, password: false,
            buttonActive: false
        },
        successMessage: "",
        errorMessage: "",
        spinner: false
    }

    toggle() {
        this.setState({ disabled: !this.state.disabled });
    }
    handleChange = event => {
        let inputfield = event.target.name;
        let enteredvalue = event.target.value;
        let formObj = this.state.form;
        formObj[inputfield] = enteredvalue;
        this.setState({ form: formObj });
        this.validateField(inputfield, event.target.value);
    }
    validateField = (fieldName, value) => {
        var formmessage = ""
        switch (fieldName) {
            case "name":
                value.length === 0 ? formmessage = "Name is Required" : value.match(/^[A-Za-z]+(\s{1}[A-Za-z]+)*$/) ? formmessage = "" : formmessage = "Enter Valid Name";
                break;
            case "emailId":
                value.length === 0 ? formmessage = "Email is Required" : value.match(/^[a-z]+\@[a-z]+\.[a-z]{2,3}$/) ? formmessage = "" : formmessage = "Enter Valid Email";
                break;

            case "contactNo":
                value.length === 0 ? formmessage = "Phone is Required" : value.match(/^[789][0-9]{9}$/) ? formmessage = "" : formmessage = "Enter Valid Phone";
                break;

            case "password":
                value.length === 0 ? formmessage = "Password is Required" : value.match(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/) ? formmessage = "" : formmessage = "Password should contain atleast 1 special char, 1 Uppercase, 1 lowercase";
                break;
            default:
                break;
        }

        let fromErrObj = this.state.formErrorMessage;
        fromErrObj[fieldName] = formmessage
        this.setState({ formErrorMessage: fromErrObj })

        let status = false;
        if (formmessage === "") status = true
        var formValidObj = this.state.formValid;
        formValidObj[fieldName] = status;
        formValidObj.buttonActive = formValidObj.name && formValidObj.emailId && formValidObj.contactNo && formValidObj.password
        this.setState({ formValid: formValidObj })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ spinner: true })
        handleRegisterUser(this.props.dispatch, this.state.form).then(() => this.setState({ spinner: false })).catch(() => this.setState({ spinner: false }));
    }
    componentDidMount = () => {
        document.title = "Register | Wanderlust"
      }
    render() {
        const { wlAuthedUser } = this.props

        if (wlAuthedUser !== null && (wlAuthedUser.isError === undefined || wlAuthedUser.isError === null) && wlAuthedUser.isError === undefined) return <Redirect to='/home' />
        return (
            <div className="container-fluid mt-20-p-15">
                <div className="row">
                    {this.state.spinner ? (<Spinner />) : (
                        <div className="col-md-6 offset-md-3 ">
                            <div className="card p-3 bg-light">
                                <div className="card-body text-left">
                                    <div className="content-section introduction">
                                        <div className="feature-intro">
                                            <h2>Register now and Start Wandering</h2>
                                        </div><br />
                                    </div>

                                    <div className="content-section implementation">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="name">Name<span className="text-danger">*</span></label>
                                                <input className="form-control" type="text" name="name" placeholder="Enter Your Name" onChange={this.handleChange} />
                                                <span className="text-danger">{this.state.formErrorMessage.name}</span>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="emailId">Email Id<span className="text-danger">*</span></label>
                                                <input className="form-control" type="text" name="emailId" placeholder="Enter Your Email" onChange={this.handleChange} />
                                                <span className="text-danger">{this.state.formErrorMessage.emailId}</span>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="contactNo">Contact No.<span className="text-danger">*</span></label>
                                                <input className="form-control" type="text" name="contactNo" placeholder="Enter Contact Number" onChange={this.handleChange} />
                                                <span className="text-danger">{this.state.formErrorMessage.contactNo}</span>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="password">Password<span className="text-danger">*</span></label>
                                                <input className="form-control" type="password" name="password" placeholder="Enter Password" onChange={this.handleChange} />
                                                <span className="text-danger">{this.state.formErrorMessage.password}</span>
                                            </div>

                                            <div className="form-group">
                                                <button className="btn btn-primary btn-block" disabled={!this.state.formValid.buttonActive} type="submit">REGISTER</button>
                                            </div>
                                            {wlAuthedUser && <div className="text-danger">{wlAuthedUser.isError}</div>}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                </div>
            </div>

        )
    }
}
function mapStateToProps({ wlAuthedUser }) {
    return {
        wlAuthedUser
    }
}

export default connect(mapStateToProps)(Register)
