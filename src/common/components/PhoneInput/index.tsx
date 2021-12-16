import { FC } from "react";
import Form from 'react-bootstrap/Form';

export const formatPhoneNumber = (value: string): string => {
    value = value.replace(/\D/g, '');

    if (value.length < 4 && value.length >= 1) {
      return `${value.substring(0, 3)}`;
    }
  
    if (value.length < 7 && value.length >= 4){
      return `(${value.substring(0, 3)}) ${value.substring(3, 6)}`;
    }
  
    if (value.length >= 7) {
      return `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6,value.length)}`;
    }
  
    return '';
  }
  
  const normalizePhoneNumber = (value: string): string => {
    return value.replace(/\D/g, '');
  };
  
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