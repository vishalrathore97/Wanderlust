import React, { Component } from 'react'
import { FaBell } from 'react-icons/fa';
import { Growl } from 'primereact/growl';

export default class ContactSection extends Component {
  constructor() {
    super();
    this.showInfo = this.showInfo.bind(this);
    this.state = {
      emailId: '',
      successMessage: ''
    }
  }


  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(() => ({ [name]: value }))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ successMessage: "Thank you for subscribing. Updates will be sent to the subscribing Email ID" })
    this.showInfo("Thank you for subscribing. Updates will be sent to the subscribing Email ID")
  }
  showInfo(successMessage) {
    this.growl.show({ severity: 'info', summary: successMessage });
  }

  render() {
    return (
      <section id="signup" className="signup-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-10 col-lg-8 mx-auto text-center">
              <h2 className="text-white mb-5">Subscribe to receive updates!</h2>
              <form className="form-inline d-flex" onSubmit={this.handleSubmit}>
                <input
                  type="email"
                  className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
                  id="inputEmail"
                  name="emailId"
                  value={this.state.emailId}
                  onChange={this.handleChange}
                  placeholder="Enter email address..."
                />
                <button type="submit" className="btn btn-primary mx-auto" onClick={(e) => this.setState({ visible: true })}><FaBell />  Subscribe </button>
              </form>
            </div>
          </div>
          <br />

          <Growl className="m-5" ref={(el) => this.growl = el} />

        </div>
      </section>

    )
  }

}