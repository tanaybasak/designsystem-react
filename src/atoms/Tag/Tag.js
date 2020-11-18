import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import { Close } from '../../util/icons';
const Tag = ({
  className,
  children,
  text,
  type,
  closable,
  onClose,
  disabled,
  thumbnail,
  icon,
  ...restProps
}) => {
  const classnames = `${prefix}-tag hcl-tag-${type} ${className}`.trim();

  let element = null;
  icon
    ? (element = React.Children.map(icon, child => {
        if (child.props.children) {
          return child.props.children.map(item => {
            return React.cloneElement(item, {
              className: `${prefix}-tag-icon${
                item.props.className ? ' ' + item.props.className : ''
              }`,
              tabIndex: !disabled ? '0' : null
            });
          });
        } else {
          return React.cloneElement(child, {
            className: `${prefix}-tag-icon${
              child.props.className ? ' ' + child.props.className : ''
            }`,
            tabIndex: !disabled ? '0' : null
          });
        }
      }))
    : null;

  return (
    <span
      className={classnames}
      disabled={disabled}
      {...restProps}
      onClick={disabled ? null : restProps.onClick}
    >
      {thumbnail
        ? React.cloneElement(thumbnail, {
            className: `${prefix}-tag-thumbnail${
              thumbnail.props.className ? ' ' + thumbnail.props.className : ''
            }`
          })
        : null}
      <span className={`${prefix}-tag-text`} title={text}>
        {children || text}
      </span>
      {element}
      {closable ? (
        <button
          className={`${prefix}-tag-close`}
          aria-label={!disabled ? 'close' : null}
          onClick={onClose}
          type="button"
          tabIndex={!disabled ? '0' : null}
        >
          {Close}
        </button>
      ) : null}
    </span>
  );
};

Tag.propTypes = {
  /** Custom class for tag */
  className: PropTypes.string,
  /** Text value for tag */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Text value for tag */
  text: PropTypes.string,
  /** Type of Tag eg: 'primary', 'secondary' */
  type: PropTypes.oneOf(['primary', 'secondary']),
  /** Title to be displayed on hovering Tag */
  title: PropTypes.string,
  /** Tab index for Tag */
  tabIndex: PropTypes.number,
  /** Boolean value to disable Tag */
  disabled: PropTypes.bool,
  /** Boolean value to show or hide close button in Tag */
  closable: PropTypes.bool,
  /** Callback function on close of Tag Component
   *
   * Argument – event
   */
  onClose: PropTypes.func,
  /** Thumbnail for Tag Component as an Object */
  thumbnail: PropTypes.object,
  /** Used for passing tag icon in the right end */
  icon: PropTypes.element
};

Tag.defaultProps = {
  className: '',
  children: '',
  text: null,
  type: 'primary',
  title: '',
  tabIndex: 0,
  disabled: false,
  closable: false,
  onClose: null,
  thumbnail: null,
  icon: null
};

export default Tag;
