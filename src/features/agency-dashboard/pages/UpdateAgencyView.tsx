import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDeleteAgencyMutation, useGetAgencyByIdQuery, useUpdateAgencyMutation } from 'common/api/agencyApi';
import { FormCard, PageCrumb, PageHeader, SmallContainer } from 'common/components/Common';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { Agency } from 'common/models';
import * as notificationService from 'common/services/notification';
import { StyledFormWrapper } from 'common/styles/form';
import { useAuth } from 'features/auth/hooks';
import { useConfirmationModal } from 'features/confirmation-modal';
import { HasPermission } from 'features/rbac';
import { FC, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import { AgencyDetailForm, FormData } from '../components/AgencyDetailForm';

export interface RouteParams {
  id: string;
}

export const UpdateAgencyView: FC = () => {
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const { user } = useAuth();
  const [updateAgency] = useUpdateAgencyMutation();
  const { data: agency, isLoading: isLoadingAgency, error } = useGetAgencyByIdQuery(id);
  const [deleteAgency] = useDeleteAgencyMutation();
  const { openModal } = useConfirmationModal();

  const handleDelete = (agency: Agency) => {
    const message = `Delete ${agency.agencyName}?`;

    const onConfirm = async () => {
      await deleteAgency(agency.id);
      notificationService.showSuccessMessage('Agency deleted.');
      history.push('/agencies');
    };

    openModal({ message, confirmButtonLabel: 'DELETE', onConfirm });
  };

  useEffect(() => {
    if (error) {
      notificationService.showErrorMessage('Unable to load agency. Returning to agency list.');
      history.replace('/agencies');
    }
  }, [error, history]);

  const handleFormSubmit = async (data: FormData) => {
    try {
      await updateAgency({ id: Number(id), ...data }).unwrap();
      notificationService.showSuccessMessage('Agency updated.');
      history.push('/agencies');
    } catch (error) {
      notificationService.showErrorMessage('Unable to update agency.');
    }
  };

  return (
    <SmallContainer>
      <PageCrumb>
        <Link to='/agencies'>
          <FontAwesomeIcon icon={["fas", "chevron-left"]} />  Back to Agency List
        </Link>
      </PageCrumb>

      <PageHeader>
        <div>
          <h1>Edit Agency</h1>
          <p className='text-muted'>Update agency details here.</p>
        </div>

        <HasPermission perform={{ permission: 'agency:delete', data: user }}>
          <div>
            <Button onClick={() => handleDelete(agency as Agency)} variant='danger'>
              <FontAwesomeIcon icon={["fas", "trash-alt"]} /> Delete
            </Button>
          </div>
        </HasPermission>
      </PageHeader>

      <Row>
        <Col>
          <FormCard>
            <Card.Body>
              <WithLoadingOverlay isLoading={isLoadingAgency}>
                <StyledFormWrapper>
                  <AgencyDetailForm
                    defaultValues={{ agencyName: agency?.agencyName ?? '' }}
                    submitButtonLabel='Save'
                    onSubmit={handleFormSubmit}
                  />
                </StyledFormWrapper>
              </WithLoadingOverlay>
            </Card.Body>
          </FormCard>
        </Col>
      </Row>
      
    </SmallContainer>
  );
};
