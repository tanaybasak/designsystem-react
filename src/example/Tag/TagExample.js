/* eslint-disable no-console */
import React, { Component } from 'react';
import Tag from '../../atoms/Tag';
import Icon from '../../atoms/Icon';
import { Breadcrumb, BreadcrumbItem } from '../../atoms/Breadcrumb';
import  DatePicker  from "../../molecules/DatePicker/DatePicker";

class TagExample extends Component {
  render() {
    return (
      <div className="hcl-col-12 mt-5" id="tags-section">

<DatePicker
  aria-label="Date picker Input label"
  defaultDate="12/30/1990"
  format="mm/dd/yyyy"
  months={[
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]}
  onDateSelect={function noRefCheck() {}}
  weekDays={[
    'S',
    'M',
    'T',
    'W',
    'Th',
    'F',
    'S'
  ]}
/>

        <Breadcrumb
          activeIndex={1}
          className="custom-breadcrumb-top"
          id="small-navigator"
          onSelection={function noRefCheck() {}}
        >
          <BreadcrumbItem href="#" itemClass="custom-item" onChange={()=>{}}>
            Breadcrumb 1
          </BreadcrumbItem>
          <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
          <BreadcrumbItem href="#tools">Breadcrumb 3</BreadcrumbItem>
        </Breadcrumb>

        <Tag className="ml-3" title="Primary Tag">
          Primary Tag
        </Tag>
        <Tag className="ml-3" title="Primary Disabled" disabled>
          Primary Disabled
        </Tag>
        <Tag
          className="ml-3"
          title="Primary Closable"
          closable
          onClose={() => {
            alert('Closing Tag');
          }}
        >
          Primary Closable
        </Tag>
        <Tag
          className="ml-3"
          title="Primary Tag With Thumbnail"
          thumbnail={
            <Icon type="svg" alt="alt" title="title">
              <circle
                cx="11"
                cy="11"
                r="11"
                stroke="red"
                strokeWidth="3"
                fill="white"
              />
            </Icon>
          }
        >
          Primary Tag With Thumbnail
        </Tag>
        <Tag
          className="ml-3"
          title="Primary Tag With Thumbnail and icon"
          thumbnail={
            <Icon type="svg" alt="alt" title="title">
              <circle
                cx="11"
                cy="11"
                r="11"
                stroke="red"
                strokeWidth="3"
                fill="white"
              />
            </Icon>
          }
          icon={<span aria-hidden="true" />}
        >
          Primary Tag With Thumbnail and icon
        </Tag>
        <Tag className="ml-3" title="Secondary Tag" type="secondary">
          Secondary Tag
        </Tag>
        <Tag
          className="ml-3"
          title="Secondary Disabled Tag"
          disabled
          type="secondary"
        >
          Secondary Disabled Tag
        </Tag>
        <Tag
          className="ml-3"
          title="Secondary Closable"
          type="secondary"
          closable
          onClose={() => {
            alert('Closing Tag');
          }}
        >
          Secondary Closable
        </Tag>
        <Tag
          className="ml-3"
          title="Secondary Tag With Thumbnail"
          type="secondary"
          thumbnail={
            <Icon type="svg" alt="alt" title="title">
              <circle
                cx="11"
                cy="11"
                r="11"
                stroke="red"
                strokeWidth="3"
                fill="white"
              />
            </Icon>
          }
        >
          Secondary Tag With Thumbnail
        </Tag>
        <Tag
          className="ml-3"
          title="Secondary Tag With Thumbnail and icon"
          type="secondary"
          thumbnail={
            <Icon type="svg" alt="alt" title="title">
              <circle
                cx="11"
                cy="11"
                r="11"
                stroke="red"
                strokeWidth="3"
                fill="white"
              />
            </Icon>
          }
          icon={
            <>
              <span className="p-hclsw p-hclsw-link" aria-hidden="true" />
              <span className="p-hclsw p-hclsw-user" aria-hidden="true" />
            </>
          }
        >
          Secondary Tag With Thumbnail and icon
        </Tag>
      </div>
    );
  }
}

export default TagExample;
