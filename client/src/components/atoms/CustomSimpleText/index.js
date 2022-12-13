import { React } from 'react';
import PropTypes from 'prop-types';

export default function CustomSimpleText({ className, text }) {
  return <h3 className={className}>{text}</h3>;
}

CustomSimpleText.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
};
