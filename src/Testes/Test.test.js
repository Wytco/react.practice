import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AppTest from './AppTest'
import Character from './Character'

configure({
    adapter: new Adapter()
})

describe('<AppTest />', () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallow(<AppTest />)
    })

    it('Should render 3 characters in light side', () => {
        expect(wrapper.find(Character)).toHaveLength(3)

    })

    it('Should render 2 characters in dark side', () => {
        wrapper.setProps({
            side: 'dark'
        })
        expect(wrapper.find(Character)).toHaveLength(2)
    })

})