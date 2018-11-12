import React, { Component } from 'react';
import './WhirlyCard.css';

class WhirlyCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.whirly.name,
      skill: this.props.whirly.skill,
      edit: false
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    
    const alphanumeric = /^[a-z0-9]+$/i;
    if (!alphanumeric.test(this.state.name) || !alphanumeric.test(this.state.skill)) {
      window.alert('Input must be alphanumeric!');
      return;
    }

    const response = await fetch('/api/whirlydoos/update/' + this.props.whirly.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: this.state.name, skill: this.state.skill })
    });
    const body = await response.json();
    this.setState({ edit: false }, () => this.props.updateWhirlydoos(body));
  };

  handleDelete = async e => {
    const response = await fetch('/api/whirlydoos/delete/' + this.props.whirly.id, {
      method: 'DELETE'
    });
    const body = await response.json();
    this.setState({ edit: false }, () => this.props.updateWhirlydoos(body));
  };

  enableEdit() {
    this.setState({ edit: true });
  }

  convertDate(d) {
    d = new Date(d);
    const day = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    const time = d.toLocaleTimeString();
    return day + ' @ ' + time;
  }

  render() {
    const { whirly } = this.props;
    const nameInput = <input 
                        type="text"
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })} />;
    const skillInput = <input 
                        type="text"
                        value={this.state.skill}
                        onChange={e => this.setState({ skill: e.target.value })} />;
    const submitButton = <button type="submit">Submit</button>;
    const editButton = <button onClick={() => this.enableEdit()} type="button">Edit</button>
    return (
      <div className="whirly-card">
        <form onSubmit={this.handleSubmit}>
          <h1>Name: {this.state.edit ? nameInput : whirly.name}</h1>
          <h2>Skill: {this.state.edit ? skillInput : whirly.skill}</h2>
          <h2>Date Added: {this.convertDate(whirly.created_at)}</h2>
          { !this.state.edit || submitButton }
          { this.state.edit || editButton }
          <button className="delete-button" onClick={this.handleDelete} type="button">Delete</button>
        </form>
      </div>
    );
  }
}

export default WhirlyCard;
