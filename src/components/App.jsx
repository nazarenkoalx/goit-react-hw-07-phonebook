import { useEffect } from 'react';
import { ContactList } from './ContactList/ContactList';
import 'react-toastify/dist/ReactToastify.css';
import { selectContacts, selectVisibleContacts } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { ToastContainer } from 'react-toastify';
import { Filter } from './Filter/Filter';
import { Container } from './Container/Container.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { Loading } from './Loading/Loading';

export function App() {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(selectContacts);
  const visibleContacts = useSelector(selectVisibleContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <>
      <Container>
        {isLoading && <Loading />}
        <ContactForm />
        <Filter />
        {visibleContacts.length > 0 ? (
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
