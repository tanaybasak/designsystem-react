import React from "react";
import PropTypes from "prop-types";
import prefix from "../../settings";

const Tag = ({
  className,
  children,
  text,
  type,
  closable,
  onClose,
  thumbnail,
  icon,
  ...restProps
}) => {
  const classnames = `${prefix}-tag hcl-tag-${type} ${className}`.trim();
  const keyListener = event => {
    
    if (event.keyCode === 13) {
      event.preventDefault();
      event.target.click();
    }
  }

  return (
    <button type="button" className={classnames} {...restProps}>
      {thumbnail ? React.cloneElement(thumbnail, {
                className: `${prefix}-tag-thumbnail${
                  thumbnail.props.className
                    ? ' ' + thumbnail.props.className
                    : ''
                }`
              }) : null}
      <span className={`${prefix}-tag-text`} title={text}>{children || text}</span>
      {icon ? React.cloneElement(icon, {
                className: `${prefix}-tag-icon${
                  icon.props.className
                    ? ' ' + icon.props.className
                    : ''
                }`
              }) : null}
      {closable ? (
        <span
          className={`${prefix}-close`}
          aria-hidden="true"
          onClick={onClose}
          onKeyDown={keyListener}
          role="button"
          tabIndex="0"
        />
      ) : null}
    </button>
  );
};

Tag.propTypes = {
  /** Custom class for tag */
  className: PropTypes.string,
  /** Text value for tag */
  children: PropTypes.string,
  /** Text value for tag */
  text: PropTypes.string,
  /** Type of Tag eg: 'primary', 'secondary' */
  type: PropTypes.oneOf(["primary", "secondary"]),
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

  icon: PropTypes.object
};

Tag.defaultProps = {
  className: "",
  children: "",
  text: null,
  type: "primary",
  title: "",
  tabIndex: 0,
  disabled: false,
  closable: false,
  onClose: null,
  thumbnail: null,
  icon: null
};

export default Tag;
