import PropTypes from 'prop-types';
import classNames from 'classnames';
import { QEvent } from '../../quizApp/models/types';

const TextInputGroup = ({
    name,
    label,
    value,
    placeholder,
    type,
    onChange,
    error
}: { name: string, label: string, value: string, placeholder: string, type?: string, onChange: (event: QEvent) => void, error: string | undefined }) => {
    return (
        <div className={'form-group'}>
            <label htmlFor={'name'}>{label}</label>
            <input type={type}
                name={name}
                className={classNames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                value={value}
                onChange={onChange} />
            {error && <div className={'invalid-feedback'}>{error}</div>}
        </div>
    )
};

TextInputGroup.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default TextInputGroup;