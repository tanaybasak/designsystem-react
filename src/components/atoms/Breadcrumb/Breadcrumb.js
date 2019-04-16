import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix } from '../../../settings';
import Link from '../Link';

class Breadcrumb extends React.Component {
    static defaultProps = {
        id: null,
        model: null,
        style: null,
        className: null
    };

    static propTypes = {
        id: PropTypes.string,
        model: PropTypes.array,
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
        const items = this.renderItems();
        return (
            <ul id={this.props.id || null} className={className} style={this.props.style || {}}>
                {items}
            </ul>
        );
    }

}

export default Breadcrumb;