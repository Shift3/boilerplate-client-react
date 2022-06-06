import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import styled from 'styled-components';

const StyledFilterMenuToggle = styled(Button)`
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  color: #212529;

  &:disabled {
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    color: #212529;
  }
`;

export const DataTableSearchBar: FC<{
  onSetSearchText: (searchText: string) => void;
  onDropdownToggle: () => void;
  shouldDisableFilterToggle: boolean;
  placeholder?: string;
}> = ({ onSetSearchText, onDropdownToggle, placeholder = 'Search...', shouldDisableFilterToggle }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleToggle = () => {
    onDropdownToggle();
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSetSearchText(searchValue);
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  });

  return (
    <Form>
      <InputGroup>
        <StyledFilterMenuToggle onClick={handleToggle} disabled={shouldDisableFilterToggle}>
          <FontAwesomeIcon icon='filter' /> Filters
        </StyledFilterMenuToggle>
        <Form.Control
          type='text'
          placeholder={placeholder}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
      </InputGroup>
    </Form>
  );
};
