import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import TreeView from './TreeView';

const treeData = [
  {
    name: 'Section 1',
    displayChildren: false,
    collapsedIcon: 'section1expand',
    expandIcon: 'section1collapsed',
    children: [
      {
        name: 'Sub Section 1.1',
        icon: 'subsection1.1icon',
        displayChildren: false
      },
      {
        name: 'Sub Section 1.2',
        icon: 'subsection1.2icon',
        displayChildren: false,
        children: []
      }
    ]
  },
  {
    name: 'Section 2',
    displayChildren: false,
    collapsedIcon: 'section1expand',
    expandIcon: 'section1collapsed',
    children: []
  }
];

it('TreeView renders correctly', () => {
  const tree = renderer
    .create(
      <TreeView treeData={treeData} onChange={() => {}} onToggle={() => {}} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Toggle Tree node using click', () => {
  const mockCallBack = jest.fn();
  const wrapper = mount(
    <TreeView treeData={treeData} onToggle={mockCallBack} />
  );
  const firstTreeNode = treeData[0];
  expect(wrapper.find(`.tree-nested`).exists()).toBeFalsy();
  expect(wrapper.find(`.${firstTreeNode.collapsedIcon}`).exists()).toBeTruthy();
  expect(wrapper.find(`.${firstTreeNode.expandIcon}`).exists()).toBeFalsy();

  wrapper
    .find('.tree-node')
    .at(0)
    .simulate('click');
  expect(wrapper.find(`.tree-nested`).exists()).toBeTruthy();
  expect(wrapper.find(`.${firstTreeNode.collapsedIcon}`).exists()).toBeFalsy();
  expect(wrapper.find(`.${firstTreeNode.expandIcon}`).exists()).toBeTruthy();
  expect(mockCallBack.mock.calls.length).toBe(1);
});

it('Select Tree Node', () => {
  const mockCallBack = jest.fn();
  const wrapper = mount(
    <TreeView treeData={treeData} type="single" onChange={mockCallBack} />
  );
  expect(wrapper.find(`.highlight`).exists()).toBeFalsy();
  wrapper
    .find('.tree-node')
    .at(0)
    .find('span')
    .simulate('click');
  expect(wrapper.find(`.highlight`).exists()).toBeTruthy();
  expect(mockCallBack.mock.calls.length).toBe(1);
});

it('Select Tree on Key enter', () => {
  const mockCallBack = jest.fn();
  const wrapper = mount(
    <TreeView treeData={treeData} type="single" onChange={mockCallBack} />
  );
  const firstTreeNode = treeData[0];
  expect(wrapper.find(`.tree-nested`).exists()).toBeFalsy();
  expect(wrapper.find(`.${firstTreeNode.collapsedIcon}`).exists()).toBeTruthy();
  expect(wrapper.find(`.${firstTreeNode.expandIcon}`).exists()).toBeFalsy();
  wrapper
    .find('.tree-node')
    .at(0)
    .simulate('focus');
  wrapper
    .find('.tree-node')
    .at(0)
    .simulate('keydown', { keyCode: 13 });
  expect(wrapper.find(`.highlight`).exists()).toBeTruthy();
  expect(mockCallBack.mock.calls.length).toBe(1);
});

it('Toggle Tree Node on right Arrow and left arrow', () => {
  const mockCallBack = jest.fn();
  const wrapper = mount(
    <TreeView treeData={treeData} onToggle={mockCallBack} />
  );
  const firstTreeNode = treeData[0];
  expect(wrapper.find(`.tree-nested`).exists()).toBeFalsy();
  expect(wrapper.find(`.${firstTreeNode.collapsedIcon}`).exists()).toBeTruthy();
  expect(wrapper.find(`.${firstTreeNode.expandIcon}`).exists()).toBeFalsy();

  const treeNode = wrapper.find('.tree-node').at(0);
  treeNode.simulate('focus');
  treeNode.simulate('keydown', { keyCode: 39 });
  expect(wrapper.find(`.tree-nested`).exists()).toBeTruthy();
  expect(wrapper.find(`.${firstTreeNode.collapsedIcon}`).exists()).toBeFalsy();
  expect(wrapper.find(`.${firstTreeNode.expandIcon}`).exists()).toBeTruthy();
  expect(mockCallBack.mock.calls.length).toBe(1);

  treeNode.simulate('focus');
  treeNode.simulate('keydown', { keyCode: 37 });
  expect(wrapper.find(`.tree-nested`).exists()).toBeFalsy();
  expect(wrapper.find(`.${firstTreeNode.collapsedIcon}`).exists()).toBeTruthy();
  expect(wrapper.find(`.${firstTreeNode.expandIcon}`).exists()).toBeFalsy();
});

it('Navigate Item using Arrow Down', () => {
  const mockCallBack = jest.fn();
  const wrapper = mount(
    <TreeView treeData={treeData} onToggle={mockCallBack} />
  );
  const firstTreeNode = treeData[0];
  expect(wrapper.find(`.tree-nested`).exists()).toBeFalsy();
  expect(wrapper.find(`.${firstTreeNode.collapsedIcon}`).exists()).toBeTruthy();
  expect(wrapper.find(`.${firstTreeNode.expandIcon}`).exists()).toBeFalsy();

  const treeNode = wrapper.find('.tree-node').at(0);
  treeNode.simulate('focus');
  treeNode.simulate('keydown', { keyCode: 39 });
  expect(wrapper.find(`.tree-nested`).exists()).toBeTruthy();
  expect(wrapper.find(`.${firstTreeNode.collapsedIcon}`).exists()).toBeFalsy();
  expect(wrapper.find(`.${firstTreeNode.expandIcon}`).exists()).toBeTruthy();
  expect(mockCallBack.mock.calls.length).toBe(1);
  treeNode.simulate('keydown', { keyCode: 40 });
  expect(document.activeElement.textContent.trim()).toEqual(
    treeData[0].children[0].name
  );
  let currentActiveNode = wrapper.find('.tree-node').at(1);
  currentActiveNode.simulate('keydown', { keyCode: 40 });
  expect(document.activeElement.textContent.trim()).toEqual(
    treeData[0].children[1].name
  );

  currentActiveNode = wrapper.find('.tree-node').at(2);
  currentActiveNode.simulate('keydown', { keyCode: 40 });
  expect(document.activeElement.textContent.trim()).toEqual(treeData[1].name);
});

it('Navigate Item using Arrow Up', () => {
  const mockCallBack = jest.fn();
  const wrapper = mount(
    <TreeView treeData={treeData} onToggle={mockCallBack} />
  );
  const firstTreeNode = treeData[0];
  expect(wrapper.find(`.tree-nested`).exists()).toBeFalsy();
  expect(wrapper.find(`.${firstTreeNode.collapsedIcon}`).exists()).toBeTruthy();
  expect(wrapper.find(`.${firstTreeNode.expandIcon}`).exists()).toBeFalsy();

  const firstNode = wrapper.find('.tree-node').at(0);
  const secondNode = wrapper.find('.tree-node').at(1);
  firstNode.simulate('focus');
  firstNode.simulate('keydown', { keyCode: 39 });
  expect(wrapper.find(`.tree-nested`).exists()).toBeTruthy();
  expect(wrapper.find(`.${firstTreeNode.collapsedIcon}`).exists()).toBeFalsy();
  expect(wrapper.find(`.${firstTreeNode.expandIcon}`).exists()).toBeTruthy();
  expect(mockCallBack.mock.calls.length).toBe(1);

  secondNode.simulate('focus');
  expect(document.activeElement.textContent.trim()).toEqual(treeData[1].name);
  secondNode.simulate('keydown', { keyCode: 38 });

  expect(document.activeElement.textContent.trim()).toEqual(
    treeData[0].children[1].name
  );

  wrapper
    .find('.tree-node')
    .at(2)
    .simulate('keydown', { keyCode: 38 });
  expect(document.activeElement.textContent.trim()).toEqual(
    treeData[0].children[0].name
  );

  wrapper
    .find('.tree-node')
    .at(1)
    .simulate('keydown', { keyCode: 38 });
  expect(document.activeElement.textContent.trim()).toEqual(treeData[0].name);
});
