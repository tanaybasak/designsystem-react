import React from 'react'
import Heading from './Heading'
import { mount } from 'enzyme';

test("can provide a label",()=>{
    const wrapper = mount(<Heading type="h1">Patronus</Heading>) 
    expect(wrapper.text()).toBe('Patronus')
})
test("can provide custom class name",()=>{
    const wrapper = mount(<Heading type="h1" className="patron-header">Patronus</Heading>)
    expect(wrapper.find(Heading).hasClass('patron-header')).toBe(true);
})
test("render heading with h1 type", ()=>{
    const wrapper = mount(<Heading type="h1">Heading</Heading>)
    expect(wrapper.find('.hcl-h1').length).toBe(1)
})
test("render heading with h2 type", ()=>{
    const wrapper = mount(<Heading type="h2">Heading</Heading>)
    expect(wrapper.find('.hcl-h2').length).toBe(1)
})
test("render heading with h3 type", ()=>{
    const wrapper = mount(<Heading type="h3">Heading</Heading>)
   expect(wrapper.find('.hcl-h3').length).toBe(1)
})
test("render heading with h4 type", ()=>{
    const wrapper = mount(<Heading type="h4">Heading</Heading>)
    expect(wrapper.find('.hcl-h4').length).toBe(1)
})
test("render heading with h5 type", ()=>{
    const wrapper = mount(<Heading type="h5">Heading</Heading>)
    expect(wrapper.find('.hcl-h5').length).toBe(1)
})
test("render heading with h6 type", ()=>{
    const wrapper = mount(<Heading type="h6">Heading</Heading>)
    expect(wrapper.find('.hcl-h6').length).toBe(1)
})