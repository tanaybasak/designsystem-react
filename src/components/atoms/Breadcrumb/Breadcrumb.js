import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';
import prefix from '../../settings';

class Breadcrumb extends Component {
    static defaultProps = {
        id: '',
        model: [],
        style: null,
        className: `${prefix}-breadcrumb`
    };

    static propTypes = {
        id: PropTypes.string,
        model: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                url: PropTypes.string
            })
        ).isRequired,
        style: PropTypes.object,
        className: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.defaultStyle = {
            breadcrumb: `${prefix}-breadcrumb`,
            breadcrumbItem: `${prefix}-breadcrumb-item`,
            breadcrumbLink: `${prefix}-link`
        };
    }

    renderItems() {
        if (this.props.model) {
            return this.props.model.map((item, index) => (
                <li
                    className={`${this.defaultStyle.breadcrumbItem}`}
                    key={`li-${item.label}-${index}`}
                >
                    <Link
                        href={item.url || 'javascript:void(0);'}
                        className={`${this.defaultStyle.breadcrumbLink}`}
                    >
                        {item.label}
                    </Link>
                </li>
            ));
        }
    }

    render() {
        return (
            <ul
                id={this.props.id || ''}
                className={`${this.defaultStyle.breadcrumb} ${
                    this.props.className
                    } || ''`}
                style={this.props.style || {}}
                aria-label="breadcrumb"
            >
                {this.renderItems()}
            </ul>
        );
    }
}

export default Breadcrumb;
