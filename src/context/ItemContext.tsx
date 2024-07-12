import React, { createContext, useReducer } from 'react';
import { ItemProviderProps, State } from '../types/contextTypes';
import { Item } from '../types/ItemTypes';

type Action =
  | { type: 'SET_ITEMS'; payload: Item[] }
  | { type: 'SET_DETAILED_ITEM'; payload: Item }
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'UPDATE_ITEM'; payload: Item }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'OPEN_MODAL'; payload: Item }
  | { type: 'CLOSE_MODAL' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'INCREMENT_PAGE' }
  | { type: 'SET_HAS_MORE'; payload: boolean };

const initialState: State & {
  isModalOpen: boolean;
  selectedItem: Item | undefined;
  searchQuery: string;
  selectedCategory: string;
  currentPage: number;
  hasMore: boolean;
} = {
  items: [],
  isModalOpen: false,
  selectedItem: undefined,
  searchQuery: '',
  selectedCategory: '',
  currentPage: 1,
  hasMore: true, // Initially set to true; adjust based on fetched data
};

const ItemContext = createContext<{
  state: State & {
    isModalOpen: boolean;
    selectedItem: Item | undefined;
    searchQuery: string;
    selectedCategory: string;
    currentPage: number;
    hasMore: boolean;
  };
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

const itemReducer = (state: State & {
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
      return { ...state, items: action.payload as Item[] };
    case 'SET_DETAILED_ITEM':
      return { ...state, detailedItem: action.payload as Item };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload as Item] };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item as Item
        ),
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
    case 'INCREMENT_PAGE':
      return { ...state, currentPage: state.currentPage + 1 };
    case 'SET_HAS_MORE':
      return { ...state, hasMore: action.payload };
    default:
      return state;
  }
};

export const ItemProvider: React.FC<ItemProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(itemReducer, initialState);

  return (
    <ItemContext.Provider value={{ state, dispatch }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => {
  const context = React.useContext(ItemContext);
  if (!context) {
    throw new Error('useItemContext must be used within an ItemProvider');
  }
  return context;
};
