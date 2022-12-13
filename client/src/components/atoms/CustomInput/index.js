import { React } from 'react';
import PropTypes from 'prop-types';
import 'components/atoms/CustomInput/index.css';

export default function CustomInput({
  name,
  placeholder,
  className,
  type,
  handler,
  label,
  value,
  disabled,
}) {
  return (
    <section className="input__section">
      <label className="input__label">{label}</label>
      <input
        className={className}
        name={name}
        type={type}
        value={value}
        onChange={handler}
        placeholder={placeholder}
        disabled={disabled}
      ></input>
    </section>
  );
}

CustomInput.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};
