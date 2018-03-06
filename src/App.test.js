import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'
import App from './App';

describe('App test', () => {

  it('renders without crashing', () => {
    ReactTestUtils.renderIntoDocument(<App />)
  })
  
  it('has focus on year when mounted', () => {
    const component = ReactTestUtils.renderIntoDocument(<App />)
    const input = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'input').find(e => e.id === 'year')
    expect(document.activeElement).toBe(input)
  })

  it('shows alert when date of birth is filled in correctly', () => {
    global.alert = jest.fn()
    const component = ReactTestUtils.renderIntoDocument(<App />)

    const changeInputValue = (input, value) => {
      input.setCustomValidity = () => { }
      input.value = value
      ReactTestUtils.Simulate.change(input)
    }
    changeInputValue(component.yearInput, '1999')
    changeInputValue(component.monthInput, '12')
    changeInputValue(component.dayInput, '31')
    ReactTestUtils.Simulate.click(component.nextButton)

    expect(global.alert).toHaveBeenCalled()
  })

  it('sets custom validity when date of birth is filled in incorrectly', () => {
    const component = ReactTestUtils.renderIntoDocument(<App />)

    const messages = [];
    const changeInputValue = (input, value) => {
      input.setCustomValidity = (message) => {
        message && messages.push(message)
      }
      input.value = value
      ReactTestUtils.Simulate.change(input)
    }
    changeInputValue(component.yearInput, 'this')
    changeInputValue(component.monthInput, 'is')
    changeInputValue(component.dayInput, 'test')
    ReactTestUtils.Simulate.click(component.nextButton)

    expect(messages.length).toBe(3)
  })

})
