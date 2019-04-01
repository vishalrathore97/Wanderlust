import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Fieldset } from 'primereact/fieldset';
import Spinner from './Spinner';
import { InputSwitch } from 'primereact/inputswitch';
import { Card } from 'primereact/card';
import { Growl } from 'primereact/growl';
import { Redirect } from 'react-router-dom';

import { handleGetDetails, handleBookPackage, unsetPackages } from '../actions/bookings'
class Book extends Component {
  state = {
    redirect: false,
    panel1: true,
    panel2: true,
    inProgress: false,
    charges: sessionStorage.getItem("charges"),
    tripEnd: sessionStorage.getItem("tripEnd"),
    form: {
      noOfTravelers: sessionStorage.getItem("noOfTravelers"),
      tripDate: sessionStorage.getItem("tripDate"),
      includeFlight: sessionStorage.getItem("includeFlight") === "true" ? true : false
    },
    formErrors: {
      noOfTravelers: "",
      tripDate: ""
    },
    formValid: {
      noOfTravelers: false,
      tripDate: false,
      buttonActive: true
    }
  }
  showInfo = () => {
    if (this.props.bookedPackage.bookingError) {
      this.growl.show({ severity: 'error', summary: this.props.bookedPackage.bookingError });
    } else if (this.props.bookedPackage.message) {
      this.growl.show({ severity: 'success', summary: this.props.bookedPackage.message });
    }
  }
  getPackage = () => {
    handleGetDetails(this.props.dispatch, this.props.match.params.dealId)
  }
  componentDidMount = () => {
    document.title = 'Book Package';
    this.getPackage();
  }
  handleChange = e => {

    let inputfield = e.target.name;
    let enteredvalue = e.target.value;
    let formObj = this.state.form;
    formObj[inputfield] = enteredvalue;
    this.setState({ form: formObj });
    if (e.target.name !== "includeFlight") this.validateField(inputfield, enteredvalue);

    if (this.state.formValid.buttonActive) {
      let lcharges = null;
      let tripEnd = new Date(this.state.form.tripDate);
      tripEnd.setDate(tripEnd.getDate() + this.props.selectedPackage.noOfNights);
      this.setState({ tripEnd: tripEnd.toLocaleDateString() });
      if (this.state.form.includeFlight) {
        lcharges = this.state.form.noOfTravelers * this.props.selectedPackage.chargesPerPerson + this.props.selectedPackage.flightCharges * this.state.form.noOfTravelers;
      } else {
        lcharges = this.state.form.noOfTravelers * this.props.selectedPackage.chargesPerPerson;
      }
      this.setState({ charges: lcharges })
    } else this.setState({ charges: null })

  }
  validateField = (fieldName, value) => {
    var formmessage = ""
    switch (fieldName) {
      case "noOfTraveleres":
        value.length === 0 ? formmessage = "Min 1 Traveler Max 5 Travelers" : value >= 1 && value <= 5 ? formmessage = "" : formmessage = "Min 1 Traveler Max 5 Travelers";
        break;
      case "tripDate":
        new Date(value) > new Date() ? formmessage = "" : formmessage = "Trip Start Date should be greater than today !";
        break;
      default:
        break;
    }
    let fromErrObj = this.state.formErrors;
    fromErrObj[fieldName] = formmessage
    this.setState({ formErrors: fromErrObj })

    let status = false;
    if (formmessage === "") status = true
    var formValidObj = this.state.formValid;
    formValidObj[fieldName] = status;
    formValidObj.buttonActive = formValidObj.noOfTravelers && formValidObj.tripDate
    this.setState({ formValid: formValidObj })
  }

  componentWillUnmount = () => {
    unsetPackages(this.props.dispatch)
  }

