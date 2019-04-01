import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Dialog } from 'primereact/dialog';
import { Growl } from 'primereact/growl';
import { handleGetBookings } from '../actions/authedUser'
import { handleCancelBooking } from '../actions/bookings'
import { Card } from 'primereact/card'

class BookedTrips extends Component {
  
    state = {}
    constructor() {
        super();
        this.showInfo = this.showInfo.bind(this);
    }
    showInfo() {
        if (this.props.cancelBooking) {
            this.growl.show({ severity: 'info', summary: this.props.cancelBooking.msg });
        }
    }
    cancelBooking = () => {
        handleCancelBooking(this.props.dispatch, this.props.booking).then(booking => {
            this.showInfo()
            if (this.props.wlAuthedUser) { handleGetBookings(this.props.dispatch, this.props.wlAuthedUser) }
        })
    }

    render() {

        const booking = this.props.booking;
        const checkInDate = new Date(booking.checkInDate)
        const checkOutDate = new Date(booking.checkOutDate)
        return (
            <div className="offset-md-1 col-md-5 text-center">

                <Card title={booking.destinationName}
                    className="ui-card-shadow"
                    footer={<div className="text-success">Amount Paid: ${booking.totalCharges}</div>}>

                    <h6><b>Booking Id:{booking.bookingId}</b></h6>
                    <p>Trip Starts on :{checkInDate.toDateString()}</p>
                    <p>Trip Ends on :{checkOutDate.toDateString()}</p>
                    <p>No of persons :{booking.noOfPersons}</p>
                    <button type="button" className="btn btn-danger" onClick={(e) => this.setState({ visible: true })} >Cancel Booking</button>
                </Card>
                <Dialog header="Cancel Booking" footer={
                    <div>
                        <button type="button" className="btn btn-primary" onClick={(e) => this.setState({ visible: false })} >back</button>
                        <button type="button" className="btn btn-danger" onClick={(e) => { this.cancelBooking(); this.setState({ visible: false }) }}>Confirm Cancel</button>
                    </div>
                }
                    visible={this.state.visible} style={{ width: '50vw' }} modal={true}
                    onHide={(e) => this.setState({ visible: false })}>
                    <div className="card-text, text-danger">
                        <b> Are you sure you want to Cancel booking for {booking.destinationName}</b>
                    </div>
                    <div className="card-text">Trip Starts on :{checkInDate.toDateString()}</div>
                    <div className="card-text">Trip Ends on :{checkOutDate.toDateString()}</div>
                    <div className=" card-text text-success">Amount to be Refunded: ${booking.totalCharges}</div>
                </Dialog>
                <Growl className="m-5" ref={(el) => this.growl = el} />
            </div>


        )
    }
}

function mapStateToProps({ cancelBooking, wlAuthedUser }) {
    return {
        cancelBooking,
        wlAuthedUser
    }
}

export default connect(mapStateToProps)(BookedTrips)