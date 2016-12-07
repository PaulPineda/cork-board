import React from 'react';

const Tile = (props) => {
  function handleTileClick(){
    props.handleClick(props.imageUrl.id, props.imageUrl.hiresURL);
  }
  return (
    <div className={props.className} onClick={handleTileClick}>
      <img src={props.imageUrl.loresURL}/>
    </div>
  );
}
export default Tile;
