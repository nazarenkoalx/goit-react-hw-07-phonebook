export const selectContacts = state => state.contacts;
export const selectFilter = state => state.filter;

export const selectVisibleContacts = state => {
  const { contactsArr } = selectContacts(state);
  const filter = selectFilter(state);
  const filterInLowerCase = filter.toLowerCase();
  return contactsArr.filter(contact =>
    contact.name.toLowerCase().includes(filterInLowerCase)
  );
};
