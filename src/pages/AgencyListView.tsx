/* eslint-disable no-alert */
import { FC } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GenericTable } from 'components/genericTable';
import { TableHeader } from 'components/genericTable/types';

type AgencyTableItem = {
  // eslint-disable-next-line react/no-unused-prop-types
  id: number;
  // eslint-disable-next-line react/no-unused-prop-types
  name: string;
  actions: {
    icon: IconProp;
    onClick: () => void;
  }[];
};

const agencyTableHeaders: TableHeader<AgencyTableItem>[] = [
  { key: 'name', label: 'AGENCY NAME' },
  { key: 'actions', label: 'ACTIONS' },
];

const agencyTableItems: AgencyTableItem[] = [
  {
    id: 1,
    name: 'Main',
    actions: [
      { icon: 'edit', onClick: () => alert('Edit Main') },
      { icon: 'trash-alt', onClick: () => alert('Delete Main') },
    ],
  },
  {
    id: 2,
    name: 'Public',
    actions: [
      { icon: 'edit', onClick: () => alert('Edit Public') },
      { icon: 'trash-alt', onClick: () => alert('Delete Public') },
    ],
  },
];

const customRenderers = {
  actions: ({ actions }: AgencyTableItem) => (
    <>
      {actions.map((action, index) => (
        <span
          role='button'
          tabIndex={0}
          className='px-3 py-1'
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          onClick={action.onClick}
          onKeyPress={action.onClick}
        >
          <FontAwesomeIcon icon={action.icon} />
        </span>
      ))}
    </>
  ),
};

export const AgencyListView: FC = () => {
  return (
    <GenericTable<AgencyTableItem>
      headers={agencyTableHeaders}
      items={agencyTableItems}
      customRenderers={customRenderers}
    />
  );
};
