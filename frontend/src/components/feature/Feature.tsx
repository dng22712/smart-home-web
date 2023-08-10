import React from 'react';
import './feature.css';

type props ={
  title: string;
  text: string;
}

const Feature = ({title,text}:props) => (
  <div className="gpt3__features-container__feature">
    <div className="gpt3__features-container__feature-title">
      <div />
      <h1>{title}</h1>
    </div>
    <div className="gpt3__features-container_feature-text">
      <p>{text}</p>
    </div>
  </div>
);

export default Feature;