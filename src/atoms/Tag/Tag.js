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
  ...restProps
}) => {
  const classnames = `${prefix}-tag hcl-tag-${type} ${className}`.trim();

  return (
    <button type="button" className={classnames} {...restProps}>
      {thumbnail}
      <span className={`${prefix}-tag-text`}>{children || text}</span>
      {closable ? (
        <span
          className={`${prefix}-close`}
          aria-hidden="true"
          onClick={onClose}
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
  /** Title of Tag */
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
  /** Thumbnail for Tag Component */
  thumbnail: PropTypes.object
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
  thumbnail: null
};

export default Tag;
