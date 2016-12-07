import React, { Component } from 'react';

export default class PixabaySearch extends Component {
  constructor(props){
    super(props);
    this.state = { query: this.props.query };
    this.inputChanged = :: this.inputChanged;
    this.keyDownHandler = :: this.keyDownHandler;
  }
  inputChanged(e) {
    this.setState({ query: e.target.value });
    this.props.onSearchQueryChanged(e.target.value);
  }
  keyDownHandler(e){
    if(e.key === "Enter")this.inputChanged(e);
  }
  render() {
    const { classInner, classContainer, styles, placeholder } = this.props;

    return (
      <div className={classContainer}>
        <div className={classInner}>
          <input type="text"
            style={styles}
            onChange={this.inputChanged}
            onKeyDown={this.keyDownHandler}
            value={this.state.query.toUpperCase()}
            placeholder={placeholder}/>
        </div>
      </div>
    );
  }
}
