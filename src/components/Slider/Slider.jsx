import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import slider1 from "../../assets/images/slider-1.jpg";
import slider2 from "../../assets/images/slider-2.jpg";
import slider3 from "../../assets/images/slider-3.jpg";
import slider4 from "../../assets/images/slider-4.jpg";
import slider5 from "../../assets/images/slider-5.jpg";

const Slider = () => {
  return (
    <>
      <section className="section-slider">
        <Carousel>
          <div>
            <img src={slider1} alt="Slider 1" />
          </div>
          <div>
            <img src={slider2} alt="Slider 2" />
          </div>
          <div>
            <img src={slider3} alt="Slider 3" />
          </div>
          <div>
            <img src={slider4} alt="Slider 4" />
          </div>
          <div>
            <img src={slider5} alt="Slider 5" />
          </div>
        </Carousel>
      </section>
    </>
  );
};

export default Slider;
