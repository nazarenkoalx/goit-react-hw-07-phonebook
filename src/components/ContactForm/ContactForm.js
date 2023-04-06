import { Formik, Field, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import { Form, SubmitButton } from './ContactForm.styled';
import { object, string } from 'yup';
import { Section } from 'components/Section/Section.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
import { notifyError, notifySuccess } from 'services/notifications';

let ContactsSchema = object({
  name: string()
    .required()
    .min(3, 'must be at least 3 characters long')
    .max(20, 'must be less than 20 characters long'),
  number: string().required(),
});

// .length(10, 'type 10 digits of phone number')
export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleFormSubmit = ({ name, number }) => {
    const doubleName = contacts.contactsArr.find(contact => {
      return contact.name === name;
    });

    const doubleNumber = contacts.contactsArr.find(contact => {
      return contact.number === number;
    });

    if (doubleName) {
      return notifyError('Contact with this name already exists');
    }

    if (doubleNumber) {
      return notifyError(
        `Contact with this number already exists, check ${doubleNumber.name} contact`
      );
    }
    if (!doubleName && !doubleNumber) {
      notifySuccess(
        `Contact ${name} was successfully added to yours contact book`
      );
      dispatch(addContact({ name, number }));
    }
  };

  return (
    <Section>
      <h1>Contact Book</h1>
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        onSubmit={(values, actions) => {
          handleFormSubmit({ ...values });
          actions.resetForm();
        }}
        validationSchema={ContactsSchema}
      >
        <Form>
          <label htmlFor="name">Name</label>
          <Field
            type="text"
            id={nanoid()}
            name="name"
            placeholder="Joe Biden"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
          <ErrorMessage name="name" component="span" />
          <label htmlFor="number">Phone</label>
          <Field
            type="tel"
            id={nanoid()}
            name="number"
            placeholder="067-000-00-00"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
          <ErrorMessage name="number" component="span" />
          <SubmitButton type="submit">Add contact</SubmitButton>
        </Form>
      </Formik>
    </Section>
  );
};
