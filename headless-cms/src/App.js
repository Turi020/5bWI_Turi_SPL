import React from "react";
import "./App";

const Card = ({ image, firstname, lastname, description }) => {
  return (
    <div className="card">
      <img src={image} alt={firstname} />
      <div className="card-body">
        <h2>{firstname} {lastname}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
