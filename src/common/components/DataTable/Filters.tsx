import { Filter, FilterOp } from 'common/models';
import { FC, useState } from 'react';
import { Form } from 'react-bootstrap';

export const StringFilter = () => {
  const StringFilterComponent: FC<{
    attribute: string;
    activeFilters: Filter[];
    setFilter: (name: string, op: FilterOp, value: string) => void;
    removeFilter: (attribute: string, operation: FilterOp) => void;
  }> = ({ attribute, activeFilters, setFilter, removeFilter }) => {
    const [comparitor, setComparitor] = useState('icontains');

    const onTextChange = (text: string) => {
      if (text.length > 0) setFilter(attribute, 'icontains', text);
      else removeFilter(attribute, 'icontains');
    };

    const optionChecked = (op: FilterOp) => {
      return comparitor === op;
    };

    const optionChanged = (op: FilterOp) => {
      setComparitor(op);
      if (activeFilters[0]?.value) {
        setFilter(attribute, op, activeFilters[0]?.value);
      }
    };

    return (
      <div>
        <Form.Check
          onChange={event => optionChanged('icontains')}
          checked={optionChecked('icontains')}
          className='mb-1'
          type='radio'
          name={attribute}
          label='Contains'
        />
        <Form.Check
          onChange={event => optionChanged('iexact')}
          checked={optionChecked('iexact')}
          className='mb-1'
          type='radio'
          name={attribute}
          label='Is Exactly'
        />
        <Form.Check
          onChange={event => optionChanged('istartswith')}
          checked={optionChecked('istartswith')}
          className='mb-1'
          type='radio'
          name={attribute}
          label='Starts With'
        />
        <Form.Check
          onChange={event => optionChanged('iendswith')}
          checked={optionChecked('iendswith')}
          className='mb-1'
          type='radio'
          name={attribute}
          label='Ends With'
        />

        <Form.Control
          type='text'
          placeholder='Enter filter text...'
          value={activeFilters[0]?.value ?? ''}
          onChange={event => onTextChange(event.target.value)}
        />
      </div>
    );
  };
  return StringFilterComponent;
};

export const EnumFilter = (options: { label: string; value: string }[]) => {
  const initialState: { [key in string]: boolean } = {};
  options.forEach(option => {
    initialState[option.value] = true;
  });
  const EnumFilterComponent: FC<{
    attribute: string;
    activeFilters: Filter[];
    setFilter: (name: string, op: FilterOp, value: string) => void;
    removeFilter: (attribute: string, operation: FilterOp) => void;
  }> = ({ attribute, activeFilters, setFilter, removeFilter }) => {
    const [state, setState] = useState(initialState);

    const toggleOption = (option: { label: string; value: string }) => {
      state[option.value] = !state[option.value];
      setState(state);

      const arr: string[] = [];
      Object.entries(state).forEach(([k, v]) => {
        if (v) arr.push(k);
      });

      if (arr.length === options.length) {
        removeFilter(attribute, 'in');
        removeFilter(attribute, 'isnull');
      } else if (arr.length > 0) setFilter(attribute, 'in', arr.join(','));
      else setFilter(attribute, 'isnull', 'true');
    };

    const optionChecked = (option: { label: string; value: string }) => {
      if (activeFilters.length === 0) return true;
      return !!activeFilters.find(f => f.value.indexOf(option.value) !== -1);
    };

    return (
      <div>
        {options.map(option => (
          <Form.Group key={option.value} className='mb-1' controlId={option.value}>
            <Form.Check
              onChange={() => toggleOption(option)}
              checked={optionChecked(option)}
              type='checkbox'
              label={option.label}
            />
          </Form.Group>
        ))}
      </div>
    );
  };
  return EnumFilterComponent;
};
