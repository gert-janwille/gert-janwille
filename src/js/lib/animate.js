import React from 'react';
import {splitIntoLines} from './util.js'

export const splitLines = (t, c, s = 12) => {
  const view = [];
  splitIntoLines(t, s).map((i,id) => view.push(<span key={i} className={`${c} ani-${id}`}>{i}</span>));
  return view;
}

// TODO: generate parts automatic
export const splitImage = (url, parts, c) => {
  const view = [];

  for (let i = 0; i < parts; i++) {
    const splitImageStyle = {
      background: `url(${url}) no-repeat center -${5*i}rem`,
      backgroundSize: 'cover',
      height: `5rem`,
      width: `100%`
    }

    view.push(<div key={i} className={`i-r-${c}-${i}`} style={splitImageStyle}></div>)
  }
  return view;
}

export const animateInUp = (arr) => {
  const view = [];
  arr.map(a => view.push(<span key={a} className={`moveInUp moveInUp-${a}`}>{a}</span>));
  return view;
}

export const breakword = str => {
  return [
    <span key='first' className="first-word">{str.split(" ")[0]}</span>,
    <span key='rest' className="rest-word">{str.split(" ").slice(1).join(" ")}</span>
  ];
}

export default {
  splitLines,
  splitImage,
  animateInUp,
  breakword
}
