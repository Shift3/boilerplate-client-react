import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useEffect, useState } from 'react';
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

export const SearchBar: FC<{
  onSearch: (value: string) => void;
  onToggle: () => void;
  placeholder?: string;
  shouldDisableFilterToggle: boolean;
}> = ({ onSearch, onToggle, placeholder = 'Search...', shouldDisableFilterToggle }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleToggle = () => {
    onToggle();
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log('send request');
      handleSearch();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

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
