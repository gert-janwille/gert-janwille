import React from 'react';

const Indicator = ({skill}) => {

  const renderDots = () => {
    const view = [];

    for (let i = 0; i < 4; i++) {
      view.push(<span key={i} className={`indication-dot ${skill > 0 ? `fill` : null}`}></span>)
      skill--;
    }

    return view;
  }

  return(
    <span className="indicator">
      {skill!== "star" ? renderDots() : <span className="star-indicator"></span>}
    </span>
  );
}

export default Indicator;
