import { CancelButton } from 'common/styles/button';
import React, { FC, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled, { css } from 'styled-components';
import { FilterInfo } from './Filter';

// ----------------------------------------------------------------------------
// Styled components
// ----------------------------------------------------------------------------
const StyledDropdown = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  z-index: 9999;
`;

const StyledDropdownMenu = styled(Card).attrs({ className: 'shadow' })`
  background-color: white;

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const StyledDropdownItem = styled(Dropdown.Item)<{ selected?: boolean }>`
  &:active {
    background-color: #e9ecef;
  }
  ${props =>
    props.selected &&
    css`
      background-color: #e9ecef;
    `}
`;

const StyledButtonWrapper = styled.div`
  button {
    display: inline-block;
    height: 50px;
    margin: 0;
    width: 50%;
    white-space: nowrap;

    &:first-of-type {
      border-radius: 0 0 0 0.25rem;
    }

    &:last-of-type {
      border-radius: 0 0 0.25rem 0;
    }
  }
`;

// ----------------------------------------------------------------------------
// Container and Menus
// ----------------------------------------------------------------------------
const DefaultFilterInput: FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => (
  <Form.Control type='text' value={value} onChange={e => onChange(e.target.value)} />
);

const DropdownContainer: FC<{ show?: boolean }> = ({ show, children }) => (
  <StyledDropdown hidden={!show}>{children}</StyledDropdown>
);

const AttributeDropdownMenu: FC<{
  show?: boolean;
  filters: FilterInfo[];
  selected?: number;
  onSelect: (index: number) => void;
}> = ({ show, filters, selected, onSelect }) => {
  return (
    <StyledDropdownMenu hidden={!show}>
      {filters.map((filter, index) => (
        <StyledDropdownItem key={filter.attribute} selected={index === selected} onClick={() => onSelect(index)}>
          {filter.attributeLabel}
        </StyledDropdownItem>
      ))}
    </StyledDropdownMenu>
  );
};

export const OperationDropdownMenu: FC<{
  show?: boolean;
  filter: FilterInfo;
  selected?: number;
  defaultValue?: string;
  onSelect: (index: number) => void;
  onCancel: () => void;
  onApply: (value: string) => void;
}> = ({ show, filter, selected, defaultValue, onSelect, onCancel, onApply }) => {
  const [value, setValue] = useState(defaultValue ?? '');

  const handleOperationSelect = (index: number) => {
    if (selected !== index) {
      onSelect(index);
      setValue('');
    }
  };

  const handleCancel = () => onCancel();

  const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value) {
      onApply(value);
      setValue('');
    }
  };

  return (
    <StyledDropdownMenu hidden={!show}>
      <Form onSubmit={handleApply}>
        {filter.operationOptions.map((op, index) => {
          const FilterInput = op.InputUI ?? DefaultFilterInput;
          return (
            <StyledDropdownItem key={op.operation} onClick={() => handleOperationSelect(index)}>
              <Form.Check
                type='radio'
                tabIndex={-1}
                readOnly
                name={filter.attribute}
                label={op.operationLabel}
                checked={index === selected}
                onClick={() => handleOperationSelect(index)}
              />
              {index === selected && <FilterInput value={value} onChange={setValue} />}
            </StyledDropdownItem>
          );
        })}
        <StyledButtonWrapper>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
          <Button type='submit'>Apply</Button>
        </StyledButtonWrapper>
      </Form>
    </StyledDropdownMenu>
  );
};

// ----------------------------------------------------------------------------
// Main Dropdown
// ----------------------------------------------------------------------------
export type FilterDropdownProps = {
  show?: boolean;
  filters: FilterInfo[];
  onClose: () => void;
  onApply: (selectedAttribute: number, selectedOperation: number, value: string) => void;
};

export const FilterDropdown: FC<FilterDropdownProps> = ({ show = false, filters, onClose, onApply }) => {
  const [selectedAttribute, setSelectedAttribute] = useState<number>();
  const [selectedOperation, setSelectedOperation] = useState<number>();

  const handleFilterCancel = () => onClose();

  const handleFilterApply = (value: string) => {
    if (selectedAttribute !== undefined && selectedOperation !== undefined) {
      onApply(selectedAttribute, selectedOperation, value);
      onClose();
    }
  };

  useEffect(() => {
    if (!show) {
      setSelectedAttribute(undefined);
      setSelectedOperation(undefined);
    }
  }, [show]);

  return (
    <DropdownContainer show={show}>
      <AttributeDropdownMenu
        show={show}
        filters={filters}
        selected={selectedAttribute}
        onSelect={setSelectedAttribute}
      />
      {selectedAttribute !== undefined && (
        <OperationDropdownMenu
          show={selectedAttribute !== undefined}
          filter={filters[selectedAttribute]}
          selected={selectedOperation}
          onSelect={setSelectedOperation}
          onCancel={handleFilterCancel}
          onApply={handleFilterApply}
        />
      )}
    </DropdownContainer>
  );
};