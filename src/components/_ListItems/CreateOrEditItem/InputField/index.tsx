import { InputFieldProps } from '../../../../types/formTypes';
import '../styles.scss';

export const InputField: React.FC<InputFieldProps> = ({ label, id, name, value, onChange, error, type = 'text', onBlur }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    {type === 'textarea' ? (
      <textarea id={id} name={name} value={value} onChange={onChange} onBlur={onBlur}></textarea>
    ) : (
      <input type={type} id={id} name={name} value={value} onChange={onChange} onBlur={onBlur} />
    )}
    {error && <span className="error">{error}</span>}
  </div>
);
