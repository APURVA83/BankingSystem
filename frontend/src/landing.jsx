import React from 'react';
import './styles.css'
import { Link } from 'react-router-dom';
import { FaExchangeAlt } from 'react-icons/fa';



const landing = () => {
  return (
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#"><span class="text-warning">Banking</span>System</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="#">Home</a>
          </li>      
        </ul>
      </div>
    </div>
  </nav>
  <section id="about" class="about section-padding">
  <div class="container">
      <div class="row">
          <div class="col-lg-8 col-md-12 col-12 ps-lg-5 mt-md-5">
              <div class="about-text">
                    <h2> Basic Banking System By Apurva P  <br/></h2>
                    <p>This Project allows you to seamlessly transfer money between user accounts</p>
                    <p>Project Stack : Nodejs, React, MySQL and Bootstrap</p>
                    <Link to={`/users/`} className="btn bg-warning text-dark">
                      <FaExchangeAlt /> Explore
                    </Link>
              </div>
          </div>

      </div>
  </div>
</section>


<section class="services section-padding" id="services">
          <div class="container">
              <div class="row">
                  <div class="col-md-12">
                      <div class="section-header text-center pb-5">
                          <h2>Features of the App</h2>
                      </div>
                  </div>
              </div>
              <div class="row">
                <div class="col-12 col-md-12 col-lg-4">
                    <div class="card text-white text-center bg-dark pb-2">
                        <div class="card-body">
                            <i class="bi bi-laptop"></i>
                            <h3 class="card-title">Transfer Money</h3>
                            <p>Seamlessly Transfer Money between Users</p>
                            <Link to={`/users/`} className="btn bg-warning text-dark">Click Here</Link>
                        </div>
                    </div>
                </div>
                  <div class="col-12 col-md-12 col-lg-4">
                      <div class="card text-white text-center bg-dark pb-2">
                          <div class="card-body">
                            <i class="bi bi-journal"></i>
                              <h3 class="card-title">User Accounts</h3>
                              <p class="lead">View All the User Accounts</p>
                              <Link to={`/users/`} className="btn bg-warning text-dark">Click Here</Link>
                          </div>
                      </div>
                  </div>
                  <div class="col-12 col-md-12 col-lg-4">
                      <div class="card text-white text-center bg-dark pb-2">
                          <div class="card-body">
                            <i class="bi bi-intersect"></i>
                              <h3 class="card-title">Landing Page</h3>
                              <p class="lead"> Navigate between User Accounts </p>
                              <Link to={`/users/`} className="btn bg-warning text-dark">Click Here</Link>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
</div>)
}



export default landing
