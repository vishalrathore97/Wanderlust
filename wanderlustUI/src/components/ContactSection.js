import React from 'react'
import { Link } from 'react-router-dom'
export default function ContactSection () {
  return (
    <section className="contact-section bg-black sticky-bottom">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="card py-4 h-100">
              <div className="card-body text-center">
                <h4 className="text-uppercase m-0">Address</h4>
                <hr className="my-4" />
                <div className="small text-black-50">Infosys, Mysuru</div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="card py-4 h-100">
              <div className="card-body text-center">
                <h4 className="text-uppercase m-0">Email</h4>
                <hr className="my-4" />
                <div className="small text-black-50"><Link to="/home">test@infosys.com</Link></div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3 mb-md-0">
            <div className="card py-4 h-100">
              <div className="card-body text-center">
                <h4 className="text-uppercase m-0">Phone</h4>
                <hr className="my-4" />
                <div className="small text-black-50">+91 9999999999</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="container-fluid d-flex h-100 align-items-center">
              <h5 className="text-white-50 mx-auto mt-2 mb-5">
                Copyright &copy; www.eta.wanderlust.com 2019
              </h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
