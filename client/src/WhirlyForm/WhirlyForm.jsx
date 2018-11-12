import React, { Component } from 'react';
import './WhirlyForm.css';

class WhirlyForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      skill: ''
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    
    const alphanumeric = /^[a-z0-9]+$/i;
    if (!alphanumeric.test(this.state.name) || !alphanumeric.test(this.state.skill)) {
      window.alert('Input must be alphanumeric!');
      return;
    }

    const response = await fetch('/api/whirlydoos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: this.state.name, skill: this.state.skill })
    });
    const body = await response.json();
    this.setState({ name: '', skill: '' }, () => this.props.updateWhirlydoos(body));
  };

  render() {
    return (
      <div className="whirly-form-container">
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Name</strong>
          </p>
          <input
            type="text"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <p>
            <strong>Skill</strong>
          </p>
          <input
            type="text"
            value={this.state.skill}
            onChange={e => this.setState({ skill: e.target.value })}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default WhirlyForm;
