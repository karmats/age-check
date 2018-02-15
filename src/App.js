import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as util from './util'

const validateForm = (year, month, day) => {
  const validate = (valFn, ...args) => {
    try {
      return { value: valFn.apply(valFn, args) }
    } catch (error) {
      return { error: error.message };
    }
  }
  const yearVal = validate(util.validateYear, year);
  const monthVal = validate(util.validateMonth, month);
  const dayVal = validate(util.validateDay, day);
  return {
    values: {
      year: yearVal.value,
      month: monthVal.value,
      day: dayVal.value
    },
    error: {
      year: yearVal.error,
      month: monthVal.error,
      day: dayVal.error
    }
  }
}

class App extends Component {
  state = {
    year: '',
    month: '',
    day: '',
    error: {}
  }

  yearChanged = (evt) => {
    const year = evt.currentTarget.value
    this.setState({
      year: year
    })
    if (year.length === 4) {
      this.monthInput.focus()
    }
  }

  monthChanged = (evt) => {
    const month = evt.currentTarget.value
    this.setState({
      month: month
    })
    if (month.length === 2) {
      this.dayInput.focus()
    }
  }

  dayChanged = (evt) => {
    const day = evt.currentTarget.value;
    this.setState({
      day: day,
    })
    if (day.length === 2) {
      this.nextButton.focus()
    }
  }

  next = () => {
    const { values, error } = validateForm(this.state.year, this.state.month, this.state.day);
    this.setState({
      error: error
    })
    if (values.year && values.month && values.day) {
      const dob = new Date(Date.UTC(values.year, values.month, values.day))
      const age = util.age(dob);
      const dobIso = dob.toISOString().slice(0, 10);
      if (age >= 18) {
        alert(`Congratulations! You're birthday is ${dobIso} and you are ${age} years old. You can now enter this awesome page!`)
      } else {
        alert(`I'm so sorry! You're birthday is ${dobIso} and you are just ${age} years old. You can't enter this awesome page :(`)
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome!</h1>
          <h3 className="App-subtitle">To continue you need to verify that you are over 18.</h3>
        </header>
        <div className="App-checkage">
          <input
            id="year"
            ref={(input) => { this.yearInput = input }}
            maxLength="4"
            className={`App-input ${this.state.error.year ? 'error' : ''}`}
            onChange={this.yearChanged}
            placeholder="YYYY" />
          <span>{this.state.error ? this.state.error.year : ''}</span>
          <input
            id="month"
            ref={(input) => { this.monthInput = input }}
            maxLength="2"
            className={`App-input ${this.state.error.month ? 'error' : ''}`}
            onChange={this.monthChanged}
            placeholder="MM" />
          <span>{this.state.error ? this.state.error.month : ''}</span>
          <input
            id="day"
            ref={(input) => { this.dayInput = input }}
            maxLength="2"
            className={`App-input ${this.state.error.day ? 'error' : ''}`}
            onChange={this.dayChanged}
            placeholder="DD" />
          <span>{this.state.error ? this.state.error.day : ''}</span>
        </div>
        <p>
          <button ref={(button) => { this.nextButton = button }} onClick={this.next}>
            Next
          </button>
        </p>
      </div>
    );
  }
}

export default App;
