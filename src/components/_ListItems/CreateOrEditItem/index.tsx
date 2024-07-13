import React, { useState, useEffect } from 'react';
import { Button } from '../../../shared/Button';
import { CreateOrEditItemProps, Item } from '../../../types/ItemTypes';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { TextConstants } from '../../../utils/constants';
import { getInitialFormData, loadCategories, validateField, validateForm } from '../../../utils/formHelpers';
import './styles.scss';

export const CreateOrEditItem: React.FC<CreateOrEditItemProps> = ({ item, onSave, onCancel }) => {
  const initialFormData: Item = getInitialFormData(item);

  const [formData, setFormData] = useState<Item>(initialFormData);
  const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (item) {
      setFormData({
        ...initialFormData,
        ...item,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [item]);

  useEffect(() => {
    loadCategories(setCategories);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSave = () => {
    const allValid = validateForm(formData, setErrors) && Object.keys(errors).length === 0;
    if (allValid) {
      onSave(formData);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{item?.id ? 'Edit Item' : 'Create Item'}</h2>
        <form>
          <InputField
            label="Title"
            id="title"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            onBlur={() => setErrors((prev) => validateField('title', formData, prev))}
            error={errors.title}
          />
          <InputField
            label="Thumbnail URL"
            id="thumbnail"
            name="thumbnail"
            value={formData.thumbnail || ''}
            onChange={handleChange}
            onBlur={() => setErrors((prev) => validateField('thumbnail', formData, prev))}
            error={errors.thumbnail}
          />
          <InputField
            label="Short Description"
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            onBlur={() => setErrors((prev) => validateField('description', formData, prev))}
            error={errors.description}
          />
          <InputField
            label="Full Description"
            id="fullDescription"
            name="fullDescription"
            value={formData.fullDescription || ''}
            onChange={handleChange}
            type="textarea"
            onBlur={() => setErrors((prev) => validateField('fullDescription', formData, prev))}
            error={errors.fullDescription}
          />
          <SelectField
            label="Category"
            id="category"
            name="category"
            value={formData.category || ''}
            onChange={handleChange}
            onBlur={() => setErrors((prev) => validateField('category', formData, prev))}
            options={categories}
            error={errors.category}
          />
          <InputField
            label="Rating"
            id="rating"
            name="rating"
            value={formData.rating || 0}
            onChange={handleChange}
            type="number"
            onBlur={() => setErrors((prev) => validateField('rating', formData, prev))}
            error={errors.rating}
          />
          <div className="form-actions">
            <Button onClick={handleSave} disabled={Object.keys(errors).length > 0}>
              {item?.id ? TextConstants.EDIT : TextConstants.SAVE}
            </Button>
            <Button variant="danger" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
