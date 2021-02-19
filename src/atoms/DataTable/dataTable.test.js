import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import DataTable from './DataTable';
import { exportAllDeclaration } from '@babel/types';
import { setupMaster } from 'cluster';

const mockFunction = jest.fn();


test('DataTable gets rendered',()=>{

    const wrapper = mount(<DataTable id='table_1' tableConfig={[{field:'name'},{field:'empId'}]} tableData={[{name:'employeeA',empId:'46867'}]}></DataTable>);
    expect(wrapper.find(DataTable).length).toBe(1);
    wrapper.unmount();

})

test('simulate a row select event',()=>{
    const wrapper = mount(<DataTable id='table_1'  onRowSelect={mockFunction} tableConfig={[{field:'name'},{field:'empId'}]} tableData={[{name:'employeeA',empId:'46867'}]}></DataTable>);
    const row = wrapper.find({title:'employeeA'});
    row.simulate('click');
    expect(mockFunction).toHaveBeenCalled();
    wrapper.unmount();
})

test('ability to apply custom class name',()=>{
    const wrapper = mount(<DataTable id='table_1' className="patron-dataTable" tableConfig={[{field:'name'},{field:'empId'}]} tableData={[{name:'employeeA',empId:'46867'}]}></DataTable>);
    expect(wrapper.hasClass("patron-dataTable")).toBe(true);
    wrapper.unmount();
})

test('can set a unique id',()=>{
    const wrapper = mount(<DataTable className="patron-dataTable" id='table_1' tableConfig={[{field:'name'},{field:'empId'}]} tableData={[{name:'employeeA',empId:'46867'}]}></DataTable>);
    expect(wrapper.find('#table_1')).toHaveLength(2);
    wrapper.unmount();
})