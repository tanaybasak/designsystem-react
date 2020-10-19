import React, { Component } from 'react';
import Button from '../../atoms/Button';
import { Item, MenuList } from '../../atoms/MenuList';
import Overlay from '../../atoms/Overlay';
import TextInput from '../../atoms/TextInput';
import Cities from './indianCities';
import prefix from '../../settings';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import Search from '../../atoms/Search/Search';

class SearchOverlayExample extends Component {
  menulistRef = React.createRef();
  state = {
    showMenu: false,
    targetElement: null,
    suggestions: [],
    text: '',
    selectedValue: ''
  };

  displayMenuList = e => {
    const tarElm = e.currentTarget;
    let suggestions = [];
    const value = e.currentTarget.value;
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, `i`);
      suggestions = Cities.sort().filter(v => regex.test(v.city));
    } else {
      suggestions = [];
    }

    this.setState(() => ({
      suggestions,
      text: value,
      showMenu: suggestions.length > 0 ? true : false,
      targetElement: tarElm
    }));
  };

  onclose = (status, type) => {
    if (!status) {
      this.setState({
        showMenu: status,
        targetElement: null
      });
    }
  };

  keyDownMenu = e => {
    const key = e.which || e.keyCode;
    var elemSelected = document.activeElement;
    var menulistRefnc = this.menulistRef.current;
    switch (key) {
      case 40: {
        if (elemSelected.nextElementSibling == null) {
          menulistRefnc.firstElementChild.focus();
        } else {
          elemSelected.nextElementSibling.focus();
        }

        e.preventDefault();
        break;
      }
      case 38: {
        if (elemSelected.previousElementSibling == null) {
          menulistRefnc.lastElementChild.focus();
        } else {
          elemSelected.previousElementSibling.focus();
        }
        e.preventDefault();
        break;
      }
      case 13: {
        console.log(document.activeElement);
        this.setState(() => ({
          showMenu: false,
          suggestions: [],
          selectedValue: document.activeElement.textContent
        }));
        e.preventDefault();
        break;
      }
      default:
        break;
    }
  };

  keyDown = e => {
    const key = e.which || e.keyCode;
    const menulistRefnc = this.menulistRef.current;
    if (this.state.showMenu) {
      switch (key) {
        case 40: {
          menulistRefnc.firstElementChild.focus();
          e.preventDefault();
          break;
        }
        case 38: {
          menulistRefnc.lastElementChild.focus();
          e.preventDefault();
          break;
        }

        default:
          break;
      }
    }
  };

  suggestionSelected = value => {
    this.setState(() => ({
      showMenu: false,
      suggestions: [],
      selectedValue: value
    }));
  };

  renderSuggestions = () => {
    if (this.state.suggestions.length === 0) {
      return null;
    }
    return (
      <>
        {this.state.suggestions.map(cities => (
          <Item
            key={cities.id}
            className={`${prefix}-dropdown-item`}
            onClick={e => this.suggestionSelected(cities.city)}
          >
            {cities.city}
          </Item>
        ))}
      </>
    );
  };

  render() {
    return (
      <div className="hcl-col-12 mt-5">
        <div className="hcl-col-6 mt-5">
          <TextInput
            type="text"
            placeholder="search"
            id="search-textInput"
            data-invalid="true"
            onChange={this.displayMenuList.bind(this)}
            onKeyDown={this.keyDown}
            value={this.state.selectedValue}
          />

          <Overlay
            attachElementToBody={true}
            showOverlay={this.state.showMenu}
            targetElement={this.state.targetElement}
            onToggle={this.onclose}
            style={{
              width: this.state.targetElement
                ? this.state.targetElement.offsetWidth + 'px'
                : '0'
            }}
          >
            <MenuList
              className={`${prefix}-search-overlay`}
              ref={this.menulistRef}
              onKeyDown={this.keyDownMenu}
            >
              {this.renderSuggestions()}
            </MenuList>
          </Overlay>
        </div>

        {/* <div className="hcl-col-6 mt-5">
          <Search
            onChange={this.displayMenuList}
            placeholder="Search"
            ariaLabel="Search"
            type="clickable"
            onKeyUp={this.keyUpButton.bind(this)}
          />

          <Overlay
            attachElementToBody={true}
            showOverlay={this.state.showMenu}
            targetElement={this.state.targetElement}
            onToggle={this.onclose}
            style={{
              width: this.state.targetElement
                ? this.state.targetElement.offsetWidth + 'px'
                : '0'
            }}
          >
            <MenuList className={`${prefix}-dropdown-menu`}>
              {this.renderSuggestions()}
            </MenuList>
          </Overlay>
          </div> */}
      </div>
    );
  }
}

export default SearchOverlayExample;
