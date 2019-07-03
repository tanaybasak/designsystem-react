import React from "react";
import PropTypes from "prop-types";
import prefix from "../../settings";

const Tile = ({ children, type, id, href }) => {
  const clickableTile = () => {
    return (
      <div className={`${prefix}-tile-clickable`} tabIndex="0">
        <a href={href}>{children}</a>
      </div>
    );
  };

  const selectableTile = () => {
    return (
      <div>
        <label
          htmlFor="tile-id"
          className={`${prefix}-tile-selectable`}
          tabIndex="0"
        >
          <input
            id="tile-id"
            className={`${prefix}-tile-input`}
            type="checkbox"
            title="tile"
          />
          <svg
            className={`${prefix}-tile-checkbox`}
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm3.646-10.854L6.75 10.043 4.354 7.646l-.708.708 3.104 3.103 5.604-5.603-.708-.708z"
              fillRule="evenodd"
            />
          </svg>
          {children}
        </label>
      </div>
    );
  };

  const expandableTile = () => {
    return (
      <div className={`${prefix}-tile-expandable`} tabIndex="0">
        <input
          id={`${id}`}
          className={`${prefix}-tile-input`}
          type="checkbox"
          title="tile"
        />
        <label htmlFor={`${id}`} className={`${prefix}-tile-arrow`}>
          <svg width="12" height="7" viewBox="0 0 12 7">
            <path
              fillRule="nonzero"
              d="M6.002 5.55L11.27 0l.726.685L6.003 7 0 .685.726 0z"
            />
          </svg>
        </label>
        <div className={`${prefix}-tile-content`}>{children[0]}</div>
        <div className={`${prefix}-tile-hide`}>{children[1]}</div>
      </div>
    );
  };

  const readableTile = () => {
    return <div className={`${prefix}-tile`}>{children}</div>;
  };

  return (
    <>
      {children
        ? type === "clickable"
          ? clickableTile()
          : type === "selectable"
          ? selectableTile()
          : type === "expandable"
          ? expandableTile()
          : readableTile()
        : null}
    </>
  );
};

Tile.propTypes = {
  type: PropTypes.oneOf(["clickable", "selectable", "expandable", "readable"]),
  children: PropTypes.node.isRequired,
  id: function(props, propName, componentName) {
    if (
      props.hasOwnProperty("type") &&
      props["type"] === "expandable" &&
      typeof props[propName] === "undefined"
    ) {
      return new Error(
        `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`undefined\`.`
      );
    }
  },
  href: function(props, propName, componentName) {
    if (
      props.hasOwnProperty("type") &&
      props["type"] === "clickable" &&
      typeof props[propName] === "undefined"
    ) {
      return new Error(
        `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`undefined\`.`
      );
    }
  }
};

Tile.defaultProps = {
  type: "readable"
};

export default Tile;
