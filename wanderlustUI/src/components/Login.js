import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSetWLAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import Spinner from './Spinner';



class Login extends Component {

  state = {
    contactNo: '', password: '',
    contactErrorMsg: '', passErrorMsg: '', formValid: false,
    redirectToRegister: false, spinner: false, loginError: ""
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((currentState) => ({
      ...currentState,
      [name]: value
    }));
    this.validateField(name, value);
  }

  componentDidMount = () => {
    document.title = "Login"
  }

  validateField = (fieldName, value) => {
    let contactErrorMsg;
    let passErrorMsg;
    let formValid;

    switch (fieldName) {

      case "contactNo":
        let cnoRegex = /^[1-9]\d{9}$/
        if (!value || value === "") {
          contactErrorMsg = "Please enter your contact number";

        } else if (!value.match(cnoRegex)) {
          contactErrorMsg = "Contact number should be a valid 10 digit number";

        } else {
          contactErrorMsg = "";

        }
        break;

      case "password":
        if (!value || value === "") {
          passErrorMsg = "Password is mandatory";
          // formValid.password = false;

        } else {
          passErrorMsg = "";

        }
        break;
      default:
        break;
    }

    this.setState((curr) => ({
      ...curr,
      passErrorMsg, contactErrorMsg
    }))
  }




  submitSignIn = (e) => {
    e.preventDefault();
    if (this.state.contactNo === "" || this.state.password === "") {
      this.setState({ loginError: "Please Enter Contact No. and Password" });
    } else {
      this.setState({ loginError: "" });
      this.setState({ spinner: true });
      const userLoginData = { contactNo: this.state.contactNo, password: this.state.password };
      handleSetWLAuthedUser(this.props.dispatch, userLoginData).then(() => this.setState({ spinner: false })).catch(() => this.setState({ spinner: false }));
    }

  }

  render() {
    const { wlAuthedUser } = this.props
    const { loginError } = this.state

    const { contactNo, password, contactErrorMsg, passErrorMsg } = this.state;

    if (wlAuthedUser !== null && (wlAuthedUser.isError === undefined || wlAuthedUser.isError === null)) {
      // NO ERROR and some wlAuthedUser
      return <Redirect to='/home' />
    } else if (this.state.redirectToRegister) return <Redirect to='/register' />

    return (
      <section id="loginPage" className="loginSection">
        <div className="container-fluid">
          <div className="row">
            {this.state.spinner ? (<Spinner />) :
              (
                <div className="col-md-6 offset-md-3 ">
                  <div className="card p-3 bg-light">
                    <div className="card-body text-left">
                      <h2>Please login to continue</h2>
                      <form className="form" onSubmit={this.submitSignIn}>
                        <div className="form-group">
                          <label htmlFor="uContactNo">Contact Number<span className="text-danger">*</span></label>
                          <input
                            type="number"
                            value={contactNo}
                            onChange={this.handleInputChange}
                            id="uContactNo"
                            name="contactNo"
                            className="form-control"
                          />
                        </div>
                        {contactErrorMsg && (
                          <span className="text-danger">
                            {contactErrorMsg}
                          </span>)
                        }
                        <div className="form-group">
                          <label htmlFor="uPass">Password<span className="text-danger">*</span></label>
                          <input
                            type="password"
                            value={password}
                            onChange={this.handleInputChange}
                            id="uPass"
                            name="password"
                            className="form-control"
                          />
                        </div>
                        {passErrorMsg && (
                          <span className="text-danger">
                            {passErrorMsg}
                          </span>)
                        }
                        <br />
                        <span><span className="text-danger">*</span> marked fields are mandatory</span>
                        <br />

                        <button type="submit" className="btn btn-primary">
                          Login</button>
                      </form>
                      <br />
                      {/* <!--can be a button or a link based on need --> */}
                      <button className="btn btn-primary" onClick={() => this.setState({ redirectToRegister: true })} >Click here to Register</button>
                      {wlAuthedUser && (<div className={'text-danger'}>{wlAuthedUser.isError}</div>)}
                      {loginError && (<div className={'text-danger'}>{loginError}</div>)}
                    </div>
                  </div>
                </div>)}
          </div>
        </div>
      </section>
    )



    // return (
    //   <div className="row">
    //     <div className="col-sm-6 offset-3">
    //       <h1>Please login to continue</h1>
    //       <form onSubmit={this.submitSignIn}>
    //         <div className="form-group">
    //           <input name="contactNo" onChange={this.handleInputChange} className="form-control" type="number" placeholder="Enter phone number" value={this.state.contactNo} />
    //           {this.state.contactErrorMsg !== '' && (<div className='text-danger'>{this.state.contactErrorMsg}</div>)}
    //         </div>
    //         <div className="form-group">
    //           <input name="password" onChange={this.handleInputChange} className="form-control" type="password" placeholder="Enter your password" value={this.state.password} />
    //           {this.state.passErrorMsg !== '' && (<div className='text-danger'>{this.state.passErrorMsg}</div>)}
    //         </div>
    //         <div className="form-group">
    //           <button className={'btn btn-block btn-outline-success'} type="submit">Login								</button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // )
  }
}


/**
* @description - mapStateToProps({wyrAuthedUser, wyrUsers}) - REDUX-STORE link 
* Will make {wyrAuthedUser, wyrUsers} available as external PROPS for Login component
*/
function mapStateToProps({ wlAuthedUser }) {
  return {
    wlAuthedUser,
  }
}

/**
* exporting the "connected" component
* Login component is now connected to the REDUX-STORE
*/
export default connect(mapStateToProps)(Login)

