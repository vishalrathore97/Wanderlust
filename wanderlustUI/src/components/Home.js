import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { FaSistrix } from 'react-icons/fa';

import SignUp from './SignUp'
import HotDeals from './HotDeals';

class Home extends Component {

  state = {
    userInputContinent: "",
    searchClicked: false
  };

  getPackages = () => {
    this.setState({ searchClicked: true });
  }
  componentDidMount = () => {
    document.title = 'Home | Wanderlust';
  }
  handleChange = (e) => {
    if (e.charCode === 13) {
      this.getPackages();
    }
    const name = e.target.name;
    const value = e.target.value;
    this.setState(() => ({ [name]: value }));
  }

  render() {

    const { wlAuthedUser } = this.props;

    // if (wlAuthedUser === null) {
    //   return <Redirect to='/login' />
    // }
    if (this.state.searchClicked) return <Redirect to={'/packages/' + this.state.userInputContinent} push />

    return (
      <React.Fragment>
        <header className="masthead book-page" id="page-top">
          <div className="container-fluid d-flex h-100 align-items-center">
            <div className="mx-auto text-center">
              <h1 className="mx-auto my-0 text-uppercase">Wanderlust</h1>
              <h2 className="mx-auto text-white mt-2 mb-5">All that is gold does not glitter,
                    Not all those who wander are lost.</h2>
              <div className="form-inline d-flex">
                <input
                  type="text"
                  className="form-control-lg flex-fill"
                  name="userInputContinent"
                  value={this.state.userInputContinent}
                  onChange={this.handleChange}
                  pattern="[a-z][A-Z]"
                  id="continent"
                  placeholder="Where?"
                />&nbsp;&nbsp;
                    <button className="btn" onClick={this.getPackages}>Search</button>
              </div>
            </div>
          </div>
        </header>

        <section id="about" className="about-section text-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto wrap-about">
                <h2 className="text-white mb-4">Unleash the traveller inside you</h2>
                <p className="about-paragraph text-justify">When someone makes a travel plan, the first few things they want to sort out, are flights, accommodation, and other amenities for a convenient holiday. To enjoy holidays, you want to have the basics taken care of, especially for family vacations and honeymoon trips. You want your accommodation, return flight bookings, meals of the days, and other traveling formalities sorted beforehand. At <i>Wanderlust</i>, we take care of all the requirements to ensure that you get to enjoy the best of your holiday, exploring and experiencing the destination.</p>
              </div>
            </div>
          </div>
        </section>

        <HotDeals />
        <SignUp />

      </React.Fragment>
    )
  }
}


function mapStateToProps({ destinations, deals, wlAuthedUser }) {
  return {
    wlAuthedUser,
    destinations,
    deals
  }

}

export default connect(mapStateToProps)(Home)