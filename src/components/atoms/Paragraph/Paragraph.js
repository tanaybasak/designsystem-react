import React from "react";
import PropTypes from "prop-types";

export default function Paragraph({ className, children, ...restProps }) {
  return (
    <p className={className} {...restProps}>
      {children}
    </p>
  );
}

Paragraph.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

Paragraph.defaultProps = {
  children: null,
  className: ""
};
