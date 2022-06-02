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

export const FilterSearchBar: FC<{
  onSearch: (value: string) => void;
  onToggle: () => void;
  hasExtraFilters?: boolean;
  placeholder?: string;
}> = ({ onSearch, onToggle, placeholder = 'Search...', hasExtraFilters }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchValue) {
      onSearch(searchValue);
      setSearchValue('');
    }
  };

  const handleToggle = () => {
    if (hasExtraFilters) {
      onToggle();
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log('send request');
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  return (
    <Form>
      <InputGroup>
        <StyledFilterMenuToggle onClick={handleToggle} disabled={!hasExtraFilters}>
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
