import React from 'react'
import PlannedTrips from '../components/PlannedTrips'
import { shallow } from 'enzyme'

describe('PlannedTrips Component testing', () => {
  test('Test for button', () => {
    const wrapper = shallow(<PlannedTrips />)
    expect(wrapper.find('button')).toBeTruthy()
  })
})