  handleSubmit = e => {
    e.preventDefault();
    let bookingDetails = null
    bookingDetails = {
      destinationId: this.props.selectedPackage.destinationId,
      noOfTravelers: this.state.form.noOfTravelers,
      tripDate: this.state.form.tripDate,
      includeFlight: this.state.form.includeFlight,
      tripEnd: this.state.tripEnd,
      destinationName: this.props.selectedPackage.name
    }
    this.setState({ inProgress: true });
    handleBookPackage(this.props.dispatch, this.props.wlAuthedUser, bookingDetails).then(() => this.setState({ inProgress: false }));

  }
  render() {
    const { wlAuthedUser, selectedPackage, bookedPackage, bookingError } = this.props;
    if (wlAuthedUser === null || wlAuthedUser.isError !== undefined || wlAuthedUser.isError === null) {
      return <Redirect to='/login' />
    }
    if (this.props.match === null || this.props.match === undefined || this.state.redirect) {
      return <Redirect to='/home' />
    }

    return (
      <section id="bookingFormSection" className="mt-20-p-15">
        <div className="container-fluid">
          {this.state.inProgress ? (<Spinner />) : bookedPackage && (bookedPackage.bookingError === null || bookedPackage.bookingError === undefined) ? (
            <div className="text-center text-success my-5">
              <h2>{bookedPackage.message}</h2>
              <br />
              <button type="button" className="btn btn-primary" onClick={() => this.setState({ redirect: true })}>Go to home page</button>
            </div>
          ) : selectedPackage && (bookedPackage === null) ? (
            <div className="row">
              <div className="col-lg-6 col-md-12 wrapper">
                <h3>{selectedPackage.name}</h3>
                <Fieldset legend="Overview">
                  {selectedPackage.details.about}
                </Fieldset>

                <Fieldset legend="Package Inclusion" className="mt-15" toggleable={true} collapsed={this.state.panel1} onToggle={(e) => this.setState({ panel1: e.value })}>
                  <ul>{selectedPackage.details.itinerary.packageInclusions.map(el => <li key={el}>{el}</li>)}</ul>
                </Fieldset>

                <Fieldset legend="Itinerary" className="mt-15" toggleable={true} collapsed={this.state.panel2} onToggle={(e) => this.setState({ panel2: e.value })}>
                  <h6>Day Wise</h6>
                  <ol>
                    <li>{selectedPackage.details.itinerary.dayWiseDetails.firstDay}</li>
                    {selectedPackage.details.itinerary.dayWiseDetails.restDaysSightSeeing.map(el => <li key={el}>{el}</li>)}
                    <li>{selectedPackage.details.itinerary.dayWiseDetails.lastDay}</li>
                  </ol>
                </Fieldset>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="wrapper">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="noOfTravelers">Number of Travelers:<span className="text-danger">*</span></label>
                      <input type="number" value={this.state.form.noOfTravelers} onChange={this.handleChange} className="form-control" placeholder="MIN 1, MAX 5" min="1" max="5" name="noOfTravelers" />
                      <span className="text-danger">{this.state.formErrors.noOfTravelers}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="tripDate">Trip start Date:<span className="text-danger">*</span></label>
                      <input className="form-control" value={this.state.form.tripDate} onChange={this.handleChange} type='date' placeholder="mm/dd/yyyy" name="tripDate" />
                      <span className="text-danger">{this.state.formErrors.tripDate}</span>
                    </div>
                    <div className="form-group">
                      <h5 className="text-primary">Include Flight</h5>
                      <InputSwitch name="includeFlight" onLabel="Yes" offLabel="No" checked={this.state.form.includeFlight} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                      <div className="text-primary">{this.state.formValid.buttonActive && (<span>Your trip will end on {this.state.tripEnd} and you will pay ${this.state.charges}</span>)}</div>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-block" disabled={!this.state.formValid.buttonActive}>BOOK</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>) : (bookedPackage && bookedPackage.bookingError) ? (
              <div className="text-center text-danger my-5">
                <h2>{bookedPackage.bookingError}</h2>
                <br />
                <button type="button" className="btn btn-primary" onClick={() => this.setState({ redirect: true })}>Go to home page</button>
              </div>
            ) : <Spinner />}
        </div>
      </section>
    )
  }
}


function mapStateToProps({ wlAuthedUser, selectedPackage, bookedPackage, bookingError }) {
  return {
    wlAuthedUser,
    selectedPackage,
    bookedPackage,
    bookingError
  }
}

export default connect(mapStateToProps)(Book)
