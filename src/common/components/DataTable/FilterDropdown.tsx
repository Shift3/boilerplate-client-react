import React, { FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled, { css } from 'styled-components';
import { FilterInfo } from './DataTableActiveFilterList';
import { wasMouseEventOutsideContainer } from 'utils/events';

const StyledDropdown = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  z-index: 9999;
`;

const StyledDropdownMenu = styled(Card).attrs({ className: 'shadow' })`
  background-color: ${props => props.theme.backgroundColor};

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const StyledDropdownItem = styled.a<{ selected?: boolean }>`
  display: block;
  width: 100%;
  padding 0.25rem 1rem;
  clear: both;
  font-weight: 400;
  text-align: inherit;
  text-decoration: none;
  white-space: nowrap;
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.backgroundColor};
  border: 0;
  cursor: pointer;

  &:focus,
  &:hover {
    background-color: ${props => props.theme.buttons.defaultBackgroundColor};

  }

  &:active {
    background-color: ${props => props.theme.buttons.defaultBackgroundColor};
  }

  ${props =>
    props.selected &&
    css`
      background-color: ${props => props.theme.buttons.primaryBackgroundColor};
    `}
`;

const StyledButtonWrapper = styled.div`
  button {
    display: inline-block;
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

const DefaultFilterInput: FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => <Form.Control type='text' value={value} onChange={e => onChange(e.target.value)} />;

const DropdownItem: FC<
  PropsWithChildren<{
    selected: boolean;
    onClick: React.MouseEventHandler;
  }>
> = ({ children, selected, onClick }) => {
  const targetRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      targetRef.current = e.target as HTMLElement;
      targetRef.current.click();
    }
  };

  return (
    <StyledDropdownItem tabIndex={0} selected={selected} onClick={onClick} onKeyDown={handleKeyDown}>
      {children}
    </StyledDropdownItem>
  );
};

const DropdownContainer = React.forwardRef<HTMLDivElement, { show?: boolean; children: React.ReactNode }>(
  ({ show, children }, ref) => (
    <StyledDropdown hidden={!show} ref={ref}>
      {children}
    </StyledDropdown>
  ),
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
        <DropdownItem key={filter.attribute} selected={index === selected} onClick={() => onSelect(index)}>
          {filter.attributeLabel}
        </DropdownItem>
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
            <DropdownItem key={op.operation} selected={index === selected} onClick={() => handleOperationSelect(index)}>
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
            </DropdownItem>
          );
        })}
        <StyledButtonWrapper>
          <Button variant='default' onClick={handleCancel}>
            Cancel
          </Button>
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
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const handleFilterCancel = useCallback(() => {
    onClose();
    setSelectedAttribute(undefined);
    setSelectedOperation(undefined);
  }, [onClose]);

  const handleFilterApply = (value: string) => {
    if (selectedAttribute !== undefined && selectedOperation !== undefined) {
      onApply(selectedAttribute, selectedOperation, value);
      onClose();
      setSelectedAttribute(undefined);
      setSelectedOperation(undefined);
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        handleFilterCancel();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownContainerRef.current) return;

      if (wasMouseEventOutsideContainer(dropdownContainerRef.current, e)) {
        handleFilterCancel();
      }
    };

    document.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleFilterCancel]);

  return (
    <DropdownContainer show={show} ref={dropdownContainerRef}>
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
