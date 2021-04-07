import React, { Component } from 'react';
import Slideout from '../../molecules/Slideout';
import TextInput from '../../atoms/TextInput';

class SlideoutExample extends Component {
  state = {
    isOpen: true,
    header: `Slide out Modal title sdf asdf asdf asdf adsf adsf sdfads `,
    type: 'default',
    direction: 'right',
    varient: 'large',
    modalActions: [
      { label: 'Save' },
      {
        label: 'Close',
        handler: () => {
          this.onModalClose();
        },
        danger: true
      }
    ]
  };

  openSlideout() {
    this.setState(
      {
        ...this.state,
        isOpen: true
      },
      () => {
        console.log('from example', this.state.isOpen);
      }
    );
  }

  handleClose() {
    this.setState(
      {
        ...this.state,
        isOpen: false
      },
      () => {
        console.log('from example 2', this.state.isOpen);
      }
    );
  }

  handleOutsideClick() {
    this.setState(
      {
        ...this.state,
        isOpen: false
      },
      () => {
        console.log('from example 2', this.state.isOpen);
      }
    );
  }

  render() {
    return (
      <>
        <a className={`p-10`} onClick={() => this.openSlideout()}>
          Open Slieout {JSON.stringify(this.state.isOpen)}
        </a>
        <Slideout
          isOpen={this.state.isOpen}
          header={this.state.header}
          type={this.state.type}
          varient={this.state.varient}
          direction={this.state.direction}
          onClose={this.handleClose.bind(this)}
          onOutsideClick={this.handleOutsideClick.bind(this)}
          actions={this.state.modalActions}
          // onEscClose={false}
        >
          <div className="hcl-row">
            <div className="hcl-col-12">
              {`Transactional modals are used to validate decisions or to gain
              secondary confirmation from the user. Typically, the modal request
              either a 'yes' or 'no' response.`}
            </div>
            <div className={`hcl-col-12 mt-10`}>
              {
                <div className="hcl-form-group">
                  <TextInput
                    aria-label="text input"
                    placeholder="Placeholder Text"
                  />
                  <label className="hcl-label" htmlFor="labeltext">
                    Address
                  </label>
                  <div className="hcl-helper-text">Your current address</div>
                </div>
              }
            </div>
            <div className={`hcl-col-12`}>
              {
                <div className="hcl-form-group">
                  <TextInput
                    aria-label="text input"
                    placeholder="Placeholder Text"
                  />
                  <label className="hcl-label" htmlFor="labeltext">
                    FGT number
                  </label>
                  <div className="hcl-helper-text">
                    Device config including area code
                  </div>
                </div>
              }
            </div>
            <div className={`hcl-col-12`}>
              {
                <div className="hcl-form-group">
                  <TextInput
                    aria-label="text input"
                    placeholder="Placeholder Text"
                  />
                  <label className="hcl-label" htmlFor="labeltext">
                    FGT number
                  </label>
                  <div className="hcl-helper-text">
                    Device config including area code
                  </div>
                </div>
              }
            </div>
            <div className={`hcl-col-12`}>
              {
                <div className="hcl-form-group">
                  <TextInput
                    aria-label="text input"
                    placeholder="Placeholder Text"
                  />
                  <label className="hcl-label" htmlFor="labeltext">
                    FGT number
                  </label>
                  <div className="hcl-helper-text">
                    Device config including area code
                  </div>
                </div>
              }
            </div>
            {/* <div className={`hcl-col-12`}>
              {
                <div className="hcl-form-group">
                  <TextInput
                    aria-label="text input"
                    placeholder="Placeholder Text"
                  />
                  <label className="hcl-label" htmlFor="labeltext">
                    FGT number
                  </label>
                  <div className="hcl-helper-text">
                    Device config including area code
                  </div>
                </div>
              }
            </div>
            <div className={`hcl-col-12`}>
              {
                <div className="hcl-form-group">
                  <TextInput
                    aria-label="text input"
                    placeholder="Placeholder Text"
                  />
                  <label className="hcl-label" htmlFor="labeltext">
                    FGT number
                  </label>
                  <div className="hcl-helper-text">
                    Device config including area code
                  </div>
                </div>
              }
            </div> */}
          </div>
        </Slideout>
      </>
    );
  }
}

export default SlideoutExample;
