import React from 'react';

import img01 from "../assets/Carouselimg/img1.jpg";
import img02 from "../assets/Carouselimg/img2.jpg";
import img03 from "../assets/Carouselimg/img3.jpg";
import img04 from "../assets/Carouselimg/img4.jpg";
import img05 from "../assets/Carouselimg/img5.jpg";
import img06 from "../assets/Carouselimg/img6.jpg";
import img07 from "../assets/Carouselimg/img7.jpg";
import img08 from "../assets/Carouselimg/img8.jpg";
import img09 from "../assets/Carouselimg/img9.jpg";
import img10 from "../assets/Carouselimg/img10.jpg";
import img11 from "../assets/Carouselimg/img11.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function LandingPageCarousel() {
  return (
    <div className='App'>
      <Carousel responsive={responsive}>
        <div style={{ width: '250px', height: '400px', display: 'flex', margin: '0 auto' }} className='card'>
          <img className="product--image"  src={img01} alt="product image" />
          <h2> Transistors</h2>
          <p className='price'> Rs:20.00</p>
          <p>Product details</p>
          <div style={{ marginTop: 'auto',marginBottom: '30px' }}>
          <Link to="/login/customer" className="btn btn-dark btn-lg btn-block">View</Link>
  </div>
        </div>
        <div style={{ width: '250px', height: '400px', display: 'flex', margin: '0 auto' }} className='card'>
          <img className="product--image" src={img02} alt="product image" /><br></br>
          <h2>Resistors</h2>
          <p className='price'> Rs:20.00</p>
          <p>Product details</p>
          <div style={{ marginTop: 'auto',marginBottom: '30px' }}>
          <Link to="/login/customer" className="btn btn-dark btn-lg btn-block">View</Link>
  </div>
        </div>
        <div style={{ width: '250px', height: '400px', display: 'flex', margin: '0 auto' }} className='card'>
          <img className="product--image" src={img03} alt="product image" />
          <h2>LED</h2>
          <p className='price'> Rs:20.00</p>
          <p>Product details</p>
          <div style={{ marginTop: 'auto',marginBottom: '30px' }}>
          <Link to="/login/customer" className="btn btn-dark btn-lg btn-block">View</Link>
  </div>
        </div>
        <div style={{ width: '250px', height: '400px', display: 'flex', margin: '0 auto' }} className='card'>
          <img className="product--image" src={img04} alt="product image" />
          <h2>Capacitors</h2>
          <p className='price'> Rs:20.00</p>
          <p>Product details</p>
          <div style={{ marginTop: 'auto',marginBottom: '30px' }}>
          <Link to="/login/customer" className="btn btn-dark btn-lg btn-block">View</Link>
  </div>
        </div>
        <div style={{ width: '250px', height: '400px', display: 'flex', margin: '0 auto' }} className='card'>
          <img className="product--image" src={img05} alt="product image" />
          <h3>Wires and circuit boards</h3>
          <p className='price'> Rs:20.00</p>
          <p>Product details</p>
          <div style={{ marginTop: 'auto',marginBottom: '30px' }}>
          <Link to="/login/customer" className="btn btn-dark btn-lg btn-block">View</Link>
  </div>
        </div>
        <div style={{ width: '250px', height: '400px', display: 'flex', margin: '0 auto' }} className='card'>
          <img className="product--image" src={img01} alt="product image" />
          <h2>Capacitor</h2>
          <p className='price'> Rs:20.00</p>
          <p>Product details</p>
          <Link to="/login/customer" className="btn btn-dark btn-lg btn-block">View</Link>
        </div>





      </Carousel><br></br><br></br>
      <Carousel responsive={responsive}>
        <div style={{ width: '250px', height: '400px', display: 'flex', margin: '0 auto' }} className='card'>
          <img className="product--image" src={img06} alt="product image" />
          <h2>Soldering Iron</h2>
          <p className='price'> Rs:20.00</p>
          <p>Product details</p>
          <div style={{ marginTop: 'auto',marginBottom: '30px' }}>
          <Link to="/login/customer" className="btn btn-dark btn-lg btn-block">View</Link>
  </div>
        </div>
        <div style={{ width: '250px', height: '400px', display: 'flex', margin: '0 auto' }} className='card'>
          <img className="product--image" src={img07} alt="product image" />
          <h2>Arduino</h2>
          <p className='price'> Rs:20.00</p>
          <p>Product details</p>
          <div style={{ marginTop: 'auto',marginBottom: '30px' }}>
          <Link to="/login/customer" className="btn btn-dark btn-lg btn-block">View</Link>
  </div>
        </div>
        <div style={{ width: '250px', height: '400px', display: 'flex', margin: '0 auto' }} className='card'>
          <img className="product--image" src={img08} alt="product image" />
          <h2>PCB</h2>
          <p className='price'> Rs:20.00</p>
          <p>Product details</p>
          <div style={{ marginTop: 'auto',marginBottom: '30px' }}>
          <Link to="/login/customer" className="btn btn-dark btn-lg btn-block">View</Link>
  </div>
        </div>
        <div style={{ width: '250px', height: '400px', display: 'flex', margin: '0 auto' }} className='card'>
          <img className="product--image" src={img09} alt="product image" />
          <h2>Multimeter</h2>
          <p className='price'> Rs:20.00</p>
          <p>Product details</p>
          <div style={{ marginTop: 'auto',marginBottom: '30px' }}>
          <Link to="/login/customer" className="btn btn-dark btn-lg btn-block">View</Link>
  </div>
        </div>
        <div style={{ width: '250px', height: '400px', display: 'flex', margin: '0 auto' }} className='card'>
          <img className="product--image" src={img10} alt="product image" />
          <h2>Electric tools</h2>
          <p className='price'> Rs:20.00</p>
          <p>Product details</p>
          <div style={{ marginTop: 'auto',marginBottom: '30px' }}>
          <Link to="/login/customer" className="btn btn-dark btn-lg btn-block">View</Link>
  </div>
        </div>
        <div style={{ width: '250px', height: '400px', display: 'flex', margin: '0 auto' }} className='card'>
          <img className="product--image" src={img11} alt="product image" />
          <h2>Microcontroller</h2>
          <p className='price'> Rs:20.00</p>
          <p>Product details</p>
          <div style={{ marginTop: 'auto',marginBottom: '30px' }}>
          <Link to="/login/customer" className="btn btn-dark btn-lg btn-block">View</Link>
  </div>
        </div>





      </Carousel>
    </div>

  );
}
