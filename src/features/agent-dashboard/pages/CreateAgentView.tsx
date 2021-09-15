import { Address } from 'common/models/address';
import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';
import { useCreateAgentMutation } from '../agentApi';
import { CreateAgentFormData, CreateAgentForm } from '../components/CreateAgentForm';
import { StyledFormTitle, StyledFormWrapper } from '../components/styled';
import { useGetAgenciesQuery } from 'features/agency-dashboard/agencyApi';
import { useGetRolesQuery } from 'features/user-dashboard/roleApi';

export const CreateAgentView: FC = () => {
  const history = useHistory();
  const [createAgent] = useCreateAgentMutation();
  const { showErrorNotification, showSuccessNotification } = useShowNotification();
  const { data: roles = [] } = useGetRolesQuery();
  const { data: agencies = [] } = useGetAgenciesQuery();

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: CreateAgentFormData) => {
    const { name, email, description, phoneNumber, address1, address2, city, state, zipCode, thumbnail } = data;
    const address: Address = { address1, address2, city, state, zipCode };
    try {
      await createAgent({
        name,
        email,
        description,
        phoneNumber,
        address,
        thumbnail,
      }).unwrap();
      showSuccessNotification('Agent created.');
    } catch (error) {
      showErrorNotification('Unable to add agent.');
    }
  };

  return (
    <Container className='d-flex justify-content-center'>
      <StyledFormWrapper>
        <StyledFormTitle>
          Create Agent
          <CreateAgentForm roles={roles} agencies={agencies} onCancel={handleFormCancel} onSubmit={handleFormSubmit} />
        </StyledFormTitle>
      </StyledFormWrapper>
    </Container>
  );
};
