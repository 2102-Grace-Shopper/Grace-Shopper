import React from 'react';
import { Carousel } from "react-bootstrap";



const Home = (props) => {

return (
<Carousel fade>
  <Carousel.Item>
    <img
      className="d-block w-100"
      style={{
        align: "center",
        maxHeight: "800px",
    }}
      src="https://i.postimg.cc/bvvsr4pT/5e0deefd-427f-478f-9d04-0103d8969d67.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>FIDO</h3>
      <p>A Classic Great Dog</p>
      <h6>Pug</h6>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      style={{
        align: "center",
        maxHeight: "800px",
    }}
      src="https://i.postimg.cc/KYs4MQYy/8536-28743-5665.jpg"
      alt="Second slide"
    />
    <Carousel.Caption>
      <h3>BELLA</h3>
      <p>Smart and Witty</p>
      <h6>Doge Master</h6>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      style={{
        align: "center",
        maxHeight: "800px",
    }}
      src="https://i.postimg.cc/qRhqXnt6/2505f628-614d-4521-a26b-70897a51d4fd.jpg"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>DUKE</h3>
      <p>A Beautiful Hairy Dog</p>
      <h6>Corgi</h6>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
)
      };

export default Home;