import React, { Component } from 'react';
import { Sidebar } from 'primereact/sidebar';
// import ViewDetails from './ViewDetails';
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputSwitch } from 'primereact/inputswitch';
import { Calendar } from 'primereact/calendar';
import { Redirect } from 'react-router-dom';



class TourPackage extends Component {
  state = {
    visible: false,
    activeIndex: 0,
    charges: null,
    tripEnd: null,
    redirectToLogin: false,
    redirectToBook: false,
    form: {
      noOfTravelers: null,
      tripDate: null,
      includeFlight: true
    },
    formErrors: {
      noOfTravelers: "",
      tripDate: ""
    },
    formValid: {
      noOfTravelers: false,
      tripDate: false,
      buttonActive: false
    }
  }

  getItinerary = (aPackage) => {
    this.setState({ activeIndex: 0 })
    // alert("The package details are shown as a side-bar from left side");
    this.setState({ visible: true })
  };
  openBooking = (aPackage) => {
    this.setState({ activeIndex: 2 })
    this.setState({ visible: true })
  };

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
      tripEnd.setDate(tripEnd.getDate() + this.props.package.noOfNights);
      this.setState({ tripEnd: tripEnd.toLocaleDateString() });
      if (this.state.form.includeFlight) {
        lcharges = this.state.form.noOfTravelers * this.props.package.chargesPerPerson + this.props.package.flightCharges * this.state.form.noOfTravelers
      } else {
        lcharges = this.state.form.noOfTravelers * this.props.package.chargesPerPerson;
      }
      this.setState({ charges: lcharges })
    } else this.setState({ charges: null })

  }
  validateField = (fieldName, value) => {
    var formmessage = ""
    switch (fieldName) {
      case "noOfTravelers":
        if (value === "") formmessage = "Min 1 Traveler Max 5 Travelers";
        else {
          value = Number(value);
          value >= 1 && value <= 5 ? formmessage = "" : formmessage = "Min 1 Traveler Max 5 Travelers";
        }
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

  handleSubmit = e => {
    e.preventDefault();
    const { wlAuthedUser } = this.props
    if (wlAuthedUser === null) {
      alert("Please Login First");
      this.setState({ redirectToLogin: true });
    } else {
      sessionStorage.setItem("noOfTravelers", this.state.form.noOfTravelers);
      sessionStorage.setItem("tripDate", this.state.form.tripDate);
      sessionStorage.setItem("includeFlight", this.state.form.includeFlight);
      sessionStorage.setItem("tripEnd", this.state.tripEnd);
      sessionStorage.setItem("charges", this.state.charges);
      this.setState({ redirectToBook: true });
    }
  }



  render() {
    const singlePackage = this.props.package;
    if (this.state.redirectToLogin) return <Redirect to='/login' />
    if (this.state.redirectToBook) return <Redirect to={'/book/' + singlePackage.destinationId} />
    let Details = "";

    if (this.state.visible) {
      let col2 = [];
      let i = 2;
      for (let j = 2; j < singlePackage.details.itinerary.dayWiseDetails.restDaysSightSeeing.length+1; j++) {
        i++;
        col2.push(
          <React.Fragment key={j}>
            <dt> Day {j}</dt>
            <dd>{singlePackage.details.itinerary.dayWiseDetails.restDaysSightSeeing[j - 2]}</dd>
          </React.Fragment>
        )
      }
      Details = <Sidebar visible={this.state.visible} position="right" className="p-sidebar-lg" blockScroll={true} onHide={(e) => this.setState({ visible: false })}>
        <h3 className="font-weight-bold">{singlePackage.name}</h3>
        <TabView activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({ activeIndex: e.index })}>
          <TabPanel header="Overview">
            <div className="row">
              <div className="col-md-5">
                <img className="package-image" alt="destination comes here" src={require('../../src' + singlePackage.imageUrl)} />
              </div>
              <div className="col-md-6">
                <h5 className="font-weight-bold">Package Includes:</h5>
                {singlePackage.details.itinerary.packageInclusions.length > 0 ?
                  <ul>
                    {singlePackage.details.itinerary.packageInclusions.map(data =>
                      <li key={data}>{data}</li>)}
                  </ul> : ""}
              </div>
              <div className="col-md-12 mt-3">
                <h5 className="font-weight-bold">Tour Overview:</h5>
                <p className="text-justify">{singlePackage.details.about}</p>
              </div>
            </div>
          </TabPanel>
          <TabPanel header="Itinerary">
            {singlePackage.details.itinerary.dayWiseDetails ? <dl>
              <dt>Day 1</dt>
              <dd>{singlePackage.details.itinerary.dayWiseDetails.firstDay}</dd>
              {col2}
              <dt>Day {i}</dt>
              <dd>{singlePackage.details.itinerary.dayWiseDetails.lastDay}</dd>
            </dl> : ""}
          </TabPanel>
          <TabPanel header="Book">
            <h4>Charges per person:${singlePackage.chargesPerPerson}</h4>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="noOfTravelers">Number of Travelers</label>
                <input type="number" onChange={this.handleChange} className="form-control" placeholder="MIN 1, MAX 5" min="1" max="5" name="noOfTravelers" />
                <span className="text-danger">{this.state.formErrors.noOfTravelers}</span>
                
                
              </div>
              <div className="form-group">
                <label htmlFor="tripDate">Trip start Date:</label>
                <input className="form-control" onChange={this.handleChange} type='date' placeholder="mm/dd/yyyy" name="tripDate" />
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
          </TabPanel>
        </TabView>
      </Sidebar>



    } else {
      Details = ""

    }
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="card bg-light text-dark package-card">
            <div className="card-body row">
              <div className="col-md-4 zoomer">
                <img className="package-image" alt="destination comes here" src={require('../../src' + singlePackage.imageUrl)} />
              </div>
              <div className="col-md-5 p-3">
                <div className="featured-text text-center text-lg-left">
                  <h4>{singlePackage.name}</h4>
                  <div className="badge badge-info">{singlePackage.noOfNights}<em> Nights</em></div>
                  {singlePackage.discount ? <div className="discount text-danger">{singlePackage.discount}% Instant Discount</div> : null}
                  <p className="text-dark mb-0 text-justify">{singlePackage.details.about}</p>
                </div>
                <br />
              </div>
              <div className="col-md-3 p-3">
                <h4>Prices Starting From:<span className="text-center text-success">${singlePackage.chargesPerPerson}</span></h4>
                <br /> <br />
                <div><button className="btn btn-primary btn-block" onClick={() => this.getItinerary(singlePackage)}>View Details</button></div><br />
                <div><button className="btn btn-primary btn-block" onClick={() => this.openBooking(singlePackage)}>Book </button>  </div>
              </div>
            </div>
          </div>
        </div>
        {Details}
      </React.Fragment>
    )
  }

}

export default TourPackage;