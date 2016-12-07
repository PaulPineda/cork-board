import React from 'react';

const Tile = (props) => {
  function handleTileClick(){
    props.handleClick(props.payload);
  }
  return (
    <div className={props.className} onClick={handleTileClick}>
      <img src={props.url}/>
    </div>
  );
}
export default Tile;
