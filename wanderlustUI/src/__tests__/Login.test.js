import React from 'react'
import Login from '../components/Login'
import { shallow } from 'enzyme'

describe('Login Component testing', () => {
  test('Test for h1', () => {
    const wrapper = shallow(<Login />)
    expect(wrapper.find('h1')).toBeTruthy()
  })
})

describe('Login Component testing', () => {
  test('Test for button', () => {
    const wrapper = shallow(<Login />)
    expect(wrapper.find('button')).toBeTruthy()
  })
})
