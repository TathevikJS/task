import { fetchCategories } from "../services/api";
import { Item } from "../types/ItemTypes";


type ValidItemKeys = keyof Item;

export const getInitialFormData = (item?: Item): Item => ({
  id: item?.id || Date.now(),
  title: item?.title || '',
  thumbnail: item?.thumbnail || '',
  description: item?.description || '',
  fullDescription: item?.fullDescription || '',
  category: item?.category || '',
  rating: item?.rating || 0,
});

export const validateField = (name: ValidItemKeys, formData: Item, errors: { [key: string]: string }): { [key: string]: string } => {
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
  } else if (name === 'rating' && (formData.rating === undefined || formData.rating < 0)) {
    newErrors.rating = 'Rating must be a non-negative number';
  } else {
    delete newErrors[name];
  }

  return newErrors;
};

export const validateForm = (formData: Item, setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>): boolean => {
  let isValid = true;
  const requiredFields: ValidItemKeys[] = ['title', 'description', 'fullDescription', 'category'];
  requiredFields.forEach((field) => {
    if (!formData[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
      }));
      isValid = false;
    } else {
      setErrors((prev) => validateField(field, formData, prev));
    }
  });

  return isValid;
};

export const loadCategories = async (setCategories: React.Dispatch<React.SetStateAction<{ id: number, name: string }[]>>) => {
  const res = await fetchCategories();
  setCategories(res as { id: number, name: string }[]);
};
