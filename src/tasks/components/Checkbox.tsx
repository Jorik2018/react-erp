import PropTypes from 'prop-types';

interface CheckboxProps {
  label: string;
  disabled?: boolean;
  input: {
    value?: boolean;
  };
}

function Checkbox({ label, disabled, input }: CheckboxProps) {
  const {value, ...others} =input;
  return (
    <div className="form-group">
      <label className="mt-checkbox">
        <input type="checkbox" disabled={disabled} checked={value} {...others} />
        {label}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default Checkbox;