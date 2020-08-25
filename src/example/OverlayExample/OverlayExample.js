/* eslint-disable no-console */
import React, { Component } from 'react';
import Overlay from '../../atoms/Overlay';
import Notification from '../../atoms/Notification';
import Button from '../../atoms/Button';
import DatePicker from '../../molecules/DatePicker';
import List from '../../atoms/List';
import prefix from '../../settings';
import { Menu, SubMenuItem } from '../../atoms/Menu';
import MenuItem from '../../molecules/Overflowmenu/MenuItem';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import Overflowmenu from '../../molecules/Overflowmenu/Overflowmenu';
import { weekDays, months } from '../../content';
const listItems = [
  {
    name: 'List Level 1',
    value: 'll-1'
  },
  {
    name: 'List 2',
    value: 'll-2'
  },
  {
    name: 'List Level 3',
    value: 'll-3'
  },
  {
    name: 'List Level 1',
    value: 'll-1'
  },
  {
    name: 'List 2',
    value: 'll-2'
  },
  {
    name: 'List Level 3',
    value: 'll-3'
  },
  {
    name: 'List Level 1',
    value: 'll-1'
  },
  {
    name: 'List 2',
    value: 'll-2'
  },
  {
    name: 'List Level 3',
    value: 'll-3'
  }
];
class OverlayExample extends Component {
  //menu = React.createRef();
  state = {
    showOverlay: false,
    targetElement: null,
    overflowlist: [
      {
        name: 'option 1'
      },
      {
        name: 'option 2',
        danger: true
      },
      {
        name: 'option 3',
        separator: true
      },
      {
        name: 'option 4',
        disabled: true
      },
      {
        name: 'option 5',
        link: 'https://google.com'
      }
    ],
    customOverflowList: [
      {
        name: 'Copy',
        icon: 'p-hclsw p-hclsw-copy'
      },
      {
        name: 'Delete',
        danger: true,
        icon: 'p-hclsw p-hclsw-delete'
      },
      {
        name: 'View',
        icon: 'p-hclsw p-hclsw-folder'
      }
    ]
  };

  action = (type, e) => {
    console.log(type);
    this.setState({
      showOverlay: false,
      targetElement: null
    });
  };

  showoverlay1 = e => {
    this.setState({
      showOverlay: !this.state.showOverlay,
      targetElement: e.currentTarget
    });
    //this.refs.child1.showOverlay(e);
    //   if(this.state.showOverlay){
    //     this.refs.child1.hideOverlay(e);

    //     this.setState({
    //         showOverlay: false
    //     })
    //   }else{
    //     this.refs.child1.showOverlay(e);

    //     this.setState({
    //         showOverlay: true
    //     })
    //   }
  };

  hideoverlay1 = e => {
    this.refs.child2.hideOverlay(e);
  };

  showoverlay4 = e => {
    this.refs.child4.showOverlay(e);
  };

  showoverlay2 = e => {
    this.setState({
      showOverlay: !this.state.showOverlay,
      targetElement: e.currentTarget
    });
    //this.refs.child2.showOverlay(e);
  };

  showoverlay3 = e => {
    this.refs.child3.showOverlay(e);
  };

  onclose = (status, type) => {
    if (!status) {
      this.setState({
        showOverlay: status,
        targetElement: null
      });
    }
  };

