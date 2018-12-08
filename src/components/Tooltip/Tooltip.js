import PropTypes from "prop-types";
import './Tooltip.scss';

const Tooltip = props => {
    const { placement, title } = props;
    const children = { ...props.children };
    children.props = {
        ...children.props,
        ['data-patron-tooltip-title']: title,
        ['data-patron-tooltip-placement']: placement || 'top'
    };
    return children;
}

Tooltip.propTypes = {
    placement: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired
};

Tooltip.defaultProps = {
    placement: 'top',
    title: 'Tooltip',
    children: {}
};


export default Tooltip;