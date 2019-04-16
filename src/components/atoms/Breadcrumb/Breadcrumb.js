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

    static style = {
        'breadcrumb': `${prefix}-breadcrumb`,
        'breadcrumbItem': `${prefix}-breadcrumb-item`
    };

    renderItems() {
        if (this.props.model) {
            const items = this.props.model.map((item, index) => {
                const itemClassName = classNames(`${Breadcrumb.style.breadcrumbItem}`, '');
                return (
                    <li className={itemClassName}>
                        <Link href={item.url || '#'}>{item.label}</Link>
                    </li>
                );
            });
            return items;
        } else {
            return null;
        }
    }

    render() {
        const className = classNames(Breadcrumb.style.breadcrumb, this.props.className);
        const items = this.renderItems();
        return (
            <ul id={this.props.id} className={className}>
                {items}
            </ul>
        );
    }

}

export default Breadcrumb;