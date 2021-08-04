import { GenericTable } from 'components/genericTable';
import { ObjectProperty } from 'components/genericTable/types';
import { FC } from 'react';
import styled from 'styled-components';

type AgentData = {
  id: number;
  name: string;
  description: string;
  email: string;
  phoneNumber: string;
};

const agents: AgentData[] = [
  { id: 1, name: 'John Doe', description: 'Test agent 1', email: 'john@email.com', phoneNumber: '5555555555' },
  { id: 2, name: 'Jane Doe', description: 'Test agent 2', email: 'jane@email.com', phoneNumber: '4444444444' },
  { id: 3, name: 'Alice Smith', description: 'Test agent 3', email: 'alice@email.com', phoneNumber: '3333333333' },
];

const agentProperties: ObjectProperty<AgentData>[] = [
  { key: 'name', label: 'NAME' },
  { key: 'description', label: 'DESCRIPTION' },
  { key: 'email', label: 'EMAIL' },
  { key: 'phoneNumber', label: 'PHONE NUMBER' },
];

const DashboardPageContainer = styled.div``;

export const DashboardPage: FC = () => {
  return (
    <DashboardPageContainer data-testid='dashboardPageContainer'>
      <GenericTable<AgentData> objects={agents} properties={agentProperties} />
    </DashboardPageContainer>
  );
};
