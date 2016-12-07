import React, { Component } from 'react';

export default class PixabaySearch extends Component {
  constructor(props){
    super(props);
    this.state = { query: this.props.query };
    this.inputChanged = :: this.inputChanged;
  }
  inputChanged(e) {
    this.setState({ query: e.target.value });
    this.props.onSearchQueryChanged(e.target.value);
  }
  render() {
    return (
      <div className={this.props.class}>
        <input type="text"
          style={this.props.styles}
          onChange={this.inputChanged}
          value={this.state.query.toUpperCase()}
          placeholder={this.props.placeholder}/>
      </div>
    );
  }
}
