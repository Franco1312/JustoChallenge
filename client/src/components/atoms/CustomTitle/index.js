import { React } from 'react';
import PropTypes from 'prop-types';
import 'components/atoms/CustomTitle/index.css';

export default function CustomTitle({ className, text }) {
  return <h2 className={className}>{text}</h2>;
}

CustomTitle.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
};
