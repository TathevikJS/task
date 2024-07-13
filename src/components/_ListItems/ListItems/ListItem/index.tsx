import React, { forwardRef, memo } from 'react';
import { Button } from '../../../../shared/Button';
import { ListItemProps } from '../../../../types/ItemTypes';
import { TextConstants } from '../../../../utils/constants';
import './styles.scss';

export const ListItem = memo(
  forwardRef<HTMLDivElement, ListItemProps>(
    ({ item, onView, onEdit, onDelete }, ref) => {
      const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(item.id);
      };

      return (
        <div className="item" onClick={() => onView(item.id)} ref={ref}>
          <button
            className="delete-button"
            onClick={handleDeleteClick}
            aria-label={`Delete ${item.title}`}
          >
            ×
          </button>
          <img
            src={item.thumbnail}
            alt={item.title}
            className="item-thumbnail"
          />
          <div className="item-details">
            <h2 className="item-title">{item.title}</h2>
            <p className="item-description">{item.description}</p>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(item);
              }}
              variant="default"
            >
              {TextConstants.EDIT_ITEM}
            </Button>
          </div>
        </div>
      );
    }
  )
);