import React from 'react';
import Tile from './Tile';

const TilesContainer = ({tiles, selected, classes, handleTileClick}) => {
  return (
    <div className="row row-limits polaroids">
      {
        tiles.map((val, i) => {
          const classes = (typeof selected[val.id] !== 'undefined') ? "selected" :"";
          return (
            <Tile
              key={val.id}
              className={classes}
              handleClick={handleTileClick}
              payload={val}
              url={val.previewURL}
            />
          );
        }, this)
      }
    </div>
  );
}
export default TilesContainer;
