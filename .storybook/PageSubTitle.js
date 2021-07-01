import React from 'react';
import PropTypes from 'prop-types';
import Heading from '../src/atoms/Heading';
const PageSubTitle = ({ title }) => {
  return (
    <>
      <div className="text-content-heading">
        {title}
      </div>
      <div className="underline mb-5" />
    </>
  );
};
PageSubTitle.propTypes = {
  title: PropTypes.string
};

PageSubTitle.defaultProps = {};

export default PageSubTitle;
