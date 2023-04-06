import { ContactListItem } from 'components/ContacListItem/ContactListItem';
import { Section } from 'components/Section/Section.styled';
import { useSelector } from 'react-redux';
import { selectVisibleContacts } from 'redux/selectors';

export const ContactList = () => {
  const visibleContatcs = useSelector(selectVisibleContacts);

  return (
    <Section>
      <p>Contact list</p>
      {visibleContatcs.length > 0 ? (
        <ul>
          {visibleContatcs.map(contact => {
            return <ContactListItem contact={contact} key={contact.id} />;
          })}
        </ul>
      ) : (
        <p>Your contacts list is empty</p>
      )}
    </Section>
  );
};
