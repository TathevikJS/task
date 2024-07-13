import React, { useEffect } from "react";
import { Item } from "../../../types/ItemTypes";
import { fetchItems } from "../../../services/api";
import { useItemContext } from "../../../context/ItemContext";
import { useNavigate } from "react-router";
import { ListItem } from "./ListItem";
import { Loading } from "../../../shared/Loading";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll"; 

export const ListItems: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useItemContext();
  const { searchQuery, selectedCategory, currentPage, hasMore, loading } = state;

  const filteredItems = state.items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const loadItems = async () => {
    if (!hasMore || loading) return; // Prevent loading if already loading

    dispatch({ type: 'SET_LOADING', payload: true });
    const items = await fetchItems(currentPage) as Item[];
    
    dispatch({ type: 'SET_ITEMS', payload: items });
    
    if (items.length === 0) {
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

  const lastElementRef = useInfiniteScroll(loadItems);

  useEffect(() => {
    loadItems();
  }, [dispatch, currentPage]);

  return (
    <>
      {filteredItems.map((item: Item, index: number) => (
        <ListItem
          key={item.id}
          item={item}
          onView={() => handleViewItem(item.id)}
          onEdit={() => handleEditItem(item)}
          onDelete={() => handleRemoveItem(item.id)}
          ref={index === filteredItems.length - 1 ? lastElementRef : null} 
        />
      ))}
      {loading && <Loading />}
    </>
  );
};
