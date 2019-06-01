import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Button from './Button';

describe('<Button> component', () => {
    it('snapshots/renders Button correctly', () => {
        const tree = renderer.create(<Button />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('simulate click event in Button and is called twice', () => {
        const mockCallBack = jest.fn();
        const wrapper = shallow((<Button onClick={mockCallBack}>Click</Button>));
        wrapper.find('button').simulate('click');
        wrapper.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(2);
    });
});