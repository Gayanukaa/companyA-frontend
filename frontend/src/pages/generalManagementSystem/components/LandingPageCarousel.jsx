import React from 'react';

import img01 from "../assets/Carouselimg/img1.jpg";
import img03 from "../assets/Carouselimg/img3.jpg";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Box from '@mui/material/Box';

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
          <img className="product--image" src={img01} alt="product image" />
          <h2>Capacitor</h2>
          <p className='price'> Rs:20.00</p>
          <p>Product details</p>
          <button type="text" className="btn btn-dark btn-lg btn-block">In Stoke</button>
        </div>
        <div style={{ width: '250px', height: '400px', display: 'flex', margin: '0 auto' }} className='card'>
          <img className="product--image" src={img01} alt="product image" />
          <h2>Capacitor</h2>
          <p className='price'> Rs:20.00</p>
          <p>Product details</p>
          <button type="text" className="btn btn-dark btn-lg btn-block">In Stoke</button>
        </div>
        <div style={{ width: '250px', height: '400px', display: 'flex', margin: '0 auto' }} className='card'>
          <img className="product--image" src={img01} alt="product image" />
          <h2>Capacitor</h2>
          <p className='price'> Rs:20.00</p>
          <p>Product details</p>
          <button type="text" className="btn btn-dark btn-lg btn-block">In Stoke</button>
        </div>
        <div style={{ width: '250px', height: '400px', display: 'flex', margin: '0 auto' }} className='card'>
          <img className="product--image" src={img01} alt="product image" />
          <h2>Capacitor</h2>
          <p className='price'> Rs:20.00</p>
          <p>Product details</p>
          <button type="text" className="btn btn-dark btn-lg btn-block">In Stoke</button>
        </div>
        <div style={{ width: '250px', height: '400px', display: 'flex', margin: '0 auto' }} className='card'>
          <img className="product--image" src={img01} alt="product image" />
          <h2>Capacitor</h2>
          <p className='price'> Rs:20.00</p>
          <p>Product details</p>
          <button type="text" className="btn btn-dark btn-lg btn-block">In Stoke</button>
        </div>
        <div style={{ width: '250px', height: '400px', display: 'flex', margin: '0 auto' }} className='card'>
          <img className="product--image" src={img01} alt="product image" />
          <h2>Capacitor</h2>
          <p className='price'> Rs:20.00</p>
          <p>Product details</p>
          <button type="text" className="btn btn-dark btn-lg btn-block">In Stoke</button>
        </div>





      </Carousel>
    </div>

  );
}
