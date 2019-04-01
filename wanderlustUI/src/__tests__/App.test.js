import React from 'react'
import App from '../components/App'
import { shallow } from 'enzyme'

describe('App Component testing', () => {
  test('Test for Routes', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('Route')).toBeTruthy()
  })
})
