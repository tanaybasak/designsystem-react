import React from 'react';
import { shallow, mount } from 'enzyme';

import Breadcrumb from './Breadcrumb';

const breadcrumbModel = {
    model: [
        { label: "Breadcrumb 4", url: "" },
        { label: "Breadcrumb 2", url: "https://google.co.in" },
        { label: "Breadcrumb 3" }
    ]
};

describe('<breadcrumb> component', () => {
    it('renders breadcrumb correctly', () => {
        const wrapper = shallow(<Breadcrumb />);
        expect(wrapper.find("ul")).toHaveLength(1);
    });
    it('render breadcrumb with props', () => {
        const wrapper = shallow(<Breadcrumb {...breadcrumbModel} />);
        expect(wrapper.instance().props.model).toEqual(breadcrumbModel.model);
    });
    it('allows to set props in breadcrumb', () => {
        const wrapper = mount(<Breadcrumb id="breadcrumbtest" {...breadcrumbModel} />);
        expect(wrapper.props().id).toEqual("breadcrumbtest");
        wrapper.setProps({className: 'custombreadcrumbstyle'});
        expect(wrapper.props().className).toEqual("custombreadcrumbstyle");
    })
});