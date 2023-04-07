import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const contactsInitialState = {
  contactsArr: [],
  isLoading: false,
  error: null,
};

const declaredActions = [fetchContacts, addContact, deleteContact];

const getAction = actionType =>
  declaredActions.map(action => action[actionType]);

const handlePending = state => {
  state.isLoading = true;
};

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const handleRejected = (state, payload) => {
  state.isLoading = false;
  state.error = payload;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        handleFulfilled(state);
        state.contactsArr = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        handleFulfilled(state);
        state.contactsArr.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.contactsArr = state.contactsArr.filter(
          contact => contact.id !== payload.id
        );
      })
      .addMatcher(isAnyOf(...getAction('pending')), handlePending)
      .addMatcher(isAnyOf(...getAction('fulfilled')), handleFulfilled)
      .addMatcher(isAnyOf(...getAction('rejected')), handleRejected),
});

export const { fetchingInProgress, fetchingSuccess, fetchingError } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
