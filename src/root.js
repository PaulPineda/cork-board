import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import PixabaySearch from './PixabaySearch';
import _ from 'lodash';
import * as _sc from '../data';
import Tile from './Tile';

class Root extends Component {
  constructor(props){
    super(props)
    this.state = {
      query: '',
      images: [],
      contentIndex: 15,
      placeholder: 'search bar',
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
    .then(res => {
      // this.extract8Images(query, res.data.hits);
      this.createPolaroid(query, res.data.hits);
    })
    .catch(err => {
      //this.setState({ query })
    })
  }

  createPolaroid(query, hits){
    const urlsOnly = hits.map(val => {
      return {
        id: val.id,
        loresURL: val.previewURL,
        hiresURL: val.webformatURL
      }
    });
    this.setState({
      query,
      images: [
        ...urlsOnly
      ]
    })
  }

  extract8Images(query, hits){
    const urlsOnly = hits.map((val, i) => {
      if(i === this.state.contentIndex)
        return {
          backgroundImage: `url(${val.previewURL})`,
          ...styles.mainContentBg
        };

      return {
        backgroundImage: `url(${val.previewURL})`,
        ...styles.mainContentBg,
        WebkitFilter: 'saturate(30%) hue-rotate(200deg)',//'grayscale(100%)',
        boxShadow: 'inset 0 0 100px #000'
      }
    });
    this.setState({
      query,
      images: [
        ...urlsOnly
      ]
    })
  }

  createTiles(images) {
    const {selected} = this.state
    const tiles = images.map((val, i) => {
      const classes = (typeof selected[images[i].id] !== 'undefined') ? "selected" :"";
      return (
        <Tile
          key={images[i].id}
          className={classes}
          handleClick={this.handleTileClick}
          imageUrl={images[i]}
        />
      );
    }, this);
    return (
      <div className="row row-limits polaroids">
        {tiles}
      </div>
    );
  }
  handleTileClick(id, url) {
    if(this.state.selected[id]){
      let selected = Object.assign({}, this.state.selected);
      delete selected[id];

      this.setState({
        selected
      });
    }else{
      this.setState({
        selected: {
          ...this.state.selected,
          [id]: true
        }
      });
    }
  }
  componentDidMount(){

  }

  render() {
    const imageSearch = _.debounce(this.getImages, 300);
    const { images } = this.state;

    return (
      <div>
        <div>{this.createTiles(images)}</div>
        <div className="searchbar-container">
          <PixabaySearch
            class="searchbar searchbar-overlay"
            query={this.state.query}
            onSearchQueryChanged={this.getImages}
            style={styles.headingText}
            placeholder="Search..."
          />
        </div>
      </div>
    );
  }
}

const styles = {
  headingText: {
    color: 'blue',
    mixBlendMode: 'multiply',
    alignItems: 'center'
  },
  mainContentBg: {
    backgroundPosition: '50% 20%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    WebkitFilter: 'saturate(100%)'
  }
}

render(<Root />, document.getElementById('spa'));
