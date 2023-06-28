import React, { useEffect, useState } from "react";
import "./banner.css";
import Image1 from "./image1";
import Image2 from "./image2";
import Image3 from "./image3";

function Banner() {
  let [count, setcount] = useState(1);
  let [check, setcheck] = useState(false);

  useEffect(() => {
    let timeid = setInterval(() => {
      Next();
    }, 4000);

    return () => {
      return clearInterval(timeid);
    };
  });

  const Prev = () => {
    setcount(count - 1);
    setcheck(true);
    if (count < 2) {
      setcount(3);
    }
  };
  const Next = () => {
    setcount(count + 1);
    setcheck(false);
    if (count > 2) {
      setcount(1);
    }
  };

  return (
    <div className='banner-slider'>
      {count === 1 ? <Image1 check={check === true ? "hide1" : "hide2"} /> : ""}
      {count === 2 ? <Image2 check={check === true ? "hide3" : "hide4"} /> : ""}
      {count === 3 ? <Image3 check={check === true ? "hide5" : "hide6"} /> : ""}

      <div className='click'>
        <button onClick={Prev}>
          <i className='fa-solid fa-chevron-left'></i>
        </button>
        <button onClick={Next}>
          <i className='fa-solid fa-chevron-right'></i>
        </button>
      </div>
    </div>
  );
}

export default Banner;
