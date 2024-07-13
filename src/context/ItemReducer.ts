import { Item } from '../types/ItemTypes';
import  { Action, State } from './types';

export const initialState = {
  items: [],
  isModalOpen: false,
  selectedItem: undefined,
  searchQuery: '',
  selectedCategory: '',
  currentPage: 1,
  hasMore: true,
};

export const itemReducer = (state: State & {
    isModalOpen: boolean;
    selectedItem: Item | undefined;
    searchQuery: string;
    selectedCategory: string;
    currentPage: number;
    hasMore: boolean;
  }, action: Action): State & {
    isModalOpen: boolean;
    selectedItem: Item | undefined;
    searchQuery: string;
    selectedCategory: string;
    currentPage: number;
    hasMore: boolean;
  } => {
    switch (action.type) {
      case 'SET_ITEMS':
        return { ...state, items: [...state.items, ...action.payload] }; 
      case 'INCREMENT_PAGE':
        return { ...state, currentPage: state.currentPage + 1 };
      case 'SET_HAS_MORE':
        return { ...state, hasMore: action.payload };
      case 'SET_DETAILED_ITEM':
        return { ...state, detailedItem: action.payload as Item };
      case 'ADD_ITEM':
        return { ...state, items: [action.payload, ...state.items] };
      case 'UPDATE_ITEM':
        return {
          ...state,
          items: state.items.map(item => (item.id === action.payload.id ? action.payload : item)),
        };
      case 'REMOVE_ITEM':
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload),
        };
      case 'SET_LOADING':
        return { ...state, loading: action.payload as boolean };
      case 'OPEN_MODAL':
        return { ...state, isModalOpen: true, selectedItem: action.payload };
      case 'CLOSE_MODAL':
        return { ...state, isModalOpen: false, selectedItem: undefined };
      case 'SET_SEARCH_QUERY':
        return { ...state, searchQuery: action.payload };
      case 'SET_SELECTED_CATEGORY':
        return { ...state, selectedCategory: action.payload };
      default:
        return state;
    }
  };
  
