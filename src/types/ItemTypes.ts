// src/types/ItemTypes.ts
export interface Item {
    id: number;
    title: string;
    thumbnail: string;
    description: string;
    fullDescription?: string;
    category?: string;
    rating?: number | undefined;
  }
  
  export interface ItemCardProps {
    item: Item;
    onView: (id: number) => void;
    onEdit: (item: Item) => void;
    onDelete: (id: number) => void;
  }
  

export interface ItemState {
    items: Item[];
}

export interface Action {
    type: 'ADD_ITEM' | 'UPDATE_ITEM' | 'DELETE_ITEM';
    payload: Item;
}

export interface CreateOrEditItemProps {
    item?: Item;
    onSave: (item: Item) => void;
    onCancel: () => void;
  }