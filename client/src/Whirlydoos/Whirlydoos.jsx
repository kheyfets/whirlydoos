import React, { Component } from 'react';
import WhirlyCard from './WhirlyCard/WhirlyCard.jsx';
import './Whirlydoos.css';

class Whirlydoos extends Component {

  renderWhirlydoos() {
    return [...this.props.whirlydoos].map(whirly => (
        <WhirlyCard whirly={whirly} key={whirly.id} updateWhirlydoos={this.props.updateWhirlydoos} />
      )
    );
  }

  render() {
    return (
      <div className="whirly-container">
        { this.renderWhirlydoos() }
      </div>
    );
  }
}

export default Whirlydoos;