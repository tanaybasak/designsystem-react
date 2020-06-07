import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Tooltip from './Tooltip';
import regeneratorRuntime from 'regenerator-runtime';
import { act } from 'react-dom/test-utils';
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

const timeout = ms => {
  const p1 = new Promise(resolve => setTimeout(resolve, ms));
  return p1
    .then(function() {
      return true;
    })
    .catch(() => {
      return false;
    });
};

// Use this in your test after mounting if you need just need to let the query finish without updating the wrapper

it('Definition Tooltip generated on mouse enter', async () => {
  const tooltip = mount(
    <Tooltip content="Definition Tooltip" direction="right" type="definition">
      Content
    </Tooltip>
  );
  expect(getTooltipContainer()).toBeFalsy();
  tooltip.find('span').simulate('mouseEnter');
  expect(getTooltipContainer().hasChildNodes()).toBeTruthy();
  tooltip.find('span').simulate('mouseLeave');
  await act(async () => {
    await timeout(300);
  });
  expect(getTooltipContainer()).toBeFalsy();
});

it('Icon Tooltip generated on mouse enter on left direction', async () => {
  const tooltip = mount(
    <Tooltip content="Filter" direction="left" type="icon">
      Content
    </Tooltip>
  );
  expect(getTooltipContainer()).toBeFalsy();
  tooltip.find('span').simulate('mouseEnter');
  expect(getTooltipContainer().hasChildNodes()).toBeTruthy();
  tooltip.find('span').simulate('mouseLeave');
  await act(async () => {
    await timeout(300);
  });
  expect(getTooltipContainer()).toBeFalsy();
});

it('Icon Tooltip generated on mouse enter on top direction', async () => {
  const tooltip = mount(
    <Tooltip content="Filter" direction="top" type="icon">
      Content
    </Tooltip>
  );
  expect(getTooltipContainer()).toBeFalsy();
  tooltip.find('span').simulate('mouseEnter');
  expect(getTooltipContainer().hasChildNodes()).toBeTruthy();
  tooltip.find('span').simulate('mouseLeave');
  await act(async () => {
    await timeout(300);
  });
  expect(getTooltipContainer()).toBeFalsy();
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
