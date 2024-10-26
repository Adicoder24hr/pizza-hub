import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const CarouselComponent = () => {
  const [images, setImages] = useState([]);
  const api_url = "https://api.unsplash.com/search/photos?page=1&query=pizza&client_id=2URXGnJSz-898hJs_K2MfJxl7V9IYOAAZhvT5HCpL3A";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(api_url);
        const data = await response.json();
        setImages(data.results);
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <Carousel autoPlay infiniteLoop showStatus={false} emulateTouch showThumbs={false} navButtonsAlwaysVisible axis='horizontal'>
      {images.slice(3,6).map((image, index) => (
        <div key={index} style={{ maxHeight: "36rem" }} className="object-center brightness-50 object-cover">
          <img src={image.urls.regular} alt={`Carousel image-${index + 1}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
