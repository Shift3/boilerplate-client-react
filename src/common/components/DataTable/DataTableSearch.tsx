import React, { FC } from 'react';
import { SearchBar } from './SearchBar';

export type DataTableSearchProps = {
  onSetSearchText: (searchText: string) => void;
  onDropdownToggle: () => void;
  availableSearchFields: string[];
  shouldDisableFilterToggle: boolean;
};

export const DataTableSearch: FC<DataTableSearchProps> = ({
  onSetSearchText,
  onDropdownToggle,
  availableSearchFields,
  shouldDisableFilterToggle,
}) => {
  const handleSearch = (value: string) => {
    onSetSearchText(value);
  };

  const handleDropdownToggle = () => {
    onDropdownToggle();
  };

  return (
    <SearchBar
      onSearch={handleSearch}
      onToggle={handleDropdownToggle}
      placeholder={`Search by ${availableSearchFields.join(' and ')}`}
      shouldDisableFilterToggle={shouldDisableFilterToggle}
    />
  );
};
