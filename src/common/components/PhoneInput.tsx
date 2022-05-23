import { FC } from 'react';
import Form from 'react-bootstrap/Form';
import { formatPhoneNumber, normalizePhoneNumber } from 'utils/phone';

type Props = {
  placeholder?: string;
  value: string;
  invalid: boolean;
  onChange: (value: string) => void;
};

export const PhoneInput: FC<Props> = ({ placeholder = '', value, invalid, onChange }) => {
  const formatted = formatPhoneNumber(value);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const normalized = normalizePhoneNumber(e.target.value);
    if (normalized.length <= 10) {
      onChange(normalized);
    }
  };

  return (
    <Form.Control type='tel' placeholder={placeholder} value={formatted} onChange={handleChange} isInvalid={invalid} />
  );
};
