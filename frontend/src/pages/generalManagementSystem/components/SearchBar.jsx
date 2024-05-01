
import * as React from 'react';
import img from '../assets/Carouselimg/hed.jpg'

export default function SearchBar() {
  return (
<div className="card bg-dark text-white">
  <img src={img} class="card-img" alt="..." height={450}/>
  <div className="card-img-overlay">
    <h2 className="text-center">Company A</h2><br></br>
    <h1 className="text-center">BEST QUALITY ELECTRONICS</h1><br></br>
    <p className="text-center">your premier destination for cutting-edge electronics and innovative technology solutions,</p>
    <p className="text-center">Explore our range of electronics and discover the future today with Company A.</p><br></br><br></br>
    <div class="d-flex justify-content-center">
  <button type="button" class="btn btn-warning">Login here</button>
</div>

   
  </div>
    

</div>

    



  )
}
