import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleWLDeals } from '../actions/shared'
import ContactSection from './ContactSection'

// import { Button } from 'primereact/button';
import './App.css'

import Nav from './Nav'
import Login from './Login'
import Home from './Home'
import HotDeals from './HotDeals'
import Register from './Register'
import Search from './Search'
import Book from './Book'
import PlannedTrips from './PlannedTrips'
import Profile from './Profile'

class App extends Component {
  componentDidMount () {
    handleWLDeals(this.props.dispatch)
  }
  render () {
    return (
      <Router>
        <Fragment>
          <Nav wlAuthedUser={this.props.wlAuthedUser}/>
          <div id="main">
            <Switch>
              <Route exact path="/home" component={Home}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/home/:userId" component={Home}></Route>
              <Route exact path="/packages" component={HotDeals}></Route>{/* Only HotDeals */}
              <Route exact path="/packages/:continent" component={Search}></Route>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/book/:dealId" component={Book}></Route>
              <Route exact path="/viewBookings" component={PlannedTrips}></Route>
              <Route exact path="/profile" component={Profile}></Route>
              <Route path='/**' exact component={Home} />

            </Switch>
            <ContactSection />

            {/* <div>
              <Button label="CONTINUE EXPLORING" icon="pi pi-check" onClick={this.onHide} />
              <Button label="LOGOUT" icon="pi pi-times" onClick={this.logout} className="p-button-secondary" />
            </div> */}

          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ wlAuthedUser }) {
  return {
    wlAuthedUser
  }
}

export default connect(mapStateToProps)(App)
