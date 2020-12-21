import React from 'react'
import Link from './Link'
import {mount} from 'enzyme'
import { exportAllDeclaration } from '@babel/types';

test("render Link component",()=>{
    const wrapper = mount(<Link> Link </Link>) 
    expect(wrapper.find(Link).length).toBe(1)
})