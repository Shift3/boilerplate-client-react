/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-console */
import { FC, useMemo } from 'react';
import { GenericTable } from 'components/genericTable';
import { TableHeader, ItemActionProps } from 'components/genericTable/types';
import { useGetAgenciesQuery } from 'services/agencyApi';
import { ItemAction } from 'components/genericTable/ItemAction';

type AgencyTableItem = {
  id: number;
  name: string;
  actions: ItemActionProps[];
};

export const AgencyListView: FC = () => {
  const { data: agencies = [] } = useGetAgenciesQuery();

  // Set up table headers
  const headers: TableHeader<AgencyTableItem>[] = [
    { key: 'name', label: 'AGENCY NAME' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  // Transform Agency objects returned from the API into the table item data format expected by the table.
  const items: AgencyTableItem[] = useMemo(
    () =>
      agencies.map((agency) => ({
        id: agency.id,
        name: agency.agencyName,
        actions: [
          { icon: 'edit', tooltipText: 'Edit', onClick: () => console.log(`Edit ${agency.agencyName}`) },
          {
            icon: 'trash-alt',
            tooltipText: 'Delete',
            onClick: () => console.log(`Delete ${agency.agencyName}`),
          },
        ],
      })),
    [agencies],
  );

  // Specify custom render methods for any property in the table items that need to be rendered as a custom component.
  // Here we want the actions to be rendered using a custom component.
  const customRenderers = {
    actions: ({ actions }: AgencyTableItem) => (
      <>
        {actions.map((action, index) => (
          <ItemAction key={index} icon={action.icon} tooltipText={action.tooltipText} onClick={action.onClick} />
        ))}
      </>
    ),
  };

  return <GenericTable<AgencyTableItem> headers={headers} items={items} customRenderers={customRenderers} />;
};
