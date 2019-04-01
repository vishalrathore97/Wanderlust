import React from 'react'
import Register from '../components/Register'
import { shallow } from 'enzyme'

describe('Register Component Button-testing', () => {
  test('Test for Button', () => {
    const wrapper = shallow(<Register />)
    expect(wrapper.find('Button')).toBeTruthy()
  })
})

describe('Register Component--name testing', () => {
  test('Test for name field', () => {
    const wrapper = shallow(<Register />)
    expect(wrapper.find('name')).toBeTruthy()
  })
})

describe('Register Component--input testing', () => {
    test('Test for input field', () => {
      const wrapper = shallow(<Register />)
      expect(wrapper.find('input')).toBeTruthy()
    })
  })

  describe('Register Component--contact testing', () => {
    test('Test for contact field', () => {
      const wrapper = shallow(<Register />)
      expect(wrapper.find('#contactNo')).toBeDefined()
    })
  })
  
  describe('Register Component--name testing', () => {
    test('Test for name field', () => {
      const wrapper = shallow(<Register />)
      expect(wrapper.find('#name')).toBeDefined()
    })
  })
  
