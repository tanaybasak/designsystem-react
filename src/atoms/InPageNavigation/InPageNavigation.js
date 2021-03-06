/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const InPageNavigation = ({ listItems, ...restProps }) => {
  const [hightlight, setHighlight] = useState(
    listItems.length ? listItems[0].label : ''
  );

  const changeHightlight = value => {
    setHighlight(value.link);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScrollHandler);
    return () => window.removeEventListener('scroll', onScrollHandler);
  }, []);

  const closestToTop = heightArray => {
    let selection = hightlight;
    let lowestDiff = 100000;
    heightArray.forEach(obj => {
      if (obj.height < lowestDiff) {
        lowestDiff = obj.height;
        selection = obj.type;
      }
    });
    setHighlight(selection);
  };

  const onScrollHandler = event => {
    if (event) {
      let heightArray = [];
      listItems.forEach(item => {
        let elm = document.getElementById(item.link);
        if (elm) {
          heightArray.push({
            type: item.label,
            height: Math.abs(elm.getBoundingClientRect().y)
          });
        }
      });

      closestToTop(heightArray);
    }
  };

  const makeNavigation = () => {
    return listItems.length
      ? listItems.map((value, key) => {
          const isActiveClass = value.label === hightlight ? 'isActive' : '';
          return (
            <li className={isActiveClass} key={key}>
              <a
                href={'#' + value.link}
                title={value.label}
                onClick={() => {
                  changeHightlight(value);
                }}
              >
                {value.label}
              </a>
            </li>
          );
        })
      : null;
  };
  return (
    <div className={`${prefix}-inpage-navigation-wrapper`} role="navigation">
      <ul className={`${prefix}-inpage-navigation`} {...restProps}>
        {makeNavigation()}
      </ul>
    </div>
  );
};

InPageNavigation.propTypes = {
  /** List items for Timeline
   * eg:
   *
   * ```
   * [
   *    {label : 'Overview', link: 'Overview'}
   * ]
   * ```
   * */
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      link: PropTypes.string
    })
  ).isRequired
};

export default InPageNavigation;
