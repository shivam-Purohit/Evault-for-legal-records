import React from 'react'
import { Link } from 'react-router-dom'
import homeimg from './2002.i039.018_remote_management_distant_work_isometric_icons-15.jpg';
const Home = () => {
  return (
    <section id="header" className="d-flex align-items-center ">
       <div className='container-fluid nav_bg'>
        <div className='row'>
            <div className='col-10 mx-auto'>
              <div className='row'>
                <div className='col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column'>
                  <h1>Your Privacy at <strong className="brand-name">Your FingerTip</strong></h1>
                  <h2 className='my-3' >The Platform that ensures your Privacy at it's Best</h2>
                  <div className='mt-3' ><Link to="/services" className='btn-get-started'>Get Started</Link></div>
                </div>
                <div className='col-lg-6 order-1 order-lg-2 header-img'>
                  <picture><img src={homeimg} className='img-fluid animated' alt="home img"/></picture>
              
            </div>
            </div>
            </div>
            
        </div>
       </div>
    </section>
  )
}

export default Home