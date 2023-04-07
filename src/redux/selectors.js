import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts;
export const selectFilter = state => state.filter;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const { contactsArr } = contacts;
    const filterInLowerCase = filter.toLowerCase();
    return contactsArr.filter(contact =>
      contact.name.toLowerCase().includes(filterInLowerCase)
    );
  }
);
