/* eslint-disable no-console */
import React, { Component } from 'react';
import InlineEdit from '../../atoms/InlineEdit';
import { edit } from '../../util/icons';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';

class InlineEditExample extends Component {
  state = {
    value: 'content',
    isHovering: false,
    isEditing: false,
    loader: false
  };

  render() {
    return (
      <>
        <div className="hcl-col-4 mt-5" id="inline-section">
          {this.state.isEditing ? (
            <InlineEdit
              value={this.state.value}
              loader={this.state.loader}
              customIcon={
                <Button type="neutral" disabled={this.state.loader ? true: false}>
                  <Icon
                    type="svg"
                    alt="alt"
                    title="title"
                    viewBox="0 0 512 512"
                    className="toggleIcon"
                  >
                    <polygon points="160,128.4 192.3,96 352,256 352,256 352,256 192.3,416 160,383.6 287.3,256 " />
                  </Icon>
                </Button>
              }
              onTextUpdate={e => {
                this.setState({ loader: true });
                setTimeout(() => {
                  this.setState({
                    isEditing: false,
                    value: e,
                    isHovering: false,
                    loader: false
                  });
                }, 2000);
              }}
              onClose={() => {
                this.setState({ isEditing: false, loader: false });
                console.log('close is called');
              }}
            />
          ) : (
            <div
              style={{ height: '4rem', display: 'inline-block' }}
              onMouseEnter={() => this.setState({ isHovering: true })}
              onMouseLeave={() => this.setState({ isHovering: false })}
            >
              <span
                className="hcl-inline-label"
                style={
                  !this.state.isHovering
                    ? { cursor: 'pointer', position: 'relative', top: '12px' }
                    : { cursor: 'pointer' }
                }
              >
                {this.state.value}
              </span>
              <button
                type="button"
                className={
                  this.state.isHovering
                    ? `hcl-inline-btn hcl-inline-close`
                    : null
                }
                style={{ cursor: 'pointer' }}
                aria-label="inline-close"
                onClick={() => this.setState({ isEditing: true })}
              >
                {edit}
              </button>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default InlineEditExample;
