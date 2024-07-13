import { ListItems } from '../../components/_ListItems/ListItems';
import { useItemContext } from '../../context/ItemContext';

import './styles.scss';

const ListItemsPage = () => {
  const { state } = useItemContext();

  return (
    <div className={`list-items ${state.loading ? 'loading' : ''}`}>
      <ListItems />
    </div>
  );
};

export default ListItemsPage;
