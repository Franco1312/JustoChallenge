import { React } from 'react';
import PropTypes from 'prop-types';
import 'components/atoms/CustomSelect/index.css';

export function CustomSelect({
  name,
  disabled,
  value,
  handler,
  options,
  label,
  className,
  defaultOptionText,
}) {
  return (
    <section className="selectsection__generic">
      <label className="selectlabel__generic">{label}</label>
      <select
        onChange={handler}
        value={value}
        name={name}
        className={className}
        disabled={disabled}
      >
        <option hidden selected>
          {defaultOptionText}
        </option>
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </section>
  );
}
CustomSelect.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
