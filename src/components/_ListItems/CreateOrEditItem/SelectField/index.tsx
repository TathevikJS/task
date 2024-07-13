import { SelectFieldProps } from '../../../../types/formTypes';
import '../styles.scss'

export const SelectField: React.FC<SelectFieldProps> = ({ label, id, name, value, onChange, options, error, onBlur }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <select id={id} name={name} value={value} onChange={onChange} onBlur={onBlur}>
      <option value="">Select a category</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
    {error && <span className="error">{error}</span>}
  </div>
);
