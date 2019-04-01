import React from 'react'
import SignUp from '../components/SignUp'
import { shallow } from 'enzyme'

describe('SignUp Component testing', () => {
  test('Test for h2', () => {
    const wrapper = shallow(<SignUp />)
    expect(wrapper.find('h2').length).toEqual(1)
  })
})
describe('SignUp Component testing', () => {
  test('Test for h2 count', () => {
    const wrapper = shallow(<SignUp />)
    expect(wrapper.find('h2')).toBeTruthy()
  })
})

describe('SignUp Component testing', () => {
  test('Test for number of buttons', () => {
    const wrapper = shallow(<SignUp />)
    expect(wrapper.find('button').length).toEqual(1)
  })
})
