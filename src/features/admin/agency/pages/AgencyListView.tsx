/* eslint-disable no-console */
import ActionButton, { ActionButtonProps } from 'common/components/ActionButton';
import { GenericTable } from 'common/components/GenericTable';
import { CustomRenderer, TableHeader } from 'common/components/GenericTable/types';
import { useGetAgenciesQuery } from 'features/agency-dashboard';
import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

type AgencyTableItem = {
  id: number;
  name: string;
  actions: ActionButtonProps[];
};

export const AgencyListView: FC = () => {
  const { data: agencies = [] } = useGetAgenciesQuery();

  // Set up table headers
  const headers: TableHeader<AgencyTableItem>[] = [
    { key: 'name', label: 'AGENCY NAME' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  // Transform Agency objects returned from the API into the table item data format expected by the table.
  const items: AgencyTableItem[] = agencies.map((agency) => ({
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
  }));

  // Specify custom render methods for any property in the table items that need to be rendered as a custom component.
  // Here we want the actions to be rendered using a custom component.
  const customRenderers: CustomRenderer<AgencyTableItem>[] = [
    {
      key: 'actions',
      renderer: ({ actions }: AgencyTableItem) => (
        <>
          {actions.map((action, index) => (
            <ActionButton key={index} icon={action.icon} tooltipText={action.tooltipText} onClick={action.onClick} />
          ))}
        </>
      ),
    },
  ];

  return (
    <Container>
      <div className='pb-4 text-right'>
        <Button>ADD AGENCY</Button>
      </div>
      <GenericTable<AgencyTableItem> headers={headers} items={items} customRenderers={customRenderers} />
    </Container>
  );
};
