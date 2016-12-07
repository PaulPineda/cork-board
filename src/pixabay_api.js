import axios from 'axios';
import * as _sc from '../data';

export function getImages = (query, createTile) => {
  var API_KEY = _sc.pb;
  var pageParam = (query.length > 4) ? '&page='+Math.ceil(Math.random(50)*10):'';
  var URL = 'https://pixabay.com/api/?key='+API_KEY+'&q='+encodeURIComponent(query)
            +'&orientation=horizontal&per_page=96&image_type=photo'+pageParam;
  axios.get(URL)
  .then(res => {
    // this.extract8Images(query, res.data.hits);
    createTile(query, res.data.hits);
  })
  .catch(err => {
    //this.setState({ query })
  })
}
