import React from 'react'
import ContactSection from '../components/ContactSection'
import { shallow } from 'enzyme'

describe('ContactSection Component testing', () => {
  test('Test for link ', () => {
    const wrapper = shallow(<ContactSection />)
    expect(wrapper.find('Link')).toBeTruthy()
  })
})