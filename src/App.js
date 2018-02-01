import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    year: '',
    month: '',
    day: ''
  }

  yearChanged = (evt) => {
    this.setState({
      year: evt.currentTarget.value
    })
  }

  monthChanged = (evt) => {
    this.setState({
      month: evt.currentTarget.value
    })
  }

  dayChanged = (evt) => {
    this.setState({
      day: evt.currentTarget.value
    })
  }

  next = () => {
    // Create UTC date. Month - 1 because javsascript months starts with 0
    const dob = new Date(Date.UTC(parseInt(this.state.year), parseInt(this.state.month) - 1, parseInt(this.state.day)))
    alert(dob.toISOString().slice(0, 10))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome!</h1>
          <h3 className="App-subtitle">To continue you need to verify that you are over 18.</h3>
        </header>
        <p className="App-intro">
          <input id="year" onChange={this.yearChanged} placeholder="YYYY" />
          <input id="month" onChange={this.monthChanged} placeholder="MM" />
          <input id="day" onChange={this.dayChanged} placeholder="DD" />
        </p>
        <p>
          <button onClick={this.next}>Next</button>
        </p>
      </div>
    );
  }
}

export default App;
