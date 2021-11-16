import { CustomRenderer, GenericTable, TableHeader } from 'common/components';
import ActionButton, { ActionButtonProps } from 'common/components/ActionButton';
import { useConfirmationModal } from 'common/hooks';
import { Agency } from 'common/models';
import { Link, useHistory } from 'react-router-dom';
import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { CreateButton } from 'features/styles/PageStyles';
import { HasPermission, useRbac } from 'features/rbac';
import { useDeleteAgencyMutation, useGetAgenciesQuery } from 'common/api/agencyApi';
import * as notificationService from 'common/services/notification';

type AgencyTableItem = {
  id: number;
  name: string;
  actions: ActionButtonProps[];
};

export const AgencyListView: FC = () => {
  const history = useHistory();
  const { userHasPermission } = useRbac();
  const { data: agencies = [], isLoading: isLoadingAgencies } = useGetAgenciesQuery();
  const [deleteAgency] = useDeleteAgencyMutation();
  const { Modal: ConfirmationModal, openModal, closeModal } = useConfirmationModal();

  const handleDelete = (agency: Agency) => {
    const message = `Delete ${agency.agencyName}?`;

    const onConfirm = () => {
      deleteAgency(agency.id);
      closeModal();
      notificationService.showSuccessMessage('Agency deleted.');
    };

    const onCancel = () => closeModal();

    openModal(message, onConfirm, onCancel);
  };

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
      {
        icon: 'edit',
        tooltipText: 'Edit',
        onClick: () => history.push(`/agencies/update-agency/${agency.id}`),
        show: userHasPermission('agency:update'),
      },
      {
        icon: 'trash-alt',
        tooltipText: 'Delete',
        onClick: () => handleDelete(agency),
        show: userHasPermission('agency:delete'),
      },
    ],
  }));

  // Specify custom render methods for any property in the table items that need to be rendered as a custom component.
  // Here we want the actions to be rendered using a custom component.
  const customRenderers: CustomRenderer<AgencyTableItem>[] = [
    {
      key: 'actions',
      renderer: ({ actions, id }: AgencyTableItem) => (
        <>
          {actions.map((action) => (
            <ActionButton key={id} {...action} />
          ))}
        </>
      ),
    },
  ];

  return (
    <Container>
      <HasPermission perform='agency:create'>
        <div className='pb-4 text-end'>
          <Link to='/agencies/create-agency'>
            <CreateButton>ADD AGENCY</CreateButton>
          </Link>
        </div>
      </HasPermission>
      <WithLoadingOverlay isLoading={isLoadingAgencies}>
        <GenericTable<AgencyTableItem> headers={headers} items={items} customRenderers={customRenderers} />
      </WithLoadingOverlay>
      <ConfirmationModal />
    </Container>
  );
};
