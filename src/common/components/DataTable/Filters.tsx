import { Filter, FilterOp } from 'common/models';
import { FC, useState } from 'react';
import { Form } from 'react-bootstrap';
import { subDays } from 'date-fns';
import { Trans, useTranslation } from 'react-i18next';

export type FilterUI = FC<{
  attribute: string;
  activeFilters: Filter[];
  setFilter: (name: string, op: FilterOp, value: string) => void;
  removeFilter: (attribute: string, operation: FilterOp) => void;
}>;

export const StringFilter = () => {
  const StringFilterComponent: FilterUI = ({ attribute, activeFilters, setFilter, removeFilter }) => {
    const { t } = useTranslation(['common']);
    const [comparitor, setComparitor] = useState<FilterOp>('icontains');

    const onTextChange = (text: string) => {
      if (text.length > 0) setFilter(attribute, comparitor, text);
      else removeFilter(attribute, comparitor);
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
        <Form.Group controlId={`${attribute}-icontains`}>
          <Form.Check
            onChange={() => optionChanged('icontains')}
            checked={optionChecked('icontains')}
            className='mb-1'
            type='radio'
            name={attribute}
            label={t('contains')}
          />
        </Form.Group>

        <Form.Group controlId={`${attribute}-iexact`}>
          <Form.Check
            onChange={() => optionChanged('iexact')}
            checked={optionChecked('iexact')}
            className='mb-1'
            type='radio'
            name={attribute}
            label={t('isExactly')}
          />
        </Form.Group>

        <Form.Group controlId={`${attribute}-istartswith`}>
          <Form.Check
            onChange={() => optionChanged('istartswith')}
            checked={optionChecked('istartswith')}
            className='mb-1'
            type='radio'
            name={attribute}
            label={t('startsWith')}
          />
        </Form.Group>

        <Form.Group controlId={`${attribute}-iendswith`}>
          <Form.Check
            onChange={() => optionChanged('iendswith')}
            checked={optionChecked('iendswith')}
            className='mb-1'
            type='radio'
            name={attribute}
            label={t('endsWith')}
          />
        </Form.Group>

        <Form.Control
          type='text'
          placeholder={t('filterPlaceholder') ?? undefined}
          value={activeFilters[0]?.value ?? ''}
          onChange={event => onTextChange(event.target.value)}
        />
      </div>
    );
  };
  return StringFilterComponent;
};

export const RecentDateFilter = (days: number[]) => {
  const AfterDaysFilterComponent: FilterUI = ({ attribute, activeFilters, setFilter, removeFilter }) => {
    const { t } = useTranslation(['common']);
    const [choice, setChoice] = useState(days[0]);

    const filterDaysAgo = (days: number) => {
      const date = subDays(new Date(), days);
      setFilter(attribute, 'gt', date.toISOString());
      setChoice(days);
    };

    return (
      <div>
        <Form.Group controlId={`${attribute}-all`}>
          <Form.Check
            checked={activeFilters.length === 0}
            onChange={() => removeFilter(attribute, 'gt')}
            className='mb-1'
            type='radio'
            name={attribute}
            label={t('all')}
          />
        </Form.Group>

        {days.map(count => (
          <Form.Group key={count} controlId={`${attribute}-days${count}`}>
            <Form.Check
              checked={activeFilters.length > 0 && choice === count}
              className='mb-1'
              onChange={() => filterDaysAgo(count)}
              type='radio'
              name={attribute}
              label={
                <Trans ns='common' i18nKey='lastNDays' count={count}>
                  In the last {{ count }} dayz
                </Trans>
              }
            />
          </Form.Group>
        ))}
      </div>
    );
  };
  return AfterDaysFilterComponent;
};

export const EnumFilter = (options: { label: string; value: string }[]) => {
  const initialState: { [key in string]: boolean } = {};
  options.forEach(option => {
    initialState[option.value] = true;
  });
  const EnumFilterComponent: FilterUI = ({ attribute, activeFilters, setFilter, removeFilter }) => {
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
          <Form.Group key={option.value} className='mb-1' controlId={`${attribute}-${option.value}`}>
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
