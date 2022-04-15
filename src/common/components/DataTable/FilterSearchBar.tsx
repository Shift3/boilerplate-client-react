import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
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

const StyledExtraMenu = styled.div`
  & > a,
  & > a:active,
  & > a:focus,
  & > a:hover {
    background-color: transparent;
    border: none;
    color: #212529;
  }
`;

const ExtraMenuToggle = React.forwardRef<HTMLButtonElement, { onClick: React.MouseEventHandler<HTMLElement> }>(
  ({ children, onClick }, ref) => (
    <Button
      href=''
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Button>
  ),
);

export const FilterSearchBar: FC<{
  onSearch: (value: string) => void;
  onToggle: () => void;
  hasExtraFilters?: boolean;
  placeholder?: string;
  clearFilters: () => void;
}> = ({ onSearch, onToggle, placeholder = 'Search...', hasExtraFilters, clearFilters }) => {
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

  return (
    <Form onSubmit={handleSearchSubmit}>
      <InputGroup>
        <StyledFilterMenuToggle onClick={handleToggle} disabled={!hasExtraFilters}>
          <FontAwesomeIcon icon='filter' />
        </StyledFilterMenuToggle>
        <Form.Control
          type='text'
          placeholder={placeholder}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <Button type='submit' disabled={!searchValue}>
          Search
        </Button>
        <StyledExtraMenu>
          <Dropdown>
            <Dropdown.Toggle as={ExtraMenuToggle}>
              <FontAwesomeIcon icon='ellipsis-h' />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={clearFilters}>Clear All Filters</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </StyledExtraMenu>
      </InputGroup>
    </Form>
  );
};
