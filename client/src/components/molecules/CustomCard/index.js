import { React } from 'react';
import PropTypes from 'prop-types';

export default function CustomCard({ className, children }) {
  return <section className={className}>{children}</section>;
}
CustomCard.propTypes = {
  className: PropTypes.string,
};
