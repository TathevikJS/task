import { Item } from "../types/ItemTypes";

export type Action =
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

export interface State {
  items: Item[];
  loading?: boolean;
  detailedItem?: Item;
}
