import React, { Fragment as Frag } from 'react'
import { NavLink } from 'react-router-dom'
import { unSetWLAuthedUser } from '../actions/authedUser'
import { connect } from 'react-redux'
import { FaPowerOff, FaHotjar, FaTelegramPlane, FaUserAlt } from 'react-icons/fa';
import { IoIosLogIn } from 'react-icons/io';
import { Dialog } from 'primereact/dialog';
import {OverlayPanel} from 'primereact/overlaypanel';

class Nav extends React.Component {
  state = {
    logoutModal: false
  }

  logout = () => {
    this.setState({ logoutModal: false });
    this.props.dispatch(unSetWLAuthedUser()); // Will Setting the Authed User as null, SYNC dispatch
  }

  render() {
    const { wlAuthedUser } = this.props
    return (
      <Frag>
        <nav className="navbar navbar-expand-md bg-custom sticky-top navbar-light">

          <NavLink className="navbar-brand" to='/home' exact activeClassName='nav-link '>
            <img src={require('../assets/logo.png')} width="190px" className="img-fluid" />
          </NavLink>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to='/packages' activeClassName='nav-link '><FaHotjar />  Hot Deals </NavLink>
            </li>

          </ul>
          <ul className="navbar-nav ml-auto">
            {/*wlAuthedUser &&  (wlAuthedUser.isError!==undefined || wlAuthedUser.isError!==null)*/}
            {wlAuthedUser && (wlAuthedUser.isError === undefined || wlAuthedUser.isError === null) ?
              (<Frag>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/viewBookings' activeClassName='nav-link '><FaTelegramPlane />&nbsp;Planned Trips</NavLink>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onMouseOver={(e) => this.op.toggle(e)} onMouseOut={(e) => this.op.toggle(e)} activeClassName='nav-link active'><FaUserAlt />&nbsp;{wlAuthedUser.name}</a>
                </li>
                <li className="nav-item">
                  <a className='nav-link'
                    onClick={(e) => this.setState({ logoutModal: true })}>
                    <FaPowerOff /> &nbsp;Logout</a>
                </li>
              </Frag>
              ) : (
                <Frag>
                  <li className="nav-item">
                    <NavLink className="nav-link" to='/login' activeClassName='nav-link '><IoIosLogIn />Login</NavLink>
                  </li>
                </Frag>
              )
            }
          </ul>
        </nav>
        {wlAuthedUser && (wlAuthedUser.isError === undefined || wlAuthedUser.isError === null) ? (
        <Frag>
        <Dialog header="Logout" footer={<div>
          <button className="btn btn-primary p-1" type="button" onClick={() => this.setState({ logoutModal: false })}>Cancel</button>
          <button className="btn btn-primary p-1" type="button" onClick={this.logout}>Confirm Logout</button>
        </div>} visible={this.state.logoutModal} style={{ width: '50vw' }} modal={true} onHide={(e) => this.setState({ logoutModal: false })}>
          <div className="p-3"><h4>Are you sure you want to logout ?</h4></div>
      </Dialog>
        <OverlayPanel ref={(el) => this.op = el}>
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
        </OverlayPanel> </Frag>) :null}
      </Frag>
    )
  }
}

/**
* exporting the "connected" component
* Nav component is now connected to the REDUX-STORE
*/
export default connect()(Nav);