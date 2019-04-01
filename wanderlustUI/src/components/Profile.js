import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Spinner from './Spinner';


class Profile extends Component {
    state = { redirect: false }
    componentDidMount = () => {
        document.title = `${this.props.wlAuthedUser.name} Profile`;
    }

    render() {
        const { wlAuthedUser } = this.props;
        if (wlAuthedUser === null) {
            return <Redirect to='/login' />
        }
        return (
            wlAuthedUser ? (
                <div className="container mt-20-p-15">
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>User Id</th>
                                        <td>{wlAuthedUser.userId}</td>
                                        <th>Name</th>
                                        <td>{wlAuthedUser.name}</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Contact No.</th>
                                        <td>{wlAuthedUser.contactNo}</td>
                                        <th>Email</th>
                                        <td>{wlAuthedUser.emailId}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (<Spinner />)
        )
    }
}

function mapStateToProps({ wlAuthedUser }) {
    return {
        wlAuthedUser
    }
}

export default connect(mapStateToProps)(Profile)
