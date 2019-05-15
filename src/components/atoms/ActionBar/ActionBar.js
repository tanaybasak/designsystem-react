import React from "react";
import prefix from "../../../settings";

function ActionBar({ actions }) {
  const actionButtons = () => {
    return actions.map(
      ({ label, handler, primary = false, danger = false }) => {
        const classNames = [`${prefix}-btn`];
        primary ? classNames.push(`${prefix}-primary`) : classNames.push(`${prefix}-secondary`);
        danger && classNames.push(`${prefix}-danger`);
        return (
          <button key={label} className={classNames.join(" ")} onClick={handler}>
            {label}
          </button>
        );
      }
    );
  };
  return <div className={`${prefix}-action-bar`}>{actionButtons()}</div>;
}

export default ActionBar;
