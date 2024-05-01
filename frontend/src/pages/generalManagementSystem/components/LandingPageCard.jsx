import React from 'react';
import img01 from '../assets/card/img1.jpg';
import img02 from '../assets/card/img2.jpg';

export default function LandingPageCard() {
    return (
        <div className="row">
            <div className="col-md-6">
                <div className="card mb-3" style={{ maxWidth: '540px' }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={img01} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Fast Delivery</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-muted">Login for more</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card mb-3" style={{ maxWidth: '540px' }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={img02} className="img-fluid rounded-start" alt="card image" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Another Card</h5>
                                <p className="card-text">This is another card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-muted">Login for more</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div><br></br>
            <p>Welcome to Company A, your premier destination for high-quality electronic circuit components. With a dedication to excellence and a commitment to innovation, we pride ourselves on offering a comprehensive range of electronic components designed to meet the needs of various industries and applications.</p>
<p>At Company A, quality is our top priority. We source our components from trusted suppliers and ensure that each product meets stringent quality standards. Whether you're looking for resistors, capacitors, transistors, or any other electronic component, you can trust Company A to deliver reliable and performance-driven solutions.</p>
<p>With a team of experienced professionals and a state-of-the-art facility, we are equipped to handle projects of any scale. Our technical expertise and industry knowledge enable us to provide expert guidance and support, helping you find the perfect components for your projects.</p>
<p>Partner with Company A and experience the difference in electronic component solutions. We are committed to providing exceptional service, competitive pricing, and timely delivery to ensure your success.</p>


        </div>
    );
}
