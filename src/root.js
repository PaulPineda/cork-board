import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import PixabaySearch from './PixabaySearch';
import _ from 'lodash';
import * as _sc from '../data';

class Root extends Component {
  constructor(props){
    super(props)
    this.state = {
      query: '',
      images: [],
      contentIndex: 15,
      placeholder: 'search bar'
    }
    this.getImages = :: this.getImages;
    this.getImages(this.state.query);
  }

  getImages(query) {
    var API_KEY = _sc.pb;
    var pageParam = (query.length > 4) ? '&page='+Math.ceil(Math.random(50)*10):'';
    var URL = 'https://pixabay.com/api/?key='+API_KEY+'&q='+encodeURIComponent(query)
              +'&orientation=horizontal&image_type=photo'+pageParam;
    axios.get(URL)
    .then(res => {
      this.extract8Images(query, res.data.hits);
    })
    .catch(err => {
      //this.setState({ query })
    })
  }
  extract8Images(query, hits){
    const urlsOnly = hits.map((val, i) => {
      if(i === this.state.contentIndex)
        return {
          backgroundImage: `url(${val.webformatURL})`,
          ...styles.mainContentBg
        };

      return {
        backgroundImage: `url(${val.webformatURL})`,
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
  componentDidMount(){

  }
  render() {
    const { images } = this.state;
    const imageSearch = _.debounce(this.getImages, 300);
    return (
      <div>
        <div className="row row-limits">
          <div className="item1">MENU</div>
          <div className="item2 mobile-hide" style={{...images[0]}}></div>
          <div className="item1">MENU</div>
          <div className="item2 mobile-hide" style={{...images[1]}}></div>
        </div>
        <div className="row row-content">
          <div className="item1 column mobile-hide">
            <div className="item1-column" style={{...images[2]}}></div>
            <div className="item1"></div>
          </div>
          <div className="item4" style={images[this.state.contentIndex]}>
              <PixabaySearch
                onSearchQueryChanged={imageSearch}
                style={styles.headingText}
                query={this.state.query}
                placeholder={this.state.placeholder}
              />
          </div>
          <div className="item1 column mobile-hide">
            <div className="item1-column"></div>
            <div className="item1-column" style={{...images[5]}}></div>
          </div>
        </div>
        <div className="row row-limits">
          <div className="item2 mobile-hide" style={{...images[6]}}></div>
          <div className="item1">MENU</div>
          <div className="item2 mobile-hide" style={{...images[7]}}></div>
          <div className="item1">MENU</div>
        </div>
        <div className="row mobile-row">
          <div className="item1 column">CONTENT</div>
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
