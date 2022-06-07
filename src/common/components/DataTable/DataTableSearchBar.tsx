import { FC, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { StyledOptionButton } from './utilities';

export const DataTableSearchBar: FC<{
  onSetSearchText: (searchText: string) => void;
  placeholder?: string;
}> = ({ onSetSearchText, placeholder = 'Search...' }) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSetSearchText(searchValue);
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  });

  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <Form.Control
        style={{ borderRadius: 0 }}
        type='text'
        placeholder={placeholder}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      <StyledOptionButton
        onClick={() => setSearchValue('')}
        disabled={searchValue === ''}
        topRightBorderRadius={5}
        bottomRightBorderRadius={5}
      >
        Clear
      </StyledOptionButton>
    </div>
  );
};
