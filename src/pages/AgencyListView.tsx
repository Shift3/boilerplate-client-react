/* eslint-disable no-alert */
import { FC, useMemo } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GenericTable } from 'components/genericTable';
import { TableHeader } from 'components/genericTable/types';
import { useGetAgenciesQuery } from 'services/agencyApi';
// import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';

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
  const { data: agencies = [] } = useGetAgenciesQuery();

  const headers: TableHeader<AgencyTableItem>[] = [
    { key: 'name', label: 'AGENCY NAME' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  const items: AgencyTableItem[] = useMemo(
    () =>
      agencies.map((agency) => ({
        id: agency.id,
        name: agency.agencyName,
        actions: [
          { icon: 'edit' as IconProp, onClick: () => console.log(`Edit ${agency.agencyName}`) },
          { icon: 'trash-alt' as IconProp, onClick: () => console.log(`Delete ${agency.agencyName}`) },
        ],
      })),
    [agencies],
  );

  return <GenericTable<AgencyTableItem> headers={headers} items={items} customRenderers={customRenderers} />;
};
