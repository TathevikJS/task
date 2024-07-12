import { useItemContext } from "../../../context/ItemContext";
import { Modal } from "../../../shared/Modal";
import { Item } from "../../../types/ItemTypes";
import { CreateOrEditItem } from "../CreateOrEditItem";


export const ItemModal: React.FC = () => {
  const { state, dispatch } = useItemContext();

  const handleSaveItem = (item: Item) => {
    if (state.selectedItem) {
      dispatch({ type: 'UPDATE_ITEM', payload: item });
    } else {
      dispatch({ type: 'ADD_ITEM', payload: item });
    }
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <Modal isOpen={state.isModalOpen} onClose={handleCloseModal}>
      <CreateOrEditItem
        item={state.selectedItem}
        onSave={handleSaveItem}
        onCancel={handleCloseModal}
      />
    </Modal>
  );
};
