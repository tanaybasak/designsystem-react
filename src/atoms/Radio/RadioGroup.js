import React, { useState , useEffect} from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const RadioGroup = ({
  className,
  orientation,
  children,
  onChange,
  defaultSelected,
}) => {
  const [selected, setSelected] = useState(defaultSelected);

  useEffect(() => {
    setSelected(defaultSelected);
  }, [defaultSelected]);


  const classNameType =
    orientation === 'vertical' ? `${prefix}-stack-vertical` : '';
  const classnames = `${prefix}-radio-group ${classNameType} ${className}`.trim();

  const modifiedChildren = React.Children.map(children, (child) => {
    if (child) {
      const { value } = child.props;
      return React.cloneElement(child, {
        onChange: (newSelection, evt) => {
          if (newSelection !== selected) {
            setSelected(newSelection);
            onChange(newSelection, evt);
          }
        },
        key: value,
        checked: value === selected,
      });
    }
  });

  return (
    <div className={classnames}>
      {modifiedChildren}
    </div>
  );
};

RadioGroup.propTypes = {
  /** Custom class on the Radio wrapper. */
  className: PropTypes.string,
  /** vertical or horizontal type */
  orientation: PropTypes.string,
  /** Accepts event handler as prop/argument. */
  onChange: PropTypes.func,
  /** defaultSelected to be considered when submitting forms. */
  defaultSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** self Children i.e Tab Component. */
  children: PropTypes.node.isRequired
};

RadioGroup.defaultProps = {
  className: '',
  orientation: 'horizontal',
  onChange: () => {}
};

export default RadioGroup;
