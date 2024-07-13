import React, { useState, useEffect } from 'react';
import { Button } from '../../../shared/Button';
import { CreateOrEditItemProps, Item } from '../../../types/ItemTypes';
import { fetchCategories } from '../../../services/api';
import InputField from './InputField';
import SelectField from './SelectField';
import './styles.scss';

export const CreateOrEditItem: React.FC<CreateOrEditItemProps> = ({ item, onSave, onCancel }) => {
  const initialFormData: Item = {
    id: item?.id || Date.now(),
    title: item?.title || '',
    thumbnail: item?.thumbnail || '',
    description: item?.description || '',
    fullDescription: item?.fullDescription || '',
    category: item?.category || '',
    rating: item?.rating || 0,
  };

  const [formData, setFormData] = useState<Item>(initialFormData);
  const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  useEffect(() => {
    const loadCategories = async () => {
      const res = await fetchCategories();
      setCategories(res as { id: number, name: string }[]);
    };

    loadCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); 
  };

  const validateField = (name: string) => {
    const newErrors: { [key: string]: string } = { ...errors };
  
    if (name === 'title' && !formData.title) {
      newErrors.title = 'Title is required';
    } else if (name === 'thumbnail' && !/^(http|https):\/\/[^ "]+$/.test(formData.thumbnail)) {
      newErrors.thumbnail = 'Thumbnail URL is invalid';
    } else if (name === 'description' && !formData.description) {
      newErrors.description = 'Short Description is required';
    } else if (name === 'fullDescription' && !formData.fullDescription) {
      newErrors.fullDescription = 'Full Description is required';
    } else if (name === 'category' && !formData.category) {
      newErrors.category = 'Category is required';
    } else {
      delete newErrors[name]; // Clear error if field is valid
    }
  
    setErrors(newErrors);
    console.log(newErrors, 'New Errors');
  };
  
  const validateForm = () => {
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      validateField(key); // Always validate, but do not set isValid based on this
      if (errors[key]) {
        isValid = false; // If there's an error, set isValid to false
      }
    });
    return isValid;
  };
  
  const handleSave = () => {
    const allValid = validateForm() && Object.keys(errors).length === 0;
    if (allValid) {
      onSave(formData);
    }
  };
  
  console.log(item, 'Iteem', Object.keys(errors).length);
  
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{item?.id ? 'Edit Item' : 'Create Item'}</h2>
        <form>
          <InputField
            label="Title"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={() => validateField('title')}
            error={errors.title}
          />
          <InputField
            label="Thumbnail URL"
            id="thumbnail"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            onBlur={() => validateField('thumbnail')}
            error={errors.thumbnail}
          />
          <InputField
            label="Short Description"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            onBlur={() => validateField('description')}
            error={errors.description}
          />
          <InputField
            label="Full Description"
            id="fullDescription"
            name="fullDescription"
            value={formData.fullDescription || ''}
            onChange={handleChange}
            type="textarea"
            onBlur={() => validateField('fullDescription')}
            error={errors.fullDescription}
          />
          <SelectField
            label="Category"
            id="category"
            name="category"
            value={formData.category || ''}
            onChange={handleChange}
            onBlur={() => validateField('category')}
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
            onBlur={() => validateField('rating')}
            error={errors.rating}
          />
          <div className="form-actions">
            <Button onClick={handleSave} disabled={Object.keys(errors).length > 0}>
              {item?.id ? 'Edit' : 'Save'}
            </Button>
            <Button variant="danger" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
