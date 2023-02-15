import React from "react";

import EggGreen from "../images/Egg-Green.svg";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <img src={EggGreen} alt="Rentasaurus" />
      <h1 className="home-page__title">RENTASAURUS</h1>{" "}
      <h2 className="home-page__subtitle">
        Hatching your rental property dreams!
      </h2>
    </div>
  );
};

export default Home;
