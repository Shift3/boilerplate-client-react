import { ListView } from 'components/listView';
import { ObjectProperty } from 'components/listView/types';
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
  { id: 1, name: 'Jane Doe', description: 'Test agent 2', email: 'jane@email.com', phoneNumber: '4444444444' },
  { id: 1, name: 'Alice Smith', description: 'Test agent 3', email: 'alice@email.com', phoneNumber: '3333333333' },
];

const agentProperties: ObjectProperty<AgentData>[] = [
  { key: 'name', label: 'NAME' },
  { key: 'description', label: 'DESCRIPTION' },
  { key: 'email', label: 'EMAIL' },
  { key: 'phoneNumber', label: 'PHONE NUMBER' },
];

type PostData = {
  id: number;
  title: string;
  body: string;
};

const posts: PostData[] = [
  { id: 1, title: 'Post 1', body: 'This is post 1' },
  { id: 2, title: 'Post 2', body: 'This is post 2' },
  { id: 3, title: 'Post 3', body: 'This is post 3' },
];

const postProperties: ObjectProperty<PostData>[] = [
  { key: 'title', label: 'TITLE' },
  { key: 'body', label: 'BODY' },
];

const DashboardPageContainer = styled.div``;

export const DashboardPage: FC = () => {
  return (
    <DashboardPageContainer data-testid='dashboardPageContainer'>
      <ListView<AgentData> objects={agents} properties={agentProperties} />
      <br />
      <ListView<PostData> objects={posts} properties={postProperties} />
    </DashboardPageContainer>
  );
};
