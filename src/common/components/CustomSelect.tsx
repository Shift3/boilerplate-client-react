import { ReactElement } from 'react';
import Form from 'react-bootstrap/Form';
import Select, { ActionMeta, SingleValue } from 'react-select';

type Props<T> = {
  options: T[];
  defaultValue?: T;
  placeholder?: string;
  isLoading?: boolean;
  isInvalid?: boolean;
  // Resolves option data to a string to be displayed as the label
  getOptionLabel?: (option: T) => string;
  // Resolves option data to a string to compare options and specify value attributes
  getOptionValue?: (option: T) => string;
  // Handle change events on the select
  onChange?: (value: T) => void;
  // Fired when the user scrolls to the bottom of the menu. For example to handle loading
  // a new page of data if the data is paginated.
  onScrollToBottom?: (event: WheelEvent | TouchEvent) => void;
};

// Note the "," in <T,> is required otherwise '<T>' is interpreted as a JSX tag instead
// of a generic type declaration inside a .tsx file.`
export const CustomSelect = <T,>({
  options,
  defaultValue,
  placeholder,
  isLoading,
  isInvalid,
  getOptionLabel,
  getOptionValue,
  onChange,
  onScrollToBottom,
}: Props<T>): ReactElement => {
  const handleChange = (newValue: SingleValue<T>, actionMeta: ActionMeta<T>) => {
    const { action } = actionMeta;

    // The `Select` component from the react-select library has many features and different
    // types of actions. For now, we are just handling selecting a new option value.
    if (action === 'select-option') {
      // Note: SingleValue<T> = T | null so we have to perform type narrowing here
      if (newValue && onChange) {
        onChange(newValue);
      }
    }
  };

  return (
    <>
      <Select
        tabIndex={0}
        classNamePrefix='react-select'
        options={options}
        defaultValue={defaultValue}
        placeholder={placeholder}
        isLoading={isLoading}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        onMenuScrollToBottom={onScrollToBottom}
        onChange={handleChange}
      />
      {/* A hidden react-bootstrap select is used for the `isInvalid` state which is required in
      order for the react-bootstram `Form.Control.Feedback` component to work correctly. */}
      <Form.Select hidden isInvalid={isInvalid} />
    </>
  );
};
