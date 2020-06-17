import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import prefix from '../../settings';
import FileUploader from './FileUploader';

describe('<FileUploader> component', () => {

  it('snapshots/renders Button correctly', () => {
    const tree = renderer
      .create(<FileUploader id="file_uploader">Add File</FileUploader>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with expected id', () => {
    const mockCallBack = jest.fn();
    const fileUploader = mount(
      <FileUploader id="file_uploader" onClick={mockCallBack}>
        Add File
      </FileUploader>
    );
    expect(fileUploader.find(`#file_uploader`).exists()).toBeTruthy();
  });

  it('renders with button className', () => {
    const mockCallBack = jest.fn();
    const fileUploader = mount(
      <FileUploader id="file_uploader" className="hcl-secondary" onClick={mockCallBack}>
        Add File
      </FileUploader>
    );
    expect(fileUploader.exists(`.${prefix}-secondary`)).toEqual(true);
  });

  it('renders with default multiple prop', () => {
    const mockCallBack = jest.fn();
    const fileUploader = mount(
        <FileUploader id="file_uploader" multiple onClick={mockCallBack}>
          Add File
        </FileUploader>
      );
    expect(fileUploader.props().multiple).toEqual(true);
  });

  it('add files', () => {
    const mockCallBack = jest.fn();
    const file = new File(['dummy content'], 'example.png', {type: 'image/png'})

    const mockedEvent = { target: { files: [file] }}

    const fileUploader = mount(
        <FileUploader id="file_uploader" multiple onClick={mockCallBack}>
          Add File
        </FileUploader>
      ); 
      fileUploader.find(`.${prefix}-file-input`).simulate('change',mockedEvent);
     expect(fileUploader.exists(`.${prefix}-file-filename`)).toEqual(true);
     expect(fileUploader.find(`.${prefix}-file-filename`).text()).toEqual('example.png');
  });

  it('remove files', () => {
    const mockCallBack = jest.fn();
    const file = new File(['dummy content'], 'example.png', {type: 'image/png'})

    const mockedEvent = { target: { files: [file] }}

    const fileUploader = mount(
        <FileUploader id="file_uploader" multiple onClick={mockCallBack}>
          Add File
        </FileUploader>
      );
    fileUploader.find(`.${prefix}-file-input`).simulate('change',mockedEvent); 
    fileUploader.find(`.${prefix}-file-close`).simulate('click',{name : 'example.png'});
     expect(fileUploader.exists(`.${prefix}-file-filename`)).toEqual(false);
  });
});
