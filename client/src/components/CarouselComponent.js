import React from "react";
import Carousel from "react-bootstrap/Carousel";

const CarouselComponent = () => {
  return (
    <Carousel
      className="d-block mx-auto w-100"
      slide={true}
      controls={false}
      indicators={false}
      interval={3000}
    >
      <Carousel.Item>
        <img className="d-block w-100" src="/task-manager-img-1.jpg" alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/task-manager-img-2.jpg" alt="" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/task-manager-img-3.jpg" alt="" />
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
