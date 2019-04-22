import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix } from '../../../settings';
import Link from '../Link';

class Breadcrumb extends React.Component {
    static defaultProps = {
        id: null,
        model: [],
        style: null,
        className: `${prefix}-breadcrumb`
    };

    static propTypes = {
        id: PropTypes.string,
        model: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string
        })).isRequired,
        style: PropTypes.object,
        className: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.defaultStyle = {
            'breadcrumb': `${prefix}-breadcrumb`,
            'breadcrumbItem': `${prefix}-breadcrumb-item`,
            'breadcrumbLink': `${prefix}-link`
        }
    }

    renderItems() {
        if (this.props.model) {
            const items = this.props.model.map((item, index) => {
                const itemClassName = classNames(`${this.defaultStyle.breadcrumbItem}`, '');
                return (
                    <li className={itemClassName} key={`${index}_`}>
                        <Link href={item.url || '#'} className={`${this.defaultStyle.breadcrumbLink}`}>{item.label}</Link>
                    </li>
                );
            });
            return items;
        } else {
            return null;
        }
    }

    render() {
        const className = classNames(this.defaultStyle.breadcrumb, this.props.className);
        return (
            <ul id={this.props.id || null} className={className} style={this.props.style || {}} aria-label={'breadcrumb'}>
                {this.renderItems()}
            </ul>
        );
    }

}

export default Breadcrumb;