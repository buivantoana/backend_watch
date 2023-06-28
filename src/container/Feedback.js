import React from 'react';
import "./feedback.css";
import Slider from 'react-slick';

import image1 from "../image/z3931163418461_87f84e1c61470c0c71c45594d4a03e51.jpg"
import image2 from "../image/z3931163418133_2f0049e0b899a2760edc353688f34171.jpg"
import image3 from "../image/z3931163413826_28b82d2b0bb54aa49eee66f8fadabbb5.jpg"
import image4 from "../image/z3931163413737_274ca97545c13da1ab35f0e898411b69.jpg"
import image5 from "../image/z3931163405988_c7900d80007be7dea4a98a88b58744d0.jpg"
import image6 from "../image/z3931163403917_79ea6de90a1bafec69439b9f542b3e78.jpg"

function Feedback() {

    const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
     autoplaySpeed: 2000,
  };
    return (
        <div className='feedback'>
            <div className="feedback-title">
                <h2>PHẢN HỒI KHÁCH HÀNG</h2>
                <p>Cảm ơn khách hàng đã luôn tin tưởng!</p>
            </div>
            <div className="slider-feedback">
                <Slider {...settings}>
        <div>
         <img src={image6}  alt="" width="352px" height="500px" />
        </div>
        <div>
          <img src={image1} alt="" width="352px" height="500px" />
        </div>
        <div>
          <img src={image2} alt="" width="352px" height="500px" />
        </div>
        <div>
          <img src={image3} alt="" width="352px" height="500px" />
        </div>
        <div>
          <img src={image4} alt="" width="352px" height="500px" />
        </div>
        <div>
         <img src={image5} alt="" width="352px" height="500px" />
        </div>
      </Slider>
            </div>
        </div>
    );
}

export default Feedback;