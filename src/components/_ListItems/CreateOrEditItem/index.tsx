import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Button } from '../../../shared/Button';
import { CreateOrEditItemProps, Item } from '../../../types/ItemTypes';

export const CreateOrEditItem: React.FC<CreateOrEditItemProps> = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Item>({
    id: item?.id || Date.now(),
    title: item?.title || '',
    thumbnail: item?.thumbnail || '',
    description: item?.description || '',
    fullDescription: item?.fullDescription || '',
    category: item?.category || '',
    rating: item?.rating || 0,
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{item ? 'Edit Item' : 'Create Item'}</h2>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="thumbnail">Thumbnail URL</label>
            <input
              type="text"
              id="thumbnail"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Short Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fullDescription">Full Description</label>
            <textarea
              id="fullDescription"
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
            />
          </div>
          <div className="form-actions">
          <Button onClick={handleSave}>{formData ? 'Edit': 'Save'}</Button>
          <Button variant="danger" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};