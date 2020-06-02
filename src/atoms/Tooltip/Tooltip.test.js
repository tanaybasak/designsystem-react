import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Tooltip from './Tooltip';

const getTooltipContainer = () => {
  return global.document.querySelector('.hcl-tooltip');
};

it('Tooltip renders correctly', () => {
  const tree = renderer
    .create(
      <Tooltip content="Definition Tooltip" direction="right" type="definition">
        Content
      </Tooltip>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// Use this in your test after mounting if you need just need to let the query finish without updating the wrapper

it('Definition Tooltip generated on mouse enter', done => {
  const tooltip = mount(
    <Tooltip content="Definition Tooltip" direction="right" type="definition">
      Content
    </Tooltip>
  );
  expect(getTooltipContainer()).toBeFalsy();
  tooltip.find('span').simulate('mouseEnter');
  expect(tooltip.find('span').props().className).toEqual(
    'hcl-tooltip-dottedline'
  );
  expect(getTooltipContainer().hasChildNodes()).toBeTruthy();
  tooltip.find('span').simulate('mouseLeave');
  setTimeout(() => {
    expect(getTooltipContainer()).toBeFalsy();
    done();
  }, 1000);

  //   jest.useFakeTimers();
  //   setTimeout(() => {
  //     // expect(tooltip.find('span').props().className).not.toEqual(
  //     //     'hcl-tooltip-dottedline'
  //     //   );
  //     done();
  //       expect(getTooltipContainer()).toBeFalsy();
  //   }, 1000);
  //   jest.runAllTimers();

  //jest.advanceTimersByTime(5000);
  //jest.runAllTimers();

  //setTimeout(()=>{
  //   it('mock setTimeout test', done => {
  //     setTimeout(() => {
  //       expect(tooltip.find('span').props().className).not.toEqual(
  //         'hcl-tooltip-dottedline'
  //       );
  //       expect(getTooltipContainer()).toBeFalsy();
  //       done();
  //     }, 1000);
  //   });
  // expect(tooltip.find("span").props().className).not.toEqual(
  //     "hcl-tooltip-dottedline"
  //   );
  //   expect(getTooltipContainer()).toBeFalsy();
  //} , 400)
});

it('Icon Tooltip generated on mouse enter on left direction', done => {
  const tooltip = mount(
    <Tooltip content="Filter" direction="left" type="icon">
      Content
    </Tooltip>
  );
  expect(getTooltipContainer()).toBeFalsy();
  tooltip.find('span').simulate('mouseEnter');
  expect(getTooltipContainer().hasChildNodes()).toBeTruthy();
  tooltip.find('span').simulate('mouseLeave');
  setTimeout(() => {
    expect(getTooltipContainer()).toBeFalsy();
    done();
  }, 1000);
});

it('Icon Tooltip generated on mouse enter on top direction', done => {
  const tooltip = mount(
    <Tooltip content="Filter" direction="top" type="icon">
      Content
    </Tooltip>
  );
  expect(getTooltipContainer()).toBeFalsy();
  tooltip.find('span').simulate('mouseEnter');
  expect(getTooltipContainer().hasChildNodes()).toBeTruthy();
  tooltip.find('span').simulate('mouseLeave');
  setTimeout(() => {
    expect(getTooltipContainer()).toBeFalsy();
    done();
  }, 1000);
});

it('Interactive Tooltip generated on mouse Click and Updated Position on Scroll', () => {
  global.innerHeight = 500;
  global.document.height = 1200;
  global.document.scrollTop = 50;
  const tooltip = mount(
    <Tooltip
      content="Interactive Tooltip"
      direction="bottom"
      type="interactive"
    >
      Content
    </Tooltip>
  );
  expect(getTooltipContainer()).toBeFalsy();
  tooltip.find('span').simulate('click');
  expect(getTooltipContainer().hasChildNodes()).toBeTruthy();
  global.document.dispatchEvent(new Event('scroll'));
});
