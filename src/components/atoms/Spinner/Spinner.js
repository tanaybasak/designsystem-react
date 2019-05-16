import React from "react";
import PropTypes from "prop-types";
import prefix from "../../../settings";

export default function Spinner({ small, title, className }) {
  const classnames = `${prefix}-spinner${
    small ? "-small" : ""
  } ${className}`.trim();

  return (
    <div className={classnames} title={title}>
      <svg viewBox="-75 -75 150 150">
        <circle cx="0" cy="0" r="37.5" />
      </svg>
    </div>
  );
}

Spinner.propTypes = {
  small: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string
};

Spinner.defaultProps = {
  small: false,
  title: "",
  className: ""
};
