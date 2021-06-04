import styled from 'styled-components';

export const LoginPageContainer = styled.div`
  background-color: ${(props) => props.theme.authBackground};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginFormContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  border-radius: 5px;
  width: 50%;
  background-color: ${(props) => props.theme.primary};
  padding: 50px;
`;

export const LoginFormContainerLeft = styled.div`
  padding-right: 15px;
  color: white;
`;

export const LoginFormContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 15px;
  color: white;
`;
