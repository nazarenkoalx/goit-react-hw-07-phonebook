import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import PropTypes from 'prop-types';
import { notifyWarn } from 'services/notifications';

export const ContactListItem = ({ contact }) => {
  const { id, name, number } = contact;
  const dispatch = useDispatch();
  const handleDeleteContacts = () => {
    dispatch(deleteContact(id));
    notifyWarn(`You successfully deleted ${name} contact`);
  };

  return (
    <li>
      <p>
        {name} : <span>{number}</span>
      </p>
      <button type="button" onClick={handleDeleteContacts}>
        Remove contact
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};
