import React, { useState, useEffect } from 'react';
import { useItemContext } from '../../context/ItemContext';
import { Button } from '../../shared/Button';
import { Item } from '../../types/ItemTypes';
import { TextConstants } from '../../utils/constants';
import { ItemModal } from '../_ListItems/ItemModal';
import { fetchCategories } from '../../services/api';
import './styles.scss';

const Header = () => {
  const { dispatch } = useItemContext();
  const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const res = await fetchCategories();
      setCategories(res as { id: number, name: string }[]);
    };
    loadCategories();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({ type: 'SET_SEARCH_QUERY', payload: value });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: value });
  };

  const openModal = () => {
    dispatch({ type: 'OPEN_MODAL', payload: {} as Item });
  };

  return (
    <header className="header">
      <h1 className="header-title">{TextConstants.HEAD_LINE}</h1>
      <div className="header-controls">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          onChange={handleSearchChange}
        />
        <select className="filter-select" onChange={handleFilterChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <Button onClick={() => openModal()}>{TextConstants.ADD_ITEM}</Button>
      </div>
      <ItemModal />
    </header>
  );
};

export default Header;
