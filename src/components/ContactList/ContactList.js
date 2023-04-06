import { ContactListItem } from 'components/ContacListItem/ContactListItem';
import { Section } from 'components/Section/Section.styled';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';

export const ContactList = () => {
  const { contactsArr } = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const filterContacts = filter => {
    const filterInLowerCase = filter.toLowerCase();
    return contactsArr.filter(contact =>
      contact.name.toLowerCase().includes(filterInLowerCase)
    );
  };

  const visibleContatcs = filterContacts(filter);

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
