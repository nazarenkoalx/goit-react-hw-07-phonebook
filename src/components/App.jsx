import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Container } from './Container/Container.styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { getContacts } from 'redux/selectors';

export function App() {
  const dispatch = useDispatch();

  const { contactsArr, isLoading, error } = useSelector(getContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <>
      <Container>
        {isLoading && <div>PLEASE WAIT</div>}
        <ContactForm />
        <Filter />
        {contactsArr.length > 0 ? (
          <ContactList />
        ) : (
          <div>your cont list is empty</div>
        )}
        {error && <div>smth went wrong</div>}
      </Container>
      <ToastContainer />
    </>
  );
}
