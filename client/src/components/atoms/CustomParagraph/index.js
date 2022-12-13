import React from 'react';
import PropTypes from 'prop-types';

export function CustomParagraph({ text, className, label }) {
  return (
    <section>
      <label>{label}</label>
      <p className={className}>{text}</p>
    </section>
  );
}

CustomParagraph.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  label: PropTypes.string,
};
