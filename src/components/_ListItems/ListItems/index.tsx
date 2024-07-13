import { useNavigate } from "react-router";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { useItemContext } from "../../../context/ItemContext";
import { useEffect, useMemo, useCallback } from "react";
import { Item } from "../../../types/ItemTypes";
import { fetchItems } from "../../../services/api";
import { ListItem } from "./ListItem";
import { Loading } from "../../../shared/Loading";

export const ListItems: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useItemContext();
  const { searchQuery, selectedCategory, currentPage, hasMore, loading } = state;

  const filteredItems = useMemo(() => {
    return state.items.filter((item: Item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [state.items, searchQuery, selectedCategory]);

  const loadItems = useCallback(async () => {
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
  }, [hasMore, loading, currentPage, dispatch]);

  const handleEditItem = useCallback((item: Item) => {
    dispatch({ type: 'OPEN_MODAL', payload: item });
  }, [dispatch]);

  const handleRemoveItem = useCallback((id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, [dispatch]);

  const handleViewItem = useCallback((id: number) => {
    navigate(`/items/${id}`);
  }, [navigate]);

  const lastItemRef = useInfiniteScroll(loadItems);

  useEffect(() => {
    loadItems();
  }, [selectedCategory, searchQuery, loadItems]);

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
