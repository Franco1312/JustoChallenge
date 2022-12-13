import { React } from 'react';
import PropTypes from 'prop-types';
import 'components/atoms/CustomButton/index.css';
export default function CustomButton({
  name,
  text,
  handler,
  disabled,
  className,
}) {
  return (
    <button
      className={className}
      name={name}
      onClick={handler}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

CustomButton.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
