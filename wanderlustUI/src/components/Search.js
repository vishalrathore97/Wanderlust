import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleReceiveDestinations, unSetWLDestinations } from '../actions/destinations'
import TourPackage from './TourPackage'
import { FaSearch } from 'react-icons/fa'
import Spinner from './Spinner'
import { Redirect } from 'react-router-dom';


class Search extends Component {
  isSearched = () =>{
    if(this.props.match.params){
      document.title = `${this.props.match.params.continent} search results`;
      // deals = getWLDestinations(this.props.match.params.continent);
      handleReceiveDestinations(this.props.dispatch, this.props.match.params.continent);
    }
  }
  state = {redirect:false}
  componentDidMount = ()=>{
    this.isSearched();
  }
  componentWillUnmount = ()=>{
    unSetWLDestinations(this.props.dispatch);
  }
  render () {
    const {destinations, wlAuthedUser } = this.props

    // if (wlAuthedUser === null) {
    //   return <Redirect to='/login' />
    // }

    if (this.state.redirect) {
      return <Redirect to='/home' />
    }
       

    return (
      <section id="hotDeals" className="hotDeals-section">
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-md-12">
              {destinations.searchError===null && (<div className="wrapper"><FaSearch/>&nbsp;{Object.keys(destinations).length} results for {this.props.match.params.continent}</div>)}
            </div>
          </div>
        </div>
        {destinations.searchError ? (
          <div className="text-center my-5">
          <h2>{destinations.searchError}</h2>
          <br />
          <button type="button" className="btn btn-primary" onClick={() => this.setState({ redirect: true })}>Go to home page</button>
        </div>
          // <div className="wrapper">{destinations.searchError}</div>
        ) : Object.keys(destinations).length>0 ? Object.keys(destinations).map((aDest, index) => (
          <React.Fragment key={index}>
            <TourPackage package={destinations[aDest]} />
            <br/>
            <br/>
          </React.Fragment>
        )): <Spinner/>}
      </section>
    )
  }
}

function mapStateToProps ({wlAuthedUser, destinations }) {
  return {
    wlAuthedUser,
    destinations
  }
}

export default connect(mapStateToProps)(Search)
