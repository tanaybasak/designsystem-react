import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import Tooltip from "./Tooltip";

const getTooltipContainer = () => {
  return global.document.querySelector(".hcl-tooltip");
};

it("Tooltip renders correctly", () => {
  const tree = renderer
    .create(
      <Tooltip content="Definition Tooltip" direction="right" type="definition">
        Content
      </Tooltip>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Definition Tooltip generated on mouse enter", () => {
  const tooltip = mount(
    <Tooltip content="Definition Tooltip" direction="right" type="definition">
      Content
    </Tooltip>
  );
  expect(getTooltipContainer()).toBeFalsy();
  tooltip.find("span").simulate("mouseEnter");
  expect(tooltip.find("span").props().className).toEqual(
    "hcl-tooltip-dottedline"
  );
  expect(getTooltipContainer().hasChildNodes()).toBeTruthy();
  tooltip.find("span").simulate("mouseLeave");
  expect(tooltip.find("span").props().className).not.toEqual(
    "hcl-tooltip-dottedline"
  );
  expect(getTooltipContainer()).toBeFalsy();
});

it("Icon Tooltip generated on mouse enter", () => {
  const tooltip = mount(
    <Tooltip content="Filter" direction="left" type="icon">
      Content
    </Tooltip>
  );
  expect(getTooltipContainer()).toBeFalsy();
  tooltip.find("span").simulate("mouseEnter");
  expect(getTooltipContainer().hasChildNodes()).toBeTruthy();
  tooltip.find("span").simulate("mouseLeave");
  expect(getTooltipContainer()).toBeFalsy();
});

it("Icon Tooltip generated on mouse enter", () => {
  const tooltip = mount(
    <Tooltip content="Filter" direction="top" type="icon">
      Content
    </Tooltip>
  );
  expect(getTooltipContainer()).toBeFalsy();
  tooltip.find("span").simulate("mouseEnter");
  expect(getTooltipContainer().hasChildNodes()).toBeTruthy();
  tooltip.find("span").simulate("mouseLeave");
  expect(getTooltipContainer()).toBeFalsy();
});

it("Interactive Tooltip generated on mouse Click and Updated Position on Scroll", () => {
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
  tooltip.find("span").simulate("click");
  expect(getTooltipContainer().hasChildNodes()).toBeTruthy();
  global.document.dispatchEvent(new Event("scroll"));
});
