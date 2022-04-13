import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { OperationOption } from '../DataTable/DataTableFilters';

export const RadioButtonOptionSelector: FC<{
  value: string;
  onChange: (value: string) => void;
  options?: OperationOption[];
}> = ({ value, onChange, options }) => {
  return (
    <Form>
      {options
        ? options.map(option => (
            <Form.Check
              key={option.operationLabel}
              name='radioBtn'
              type='radio'
              label={option.operationLabel}
              checked={value === option.operationLabel}
              onClick={() => onChange(option.operationLabel)}
            />
          ))
        : null}
    </Form>
  );
};
