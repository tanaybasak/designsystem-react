/* eslint-disable no-console */
import React, { Component } from 'react';
import InlineEdit from '../../atoms/InlineEdit';
import { edit } from '../../util/icons';

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
              onTextUpdate={e => {
                this.setState({ loader: true });
                setTimeout(() => {
                  this.setState({
                    isEditing: false,
                    value: e,
                    isHovering: false,
                    loader: true
                  });
                }, 5000);
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
