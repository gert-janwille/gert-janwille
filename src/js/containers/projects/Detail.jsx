import React from 'react';

const Detail = ({match}) => {
  const {title} = match.params;
  console.log(title);

  return(
    <h2>Detail</h2>
  );
}

export default Detail
