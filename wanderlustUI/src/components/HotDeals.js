import React, { Component } from 'react'
import { connect } from 'react-redux'
import TourPackage from './TourPackage'
import Spinner from './Spinner'

class HotDeals extends Component {
  render () {
    const { deals } = this.props

    return (
      <section id="hotDeals" className="hotDeals-section">
        {deals ? Object.keys(deals).map((aDeal, index) => (
          <React.Fragment key={index}>
            <TourPackage package={deals[aDeal]} />
            <br />
            <br />
          </React.Fragment>
        )) : <Spinner />}
      </section>
    )
  }
}

function mapStateToProps ({ deals }) {
  return {
    deals
  }
}

export default connect(mapStateToProps)(HotDeals)
