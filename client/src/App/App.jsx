import React, { Component } from 'react';
import Whirlydoos from '../Whirlydoos/Whirlydoos.jsx';
import WhirlyForm from '../WhirlyForm/WhirlyForm.jsx';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      whirlydoos: []
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ whirlydoos: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/whirlydoos');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  updateWhirlydoos = async whirlydoos => this.setState({ whirlydoos: whirlydoos });

  render() {
    return (
      <div className="app-container">
        <div className="header">
          <h1>Whirlydoos</h1>
        </div>
        <WhirlyForm updateWhirlydoos={this.updateWhirlydoos} />
        <Whirlydoos updateWhirlydoos={this.updateWhirlydoos} whirlydoos={this.state.whirlydoos} />
      </div>
    );
  }
}

export default App;
