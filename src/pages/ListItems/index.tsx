import { useEffect } from 'react';
import { useItemContext } from '../../context/ItemContext';
import { fetchItems } from '../../services/api';
import { Loading } from '../../shared/Loading';
import { useNavigate } from 'react-router';
import { ListItem } from '../../components/_ListItems/ListItem';
import { ItemModal } from '../../components/_ListItems/ItemModal';
import { Item } from '../../types/ItemTypes';
import './styles.scss';

const ListItems = () => {

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
      dispatch({ type: 'SET_ITEMS', payload: items as Item[]});
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

  return (
    <div className="item-list">
      {state.loading ? (
        <Loading />
      ) : (
        filteredItems.map((item: Item) => (
          <ListItem 
            key={item.id} 
            item={item} 
            onView={handleViewItem} 
            onEdit={handleEditItem} 
            onDelete={handleRemoveItem} 
          />
        ))
      )}
      <ItemModal />
    </div>
  );
};

export default ListItems;
