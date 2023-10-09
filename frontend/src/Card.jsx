import React from 'react'
import { Link } from 'react-router-dom'
import cardimg from './5911.jpg';
const Card = () => {
  return (
    <div>
        <div className='col-md-4 col-10 mx-auto'>
        <div className="card">
        <img className="card-img-top" src={cardimg} alt="Card image cap"/>
        <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <Link to="/services" className="btn btn-primary">Start</Link>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Card