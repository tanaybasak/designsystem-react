import React, { useState, useEffect } from 'react';
import capitalizeFirstLetter from '../../util/capitalize';
import PropTypes from 'prop-types';

const Timeline = listItems => {
  const [hightlight, setHighlight] = useState('overview');
  const list = listItems.listItems;
  const changeHightlight = e => {
    let href = e.target.getAttribute('href');
    href = href.substr(1, href.length);
    href = href.split('-').join(' ');
    setHighlight(href);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScrollHandler);
    // onScrollHandler();
  });

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
      list.forEach(item => {
        let elm = document.getElementById(item);
        if (elm) {
          heightArray.push({
            type: item,
            height: Math.abs(elm.getBoundingClientRect().y)
          });
        }
      });

      closestToTop(heightArray);
    }
  };

  const makeNavigation = () => {
    return list.map((value, key) => {
      let hrefValue = value.replace(' ', '-');
      const isActiveClass = value === hightlight ? 'isActive' : '';
      const capitalValue = capitalizeFirstLetter(value);
      return (
        <li className={isActiveClass} key={key}>
          <a
            href={'#' + hrefValue}
            title={value}
            onClick={() => {
              changeHightlight(event);
            }}
          >
            {capitalValue}
            {/* {value} */}
          </a>
        </li>
      );
    });
  };
  return (
    <div className="toc-affix" role="navigation">
      <ul className="toc">{makeNavigation()}</ul>
    </div>
  );
};

Timeline.propTypes = {
  /** List items for Timeline. */
  listItems: PropTypes.array
};

Timeline.defaultProps = {
  listItems: ['overview', 'general-guidelines', 'documentation']
};

export default Timeline;
