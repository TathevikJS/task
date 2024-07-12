import React from 'react';
import { useItemContext } from '../../context/ItemContext';
import { Button } from '../../shared/Button';
import { Item } from '../../types/ItemTypes';
import { TextConstants } from '../../utils/constants';
import { ItemModal } from '../_ListItems/ItemModal';
import './styles.scss';

export const Header = () => {
  const { dispatch } = useItemContext();

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
      <h1 className="header-title">My Sticky Notes</h1>
      <div className="header-controls">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          onChange={handleSearchChange}
        />
        <select className="filter-select" onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
        <Button onClick={openModal}>{TextConstants.ADD_ITEM}</Button>
      </div>
      <ItemModal />
    </header>
  );
};