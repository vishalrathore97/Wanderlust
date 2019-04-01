import React from 'react'
import BookedTrips from '../components/BookedTrips'
import { shallow } from 'enzyme'

describe('BookedTrips Component testing', () => {
  test('Test for button', () => {
    const wrapper = shallow(<BookedTrips />)
    expect(wrapper.find('Button')).toBeTruthy()
  })
})