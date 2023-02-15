import React from "react";

import EggGreen from "../../../images/Egg-Green.svg";
import "./LoadingEgg.css";

const LoadingEgg = (props) => {
  return (
    <div className={`${props.asOverlay && "loading-egg__overlay"}`}>
      <img className="bouncingegg" src={EggGreen} alt="Rentasauraus Egg" />
    </div>
  );
};

export default LoadingEgg;
