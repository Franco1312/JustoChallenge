import { React } from 'react';
import PropTypes from 'prop-types';

export default function CustomList(className, list) {
  return <ol className={className}>{list}</ol>;
}

CustomList.propTypes = {
  className: PropTypes.string,
};
