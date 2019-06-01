import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Button from './Button';

describe('<Button> component', () => {
    it('renders Button correctly', () => {
        const tree = renderer.create(<Button />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('simulate click event in Button and is called twice', () => {
        const mockCallBack = jest.fn();
        const button = shallow((<Button onClick={mockCallBack}>Click</Button>));
        button.find('button').simulate('click');
        button.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(2);
    });
});