import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import prefix from '../../settings';
import overflowlist from '../../molecules/Overflowmenu/sample-overflow-list.json';
import Overflowmenu from './Overflowmenu';

describe('<Overflowmenu> component', () => {
    it('snapshots/renders Overflowmenu correctly', () => {
        const tree = renderer.create(<Overflowmenu listItems={overflowlist} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('triggers click event in Overflowmenu', () => {
        const mockonclick = jest.fn();
        const overflowmenu = mount(<Overflowmenu listItems={overflowlist} onClick={mockonclick}/>);
        overflowmenu.find(`.${prefix}-ellipsis`).simulate('click');
        expect(mockonclick.mock.calls.length).toEqual(1);
    });
});