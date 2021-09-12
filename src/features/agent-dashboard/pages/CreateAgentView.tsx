import { useShowNotification } from 'core/modules/notifications/application/useShowNotification';
import { CreateAgencyForm } from 'features/agency-dashboard/components/CreateAgencyForm';
import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';
import { useCreateAgentMutation } from '..';
import { CreateAgentFormData } from '../components/CreateAgentForm';
import { StyledFormTitle, StyledFormWrapper } from '../components/styled';

export const CreateAgentView: FC = () => {
  const history = useHistory();
  const [createAgent] = useCreateAgentMutation();
  const { showErrorNotification, showSuccessNotification } = useShowNotification();

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: CreateAgentFormData) => {
    const { agentName, email, description, phoneNumber, address, address2, city, state, zipCode } = data;
    try {
      await createAgent({
        agentName,
        email,
        description,
        phoneNumber,
        address,
        address2,
        city,
        state,
        zipCode,
      }).unwrap();
      showSuccessNotification('Agent created.');
    } catch (error) {
      showErrorNotification('Unable to add agent.');
    }
  };

  return (
    <Container className='d-fliex justify-content-center'>
      <StyledFormWrapper>
        <StyledFormTitle>
          Create Agent
          <CreateAgencyForm onCancel={handleFormCancel} onSubmit={handleFormSubmit} />
        </StyledFormTitle>
      </StyledFormWrapper>
    </Container>
  );
};