  onclose1 = e => {
    this.setState({
      showOverlay2: false,
      targetElement2: null
    });
  };
  render() {
    return (
      <div className="hcl-col-12 mt-5">
        <Overflowmenu
          listItems={this.state.overflowlist}
          attachElementToBody={false}
          direction="top-left"
          ellipsisType="vertical"
          onClick={(item, index, e) => {
            console.log('OVERFLOW SELECT');
            console.log(item, index, e);
          }}
        />
        <Overflowmenu
          listItems={this.state.overflowlist}
          attachElementToBody={true}
          direction="top-right"
          customIcon={<i className="p-hclsw p-hclsw-release"></i>}
          ellipsisType="vertical"
          onClick={(item, index, e) => {
            console.log('OVERFLOW SELECT');
            console.log(item, index, e);
          }}
        />
        <Overflowmenu
          listItems={this.state.overflowlist}
          attachElementToBody={true}
          direction="top-right"
          customTemplate={
            <button className="hcl-btn hcl-ghost">
              <i className="p-hclsw p-hclsw-release"></i>
            </button>
          }
          ellipsisType="vertical"
          onClick={(item, index, e) => {
            console.log('OVERFLOW SELECT');
            console.log(item, index, e);
          }}
        />

        <Overflowmenu
          attachElementToBody={false}
          ellipsisType="horizontal"
          onClick={(item, index, e) => {
            console.log('OVERFLOW SELECT CUstom');
            console.log(item, index, e);
          }}
        >
          {this.state.customOverflowList.map((menu, index) => {
            return (
              <MenuItem item={menu} key={`menu${index}`}>
                <i className={menu.icon}></i>
                {menu.name}
              </MenuItem>
            );
          })}
        </Overflowmenu>

        <Overflowmenu
          attachElementToBody={true}
          direction="bottom-right"
          customTemplate={
            <button className="hcl-btn hcl-ghost">
              <i className="p-hclsw p-hclsw-release"></i>
            </button>
          }
          ellipsisType="vertical"
          onClick={(item, index, e) => {
            console.log('OVERFLOW SELECT');
            console.log(item, index, e);
          }}
        >
          <MenuItem item={'copy'}>
            <i className="p-hclsw p-hclsw-copy"></i>Copy
          </MenuItem>
          <MenuItem item={'remove'} danger={true}>
            <i className="p-hclsw p-hclsw-delete"></i>Delete
          </MenuItem>
          <MenuItem item={'view'}>
            <i className="p-hclsw p-hclsw-view"></i>View
          </MenuItem>
        </Overflowmenu>

        <Dropdown
          type="bottom"
          items={[
            {
              id: 'option-1',
              text: 'Option 1'
            },
            {
              id: 'option-2',
              text: 'Option 2'
            },
            {
              id: 'option-3',
              text: 'Option 3'
            },
            {
              id: 'option-4',
              text: 'Option 4'
            }
          ]}
          label="Top DropDown"
          selectedItem="option-3"
          onChange={selected => {
            console.log('selected item', selected);
          }}
        />

        <Dropdown
          type="top"
          items={[
            {
              id: 'option-1',
              text: 'Option 1'
            },
            {
              id: 'option-2',
              text: 'Option 2'
            },
            {
              id: 'option-3',
              text: 'Option 3'
            },
            {
              id: 'option-4',
              text: 'Option 4'
            }
          ]}
          label="Top DropDown"
          selectedItem="option-3"
          onChange={selected => {
            console.log('selected item', selected);
          }}
        />

        <Dropdown
          type="top"
          dropdownType="multi"
          attachElementToBody
          items={[
            {
              id: 'option-1',
              text: 'Option 1'
            },
            {
              id: 'option-2',
              text: 'Option 2'
            },
            {
              id: 'option-3',
              text: 'Option 3'
            },
            {
              id: 'option-4',
              text: 'Option 4'
            }
          ]}
          label="Top DropDown"
          selectedItem={[
            {
              id: 'option-1'
            },
            {
              id: 'option-2'
            }
          ]}
          onChange={selected => {
            console.log('selected item', selected);
          }}
        />

        <DatePicker
          weekDays={weekDays}
          label="Select Date"
          helperText="optional helper text"
          months={months}
          direction="bottom-right"
          attachElementToBody
          format="mm/dd/yyyy"
          onDateSelect={dateSelected => {
            console.log('Selected Date', dateSelected);
          }}
        />

        <Button onClick={this.showoverlay1}>Open Notification 2</Button>
        <Overlay
          showOverlay={this.state.showOverlay}
          targetElement={this.state.targetElement}
          attachElementToBody
          scrollListner
          onToggle={this.onclose}
        >
          <Notification
            className=""
            closable
            icon={null}
            onClose={function noRefCheck() {}}
            subtitle="Notification Sub Title"
            title="Notification Title"
            type="info"
            visible
          />
        </Overlay>
        {/* <Button onClick={this.showoverlay1}>Open Notification 2</Button>
        <Button onClick={this.showoverlay2}>Open Notification 3</Button>

        <Overflowmenu
          attachElementToBody={true}
          targetElement={this.state.targetElement}
          showOverlay={this.state.showOverlay}
          common={true}
        >
          <MenuItem item={'copy'}>
            <i className='p-hclsw p-hclsw-copy'></i>Copy
          </MenuItem>
          <MenuItem item={'remove'} danger={true}>
            <i className='p-hclsw p-hclsw-remove'></i>Delete
          </MenuItem>
          <MenuItem item={'view'}>
            <i className='p-hclsw p-hclsw-View'></i>View
          </MenuItem>
        </Overflowmenu>

        <Dropdown
          type='top'
          items={[
            {
              id: 'option-1',
              text: 'Option 1'
            },
            {
              id: 'option-2',
              text: 'Option 2'
            },
            {
              id: 'option-3',
              text: 'Option 3'
            },
            {
              id: 'option-4',
              text: 'Option 4'
            }
          ]}
          label='Top DropDown'
          selectedItem='option-3'
          onChange={selected => {
            console.log('selected item', selected);
          }}
        />

        <DatePicker
          weekDays={weekDays}
          months={months}
          open='top'
          format='mm/dd/yyyy'
          onDateSelect={dateSelected => {
            console.log('Selected Date', dateSelected);
          }}
        /> */}

        {/* <Menu
          showOverlay={this.state.showOverlay}
          targetElement={this.state.targetElement}
          direction='top-left'
          onClose={this.onclose}
        >
          <SubMenuItem onClick={this.action.bind(this, 'copy')}>
            Copy
          </SubMenuItem>
          <SubMenuItem onClick={this.action.bind(this, 'cut')}>Cut</SubMenuItem>
          <SubMenuItem onClick={this.action.bind(this, 'delete')}>
            Delete
          </SubMenuItem>
        </Menu>

        <Overlay
          showOverlay={this.state.showOverlay2}
          targetElement={this.state.targetElement2}
          onClose={this.onclose1}
        >
          <Notification
            className=''
            closable
            icon={null}
            onClose={function noRefCheck() {}}
            subtitle='Notification Sub Title'
            title='Notification Title'
            type='info'
            visible
          />
        </Overlay>

        <Dropdown
          className=''
          config={{}}
          dropdownType=''
          items={[
            {
              id: 'option-1',
              text: 'Option 1'
            },
            {
              id: 'option-2',
              text: 'Option 2'
            },
            {
              id: 'option-3',
              text: 'Option 3'
            },
            {
              id: 'option-4',
              text: 'Option 4'
            }
          ]}
          label='Dropdown Label'
          onChange={function noRefCheck() {}}
          type='bottom'
        />

        <Dropdown
          className=''
          config={{}}
          dropdownType='multi'
          items={[
            {
              id: 'option-1',
              text: 'Option 1'
            },
            {
              id: 'option-2',
              text: 'Option 2'
            },
            {
              id: 'option-3',
              text: 'Option 3'
            },
            {
              id: 'option-4',
              text: 'Option 4'
            }
          ]}
          label='MultiSelect Label'
          onChange={function noRefCheck() {}}
          type='bottom'
        /> */}

        {/* <Overlay
          ref='child2'
          direction='top-left'
          style={{ width: '11.25rem' }}
        >
          <Menu>
            <SubMenuItem>Copy</SubMenuItem>
            <SubMenuItem>Cut</SubMenuItem>
            <SubMenuItem>Delete</SubMenuItem>
          </Menu>
        </Overlay> */}
        {/* <Button onClick={this.showoverlay1}>Open Notification 2</Button>

        <Button onClick={this.showoverlay2}>Open Notification 3</Button>

        <Button onClick={this.showoverlay4}>Open Notification 4</Button>

        <Button onClick={this.showoverlay1}>Open Notification 1</Button>
        <Overlay
          ref='child1'
          direction='bottom-right'
          style={{ width: '11.25rem' }}
        > */}
        {/* <Overlay
          showOverlay={this.state.showOverlay}
          targetElement={this.state.targetElement}
        >
          <Menu>
            <SubMenuItem>Copy</SubMenuItem>
            <SubMenuItem>Cut</SubMenuItem>
            <SubMenuItem>Delete</SubMenuItem>
          </Menu>
        </Overlay> */}
        {/* </Overlay> */}

        {/* <td> */}

        {/* OverflowMenu

            <Button onClick={this.showoverlay1}>Open Notification 1</Button>
            <Menu target={e.currentTarget} show={true} onClose={}>
                <SubMenuItem>Copy</SubMenuItem>
                <SubMenuItem>Cut</SubMenuItem>
                <SubMenuItem>Delete</SubMenuItem>
            </Menu> */}

        {/* Dropdown

          <Dropdown list={}>

          </Dropdown>
          Datepicker








        <Overflowmenu>
          <TargetArea>Open Notification 1</TargetArea>
          <Menu>
              {
                  list.map( val => {
                      return (<SubMenuItem>{val.name}</SubMenuItem>)
                  })
              }
            
            
          </Menu>
        </Overflowmenu>

        <Dropdown>
          
            <DropdownItem>Copy</DropdownItem>
            <DropdownItem>Cut</DropdownItem>
            <DropdownItem>Delete</DropdownItem>
          
        </Dropdown>
        </td> */}

        {/* <Overflowmenu>
          <TargetArea>
            <Button>Open Notification 1</Button>
          </TargetArea>

          <Menu>
            <SubMenuItem>Copy</SubMenuItem>
            <SubMenuItem>Cut</SubMenuItem>
            <SubMenuItem>Delete</SubMenuItem>
          </Menu>
        </Overflowmenu> */}

        {/* <FormLabel></FormLabel>
        <NumberInput></NumberInput>
            <ErrorMessage></ErrorMessage> */}

        {/* <Form>
          <FormLabel></FormLabel>
          <OptionalText></OptionalText>
          <NumberInput onChange={value}></NumberInput>
          <ErrorMessage
            validationFn={e => {
              if (value > 10) {
              }
            }}
          ></ErrorMessage>
        </Form>

        <Overflowmenu list={[{}, {}]}>
          <Button>Open Notification 1</Button>
        </Overflowmenu> */}

        {/* <Overlay
          ref='child2'
          direction='top-left'
          style={{ width: '11.25rem' }}
        >
          <MenuList
            items={[
              {
                name: 'option 1'
              },
              {
                name: 'option 2',
                danger: true
              },
              {
                name: 'option 3',
                separator: true
              },
              {
                name: 'option 4',
                disabled: true
              },
              {
                name: 'option 5',
                link: 'https://google.com'
              }
            ]}
            onSelect={(item, index, event) => {
              console.log(item, index, event);
            }}
          />
        </Overlay>

        <svg
          onClick={this.showoverlay3}
          focusable='false'
          preserveAspectRatio='xMidYMid meet'
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 16 16'
          aria-hidden='true'
        >
          <path d='M15 4h-2.1c-.2-1.1-1.2-2-2.4-2s-2.2.9-2.4 2H1v1h7.1c.2 1.1 1.2 2 2.4 2s2.2-.9 2.4-2H15V4zm-4.5 2C9.7 6 9 5.3 9 4.5S9.7 3 10.5 3s1.5.7 1.5 1.5S11.3 6 10.5 6zM1 12h2.1c.2 1.1 1.2 2 2.4 2s2.2-.9 2.4-2H15v-1H7.9c-.2-1.1-1.2-2-2.4-2s-2.2.9-2.4 2H1v1zm4.5-2c.8 0 1.5.7 1.5 1.5S6.3 13 5.5 13 4 12.3 4 11.5 4.7 10 5.5 10z' />
        </svg>

        <Overlay ref='child3' direction='bottom-left'>
          <List
            listItems={listItems}
            onClick={e => {
              console.log(e);
            }}
          />
        </Overlay>

        <Overlay ref='child4' direction='bottom-right'>
          <div className={`${prefix}-dropdown`}>
            <ul
              role='listbox'
              className={`${prefix}-dropdown-container`}
              style={{ display: 'block', position: 'unset' }}
            >
              <li className={`${prefix}-dropdown-item`} role='option'>
                <a href='#' className={`${prefix}-dropdown-wrapper`}>
                  Item 1
                </a>
              </li>
              <li className={`${prefix}-dropdown-item`} role='option'>
                <a href='#' className={`${prefix}-dropdown-wrapper`}>
                  Item 2
                </a>
              </li>
              <li className={`${prefix}-dropdown-item`} role='option'>
                <a href='#' className={`${prefix}-dropdown-wrapper`}>
                  Item 3
                </a>
              </li>
            </ul>
          </div>
        </Overlay> */}
      </div>
    );
  }
}

export default OverlayExample;
