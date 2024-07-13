import { useEffect } from "react";
import { Item } from "../../../types/ItemTypes";
import { fetchItems } from "../../../services/api";
import { useItemContext } from "../../../context/ItemContext";
import { useNavigate } from "react-router";
import { ListItem } from "./ListItem";
import { Loading } from "../../../shared/Loading";

export const ListItems: React.FC = () => {

  const navigate = useNavigate();

  const { state, dispatch } = useItemContext();
  const { searchQuery, selectedCategory } = state;

  const filteredItems = state.items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const loadItems = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      const items = await fetchItems();
      dispatch({ type: 'SET_ITEMS', payload: items as Item[] });
      dispatch({ type: 'SET_LOADING', payload: false });
    };

    loadItems();
  }, [dispatch]);

  const handleEditItem = (item: Item) => {
    dispatch({ type: 'OPEN_MODAL', payload: item });
  };

  const handleRemoveItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleViewItem = (id: number) => {
    navigate(`/items/${id}`);
  };

  if (state.loading) {
    return <Loading />;
  }

  return (
    <>
      {filteredItems.map((item: Item) => (
        <ListItem 
          key={item.id} 
          item={item} 
          onView={() => handleViewItem(item.id)} 
          onEdit={() => handleEditItem(item)} 
          onDelete={() => handleRemoveItem(item.id)} 
        />
      ))}
    </>
  );
};
