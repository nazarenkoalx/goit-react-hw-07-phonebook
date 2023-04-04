import { Section } from 'components/Section/Section.styled';
import { Wrapper } from 'components/Wrapper/Wrapper.styled';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { Input } from './Filter.styled';
import { getFilter } from 'redux/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const handleChange = event => {
    const { value } = event.target;
    dispatch(setFilter(value));
  };

  return (
    <Section>
      <Wrapper>
        <label htmlFor="filter">Search contacts by name</label>
        <Input
          value={filter}
          name="filter"
          onChange={handleChange}
          placeholder="type contacts name"
        ></Input>
      </Wrapper>
    </Section>
  );
};
