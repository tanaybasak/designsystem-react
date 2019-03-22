import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Tooltip.scss';

type Props = {
    className: string,
    clickToOpen?: boolean,
    children: string,
    direction?: string,
    title: string
};

function TooltipContainer(title: string, myRef: any) {
    return ReactDOM.createPortal(
        (
            <div className="tooltiptext" ref={myRef}>
                {title}
            </div>
        ),
        document.body
    );
}


export default class Tooltip extends Component {
    state = {
        displayTooltip: false,
    };

    myRef = React.createRef();

    _setTooltipPosition = ({ tooltipMetaData, tooltipTextMetaData }) => {
        let direction = this.props.direction || 'auto';
        let top = 0,
            left = 0;
        for (let i = 0; i < 2; i++) {
            switch (direction) {
                case 'auto':
                case 'top': {
                    if ((tooltipMetaData.top + 20) > tooltipTextMetaData.height) {
                        top = tooltipMetaData.top - tooltipTextMetaData.height - 10;
                        if (tooltipMetaData.left > (tooltipTextMetaData.width / 2 - 30) &&
                            (window.innerWidth - tooltipMetaData.left - tooltipMetaData.width) > (tooltipTextMetaData.width / 2)) {
                            left = (tooltipMetaData.left + (tooltipMetaData.width / 2) - (tooltipTextMetaData.width / 2));
                            this.myRef.current.setAttribute('data-tooltip-direction', 'top');
                        } else if (tooltipMetaData.left > (tooltipTextMetaData.width - 30)) {
                            left = tooltipMetaData.left - tooltipTextMetaData.width / 2;
                            this.myRef.current.setAttribute('data-tooltip-direction', 'top-left');
                        } else {
                            left = tooltipMetaData.left + 10;
                            this.myRef.current.setAttribute('data-tooltip-direction', 'top-right');
                        }
                        break;
                    }
                }
                case 'bottom': {
                    if ((tooltipMetaData.bottom + 20) > tooltipTextMetaData.height) {
                        top = tooltipMetaData.bottom + 10;
                        if (tooltipMetaData.left > (tooltipTextMetaData.width / 2 - 30) &&
                            (window.innerWidth - tooltipMetaData.left - (tooltipMetaData.width / 2)) > (tooltipTextMetaData.width / 2)) {
                            left = (tooltipMetaData.left + (tooltipMetaData.width / 2) - (tooltipTextMetaData.width / 2));
                            this.myRef.current.setAttribute('data-tooltip-direction', 'bottom');
                        } else if (tooltipMetaData.left > (tooltipTextMetaData.width - 30)) {
                            left = tooltipMetaData.left - tooltipTextMetaData.width + 50;
                            this.myRef.current.setAttribute('data-tooltip-direction', 'bottom-left');
                        } else {
                            left = tooltipMetaData.left + 10;
                            this.myRef.current.setAttribute('data-tooltip-direction', 'bottom-right');
                        }
                        break;

                    }
                }
                case 'left': {
                    if (tooltipMetaData.left > (tooltipTextMetaData.width + 20) &&
                        tooltipMetaData.top > (tooltipTextMetaData.height / 2) &&
                        tooltipMetaData.bottom > (tooltipTextMetaData.height / 2)) {
                        top = tooltipMetaData.top - (tooltipTextMetaData.height / 2) + 10;
                        left = tooltipMetaData.left - tooltipTextMetaData.width - 10;
                        this.myRef.current.setAttribute('data-tooltip-direction', 'left');
                        break;
                    }
                }
                case 'right': {
                    if ((window.innerWidth - tooltipMetaData.left - tooltipMetaData.width) > (tooltipTextMetaData.width + 20) &&
                        tooltipMetaData.top > (tooltipTextMetaData.height / 2) &&
                        tooltipMetaData.bottom > (tooltipTextMetaData.height / 2)) {
                        top = tooltipMetaData.top - (tooltipTextMetaData.height / 2) + 10;
                        left = tooltipMetaData.left + tooltipMetaData.width + 10;
                        this.myRef.current.setAttribute('data-tooltip-direction', 'right');
                        break;
                    }
                }
                default:
                    direction = 'auto';
            }
        }

        this.myRef.current.style.left = `${left}px`;
        this.myRef.current.style.top = `${top}px`;
    }

    _handleMouseEnter = event => {
        const tooltipMetaData = event.currentTarget.getBoundingClientRect();
        this.setState({ displayTooltip: true }, () => {
            const tooltipTextMetaData = this.myRef.current.getClientRects()[0];
            this._setTooltipPosition({ tooltipMetaData, tooltipTextMetaData });
        });
    }

    _handleMouseLeave = event => {
        this.myRef.current.removeAttribute('data-tooltip-direction');
        this.setState({ displayTooltip: false });
    }

    render() {
        return (
            <div className="tooltip" onMouseEnter={this._handleMouseEnter} onMouseLeave={this._handleMouseLeave}>
                {this.props.children}
                {this.state.displayTooltip ? TooltipContainer(this.props.title, this.myRef) : null}
            </div >

        )
    }
};