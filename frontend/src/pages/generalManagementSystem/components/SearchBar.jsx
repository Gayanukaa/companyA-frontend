import * as React from 'react';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import img from '../assets/Carouselimg/hed.jpg';

export default function SearchBar() {
  return (
    <div className="card bg-dark text-white" style={{ position: 'relative' }}>
      <img src={img} className="card-img" alt="..." height={700} />
      <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center">
        <div>
          <h2 className="text-center" style={{ fontSize: '2.5rem' }}>Company A</h2><br />

          <h1 className="text-center" style={{ fontSize: '3rem' }}>
            <Typewriter
              options={{
                strings: [
                  '<span style="color: yellow;">BEST</span> QUALITY ELECTRONICS',
                  '<span style="color: #2AFF00;">TOP-NOTCH</span> ELECTRONICS',
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <br />

          <p className="text-center" style={{ fontSize: '1.5rem' }}>Your premier destination for cutting-edge electronics and innovative technology solutions.</p>
          <p className="text-center" style={{ fontSize: '1.2rem' }}>Explore our range of electronics and discover the future today with Company A.</p><br /><br />
          <div className="d-flex justify-content-center">
            <Link to="/login/customer" className="btn btn-warning" style={{ fontSize: '1.2rem' }}>Get Started &#62; </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
