import React from 'react';
import { shallow } from 'enzyme';
import prefix from '../../settings';

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
        const props = wrapper.instance().props;
        expect(props.model).toEqual(breadcrumbModel.model);
    });
});