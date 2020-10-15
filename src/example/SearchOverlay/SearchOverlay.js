import React, { Component } from 'react';
import Button from '../../atoms/Button';
import { Item, MenuList } from '../../atoms/MenuList';
import Overlay from '../../atoms/Overlay';
import TextInput from '../../atoms/TextInput';
import Cities from './indianCities';
import prefix from '../../settings';
import Checkbox from '../../atoms/Checkbox/Checkbox';

class SearchOverlayExample extends Component {

  state = {
    showMenu: false,
    targetElement: null,
    suggestions: [],
    text: ''
  };




  displayMenuList = e => {
      const tarElm = e.currentTarget;
    let suggestions = [];
    const value = e.currentTarget.value;
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, `i`);
      suggestions = Cities.sort().filter(v => regex.test(v.city));
    }

    this.setState(() => ({
        suggestions,
        text: value,
        showMenu: true,
        targetElement: tarElm
      }));
}

onclose = (status, type) => {
    if (!status) {
      this.setState({
        showMenu: status,
        targetElement: null
      });
    }
  };

    suggestionSelected=(value)=>{
        this.setState(()=>({
          text:value,
          suggestions:[]
        }))
      }

    renderSuggestions = () => {
      if (this.state.suggestions.length === 0) {
        return null;
      }
      return (
        <>
          {this.state.suggestions.map(cities => (
            <Item key={cities.id} className={`${prefix}-dropdown-item`} onClick={e => this.suggestionSelected(cities.city)}>
              {cities.city}
            </Item>
          ))}
        </>
      );
    };





  render() {
    return (
      <div className="hcl-col-12 mt-5">
        <TextInput
          type="text"
          placeholder="search"
          id="search-textInput"
          data-invalid="true"
          onChange={this.displayMenuList.bind(this)}
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
          <MenuList className={`${prefix}-dropdown-menu`} >
          {this.renderSuggestions()}
          </MenuList>
        </Overlay>
      </div>
    );
  }
}

export default SearchOverlayExample;
