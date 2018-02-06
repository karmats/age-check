import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as util from './util'

class App extends Component {
  state = {
    year: '',
    month: '',
    day: '',
    error: {}
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
      day: evt.currentTarget.value,
    })
  }

  next = () => {
    const { values } = this.validateForm();
    if (values.year && values.month && values.day) {
      const dob = new Date(Date.UTC(values.year, values.month, values.day))
      const age = util.age(dob);
      if (age >= 18) {
        alert(`Congratulations! You're birthday is ${dob.toISOString().slice(0, 10)} and you are ${age} years old. You can now enter this awesome page!`)
      } else {
        alert(`I'm so sorry! You're birthday is ${dob.toISOString().slice(0, 10)} and you are just ${age} years old. You can't enter this awesome page :(`)
      }
    }
  }

  validateForm = () => {
    const validate = (valFn, ...args) => {
      try {
        return { value: valFn.apply(valFn, args) }
      } catch (error) {
        return { error: error.message };
      }
    }
    const yearVal = validate(util.validateYear, this.state.year);
    const monthVal = validate(util.validateMonth, this.state.month);
    const dayVal = validate(util.validateDay, this.state.day);
    this.setState({
      error: {
        year: yearVal.error,
        month: monthVal.error,
        day: dayVal.error
      }
    });
    return { values: { year: yearVal.value, month: monthVal.value, day: dayVal.value } }
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
