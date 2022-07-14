import React, { FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled, { css } from 'styled-components';
import { FilterInfo } from './DataTableActiveFilterList';
import { wasMouseEventOutsideContainer } from 'utils/events';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CustomSelect } from '../CustomSelect';

const StyledDropdown = styled.div`
  position: absolute;
  top: 42px;
  z-index: 9999;
  min-width: 240px;
`;

const FilterMenu = styled(Card)`
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.card.backgroundColor};
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const StyledDropdownItem = styled.a<{ selected?: boolean }>`
  display: block;
  width: 100%;
  padding 0.5rem 1.5rem;
  clear: both;
  font-weight: 400;
  text-align: inherit;
  text-decoration: none;
  white-space: nowrap;
  color: ${props => props.theme.textColor};
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

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  h1 {
    font-size: 1.2rem;
    margin: 0;
    flex: 1;
  }
`;

const FilterCategory = styled.div`
  display: block;
  &:not(:last-of-type) {
    border-bottom: 1px solid ${props => props.theme.buttons.defaultBackgroundColor};
  }

  & > .category {
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${props => props.theme.pages.p};
    transition: all 0.15s ease;

    &:hover {
      color: ${props => props.theme.textColor};
    }

    span {
      flex: 1;
    }

    svg {
      transition: all 0.15s ease;
    }
  }

  & > .content {
    visibility: hidden;
    max-height: 0;
    padding: 0 1rem;
    transition: all 0.15s ease;
    overflow: hidden;
    background: ${props => props.theme.backgroundColor};

    label {
      color: ${props => props.theme.textColor};
      font-weight: normal;
      font-size: 0.9rem;
    }
  }

  &.open {
    & > .category {
      color: ${props => props.theme.textColor};

      svg {
        transform: rotateZ(180deg);
      }
    }

    & > .content {
      visibility: visible;
      max-height: 250px;
      padding: 1rem;
    }
  }
`;

const AttributeDropdownMenu: FC<{
  show?: boolean;
  filters: FilterInfo[];
  selected?: number;
  onSelect: (index: number) => void;
}> = ({ show, filters, selected, onSelect }) => {
  const [openFilter, setOpenFilter] = useState<FilterInfo | null>(null);

  const toggleCategory = (filter: FilterInfo) => {
    if (openFilter === filter) setOpenFilter(null);
    else setOpenFilter(filter);
  };

  return (
    <FilterMenu hidden={!show}>
      <FilterHeader>
        <h1>Filters</h1>
        <a href='/'>Clear All</a>
      </FilterHeader>

      {filters.map((filter, index) => (
        <FilterCategory className={openFilter === filter ? 'open' : ''}>
          <div role='button' tabIndex={-1} className='category' onClick={() => toggleCategory(filter)}>
            <span>{filter.attributeLabel}</span>
            <FontAwesomeIcon icon='chevron-down' />
          </div>

          <div className='content'>
            <Form.Check
              className='mb-2'
              type='radio'
              tabIndex={-1}
              readOnly
              checked
              name={filter.attribute}
              label='Is Exactly'
            />
            <Form.Check className='mb-2' type='radio' tabIndex={-1} readOnly name={filter.attribute} label='Contains' />
            <Form.Check
              className='mb-2'
              type='radio'
              tabIndex={-1}
              readOnly
              name={filter.attribute}
              label='Starts With'
            />
            <Form.Check
              className='mb-2'
              type='radio'
              tabIndex={-1}
              readOnly
              name={filter.attribute}
              label='Ends With'
            />

            <input
              type='input'
              aria-label='Enter text to filter by'
              placeholder='Enter filter text...'
              className='form-control'
            />
          </div>
        </FilterCategory>
      ))}
    </FilterMenu>
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
    <FilterMenu hidden={!show}>
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
    </FilterMenu>
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
    </DropdownContainer>
  );
};
