import React from 'react';
import PropTypes from 'prop-types';
import Heading from '../src/atoms/Heading';
const PageSubTitle = ({ title }) => {
  return (
    <>
      <Heading
        className="roboto-medium"
        type="h4"
      >
        {title}
      </Heading>
      <div className="underline mb-5" />
    </>
  );
};
PageSubTitle.propTypes = {
  title: PropTypes.string
};

PageSubTitle.defaultProps = {};

export default PageSubTitle;