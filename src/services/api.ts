const categories = [
    {
      id: 1,
      name: "Category 1"
    },
    {
      id: 2,
      name: "Category 2"
    },
    {
      id: 3,
      name: "Category 3"
    },
  ];
  
  export const fetchCategories = async () => {
    return new Promise((resolve) => {
        resolve(categories);
    });
  };

const items = [
    {
      id: 1,
      title: "Item 1",
      thumbnail: "https://via.placeholder.com/150",
      description: "Short description of Item 1",
      fullDescription: "Full description of Item 1",
      category: "Category 1",
      rating: 4.5
    },
    {
      id: 2,
      title: "Item 2",
      thumbnail: "https://via.placeholder.com/150",
      description: "Short description of Item 2",
      fullDescription: "Full description of Item 2",
      category: "Category 2",
      rating: 1.5
    },
    {
      id: 3,
      title: "Item 3",
      thumbnail: "https://via.placeholder.com/150",
      description: "Short description of Item 3",
      fullDescription: "Full description of Item 3",
      category: "Category 1",
      rating: 3.5
    },
    {
      id: 4,
      title: "Item 4",
      thumbnail: "https://via.placeholder.com/150",
      description: "Short description of Item 4",
      fullDescription: "Full description of Item 4",
      category: "Category 3",
      rating: 4.7
    },
    {
      id: 5,
      title: "Item 5",
      thumbnail: "https://via.placeholder.com/150",
      description: "Short description of Item 5",
      fullDescription: "Full description of Item 5",
      category: "Category 2",
      rating: 4.2
    },
  ];
  
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