import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import PixabaySearch from './PixabaySearch';
import _ from 'lodash';
import * as _sc from '../data';
import TilesContainer from './TilesContainer';

class Root extends Component {
  constructor(props){
    super(props)
    this.state = {
      query: '',
      tiles: [],
      contentIndex: 15,
      placeholder: 'search PIXABAY',
      selected: {}
    }
    this.getImages = :: this.getImages;
    this.handleTileClick = :: this.handleTileClick;
    this.getImages(this.state.query);
  }

  getImages(query) {
    var API_KEY = _sc.pb;
    var pageParam = (query.length > 4) ? '&page='+Math.ceil(Math.random(50)*10):'';
    var URL = 'https://pixabay.com/api/?key='+API_KEY+'&q='+encodeURIComponent(query)
              +'&orientation=horizontal&per_page=96&image_type=photo'+pageParam;
    axios.get(URL)
    .then(res => {console.log('here')
      const {hits} = res.data;
      this.setState({ query,  tiles: [ ...hits ] });
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleTileClick(hit) {
    const { webformatURL, tags, webformatWidth, webformatHeight } = hit;
    document.open(webformatURL,
        tags,
        `toolbar=0,status=0,width=${webformatWidth},height=${webformatHeight}`);
  }

  render() {
    const imageSearch = _.debounce(this.getImages, 300);
    const { tiles, placeholder, query, selected } = this.state;

    return (
      <div>
        <TilesContainer
          handleTileClick={this.handleTileClick}
          selected={selected}
          tiles={tiles}/>
        <PixabaySearch
          classContainer="searchbar-container"
          classInner="searchbar searchbar-overlay"
          query={query}
          onSearchQueryChanged={this.getImages}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

render(<Root />, document.getElementById('spa'));
