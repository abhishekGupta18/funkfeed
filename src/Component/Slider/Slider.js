import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  "https://images.pexels.com/photos/6146929/pexels-photo-6146929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/5935228/pexels-photo-5935228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/4555321/pexels-photo-4555321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2694434/pexels-photo-2694434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/3799832/pexels-photo-3799832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

function Slider() {
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setSelectedImage((selectedImage) =>
        selectedImage < 4 ? selectedImage + 1 : 0
      );
    }, 4000);
  }, []);

  return (
    <div className="slider-container">
      <Link to="/store">
        <img src={slides[selectedImage]} alt={`banner${selectedImage + 1}`} />
      </Link>
    </div>
  );
}

export default Slider;
