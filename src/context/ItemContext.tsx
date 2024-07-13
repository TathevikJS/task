import React, { createContext, useReducer } from 'react';
import { itemReducer, initialState } from './ItemReducer';
import { Action } from './types'
import { ItemProviderProps, State } from '../types/contextTypes'; 
import { Item } from '../types/ItemTypes';

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
