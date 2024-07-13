
import { useNavigate } from "react-router";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { useItemContext } from "../../../context/ItemContext";
import { useEffect, useMemo } from "react";
import { Item } from "../../../types/ItemTypes";
import { fetchItems } from "../../../services/api";
import { ListItem } from "./ListItem";
import { Loading } from "../../../shared/Loading";

export const ListItems: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useItemContext();
  const { searchQuery, selectedCategory, currentPage, hasMore, loading } = state;

  const filteredItems = useMemo(() => {
    return state.items.filter((item: Item)=> {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [state.items, searchQuery, selectedCategory]);

  const loadItems = async () => {
    if (!hasMore || loading) return; 
  
    dispatch({ type: 'SET_LOADING', payload: true });
    const items = await fetchItems(currentPage) as Item[];
  
    dispatch({ type: 'SET_ITEMS', payload: items });
  
    if (items.length > 0) {
      dispatch({ type: 'INCREMENT_PAGE' });
    } else {
      dispatch({ type: 'SET_HAS_MORE', payload: false });
    }
  
    dispatch({ type: 'SET_LOADING', payload: false });
  };
  

  const handleEditItem = (item: Item) => {
    dispatch({ type: 'OPEN_MODAL', payload: item });
  };

  const handleRemoveItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleViewItem = (id: number) => {
    navigate(`/items/${id}`);
  };

  const lastItemRef = useInfiniteScroll(loadItems);

  useEffect(() => {
    console.log('ListItems useEffect');
    loadItems(); 
  }, [selectedCategory, searchQuery]); 
   

  return (
    <>
      {filteredItems.map((item: Item, index: number) => (
        <ListItem
          key={index} 
          item={item}
          onView={() => handleViewItem(item.id)}
          onEdit={() => handleEditItem(item)}
          onDelete={() => handleRemoveItem(item.id)}
          ref={index === filteredItems.length - 1 ? lastItemRef : null} 
        />
      ))}
      {loading && <Loading />}
    </>
  );
};

