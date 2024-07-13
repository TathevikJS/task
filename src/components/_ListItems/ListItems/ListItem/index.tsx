import { Button } from '../../../../shared/Button';
import { ListItemProps } from '../../../../types/ItemTypes';
import './styles.scss';

export const ListItem: React.FC<ListItemProps> = ({ item, onView, onEdit, onDelete }) => {
  return (
    <div key={item.id} className="item" onClick={() => onView(item.id)}>
      <button className="delete-button" onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}>×</button>
      <img src={item.thumbnail} alt={item.title} className="item-thumbnail" />
      <div className="item-details">
        <h2 className="item-title">{item.title}</h2>
        <p className="item-description">{item.description}</p>
        <Button onClick={(e) => { e.stopPropagation(); onEdit(item) }}>Edit</Button>
      </div>
    </div>
  );
};
