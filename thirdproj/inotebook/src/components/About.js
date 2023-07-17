import React from 'react';
import profile from './profile.jpg'

function About() {
  return (
    <div className='container'>
      <h1 className='text-center' style={{ color: 'green',fontSize: '80px' }}>About</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
            <img src={profile} className="img-thumbnail rounded mx-auto d-block" alt="profile" />
          </div>

          <div className="col-md-9 col-lg-9 col-sm-12 col-xs-12">
            <h2 className="introduction">Myself Harshvardhan Singh, undergraduate student 
            of Bachelor of Technology in CSE branch @MNNIT
            Prayagraj.Engineer by Education,Web Developer by choice and a Footballer by Heart.
            Enthusiastic about problem solving and developing project based on real life problem.
            I love to explore new places and shoot them in a frame.My own Dreams motivate me to 
            stand me again to practice more and work more to achieve more.Currently, 
            I'm into designing, developing and programming.
            </h2>
            <div className="col text-center">
              <i className="fa-brands fa-4x mx-3 fa-github"></i>
              <i className="fa-brands fa-4x mx-3 fa-linkedin"></i>
              <i className="fa-brands fa-4x mx-3 fa-facebook"></i>
              <i className="fa-brands fa-4x mx-3 fa-instagram"></i>
              <i className="fa-brands fa-4x mx-3 fa-twitter"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
