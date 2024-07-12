import { ReactNode } from "react";
import { Item } from "./ItemTypes";

export interface ItemProviderProps {
    children: ReactNode;
}

export type State = {
    items: Item[];
    loading?: boolean;
    detailedItem?: Item;
  };