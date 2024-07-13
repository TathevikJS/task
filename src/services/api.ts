import { categories, items } from "./data";

   export const fetchCategories = async () => {
    return new Promise((resolve) => {
        resolve(categories);
    });
  };

  export const fetchItems = async (page = 1) => {
    const pageSize = 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedItems = items.slice(start, end);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(paginatedItems);
      }, 1000);
    });
  };
  
  
  export const fetchItemById = async (id: number) => {
    const item = items.find(item => item.id === id);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (item) {
          resolve(item);
        } else {
          reject(new Error('Item not found'));
        }
      }, 1000);
    });
  };