import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleGetBookings, unsetBookings } from '../actions/authedUser'
import BookedTrips from "./BookedTrips";
import { ProgressSpinner } from 'primereact/progressspinner';
import Spinner from './Spinner';


class PlannedTrips extends Component {
  state = { redirect: false }
  componentDidMount = () => {
    document.title = 'Planned Trips'
    if (this.props.wlAuthedUser) {
      handleGetBookings(this.props.dispatch, this.props.wlAuthedUser)
    }
  }
  componentWillUnmount = () => {
    unsetBookings(this.props.dispatch);
  }
  render() {
    const { userBookings, wlAuthedUser } = this.props;
    if (wlAuthedUser === null) {
      return <Redirect to='/login' />
    }
    if (this.state.redirect) {
      return <Redirect to='/home' />
    }
    return (
      <div className="container-fluid mt-20-p-15">
        <div className="row">
          {(userBookings && userBookings.isError) ?
            <div className="text-center col-md-12 my-5">
              <h2>{userBookings.isError}</h2>
              <br />
              <button type="button" className="btn btn-primary" onClick={() => this.setState({ redirect: true })}>click here to start booking</button>
            </div>
            : (userBookings) ? userBookings && Object.keys(userBookings).map((booking, index) => (
              <React.Fragment key={index} >

                <BookedTrips booking={userBookings[booking]} />

              </React.Fragment>
            )) : <Spinner />}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ wlAuthedUser, userBookings }) {
  return {
    wlAuthedUser,
    userBookings
  }
}

export default connect(mapStateToProps)(PlannedTrips)
