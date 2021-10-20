// React imports
import { FC } from 'react';

// Third party library imports
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { CancelButton, SubmitButton } from 'features/styles/PageStyles';

const StyledModalDialog = styled(Modal.Dialog)`
  .modal-content {
    background-color: ${(props) => props.theme.modals.logoutBackgroundColor};
    padding: 50px;
  }
`;

const StyledModalTitle = styled(Modal.Title)`
  color: ${(props) => props.theme.modals.logoutTitleColor};
`;

const StyledModalBody = styled(Modal.Body)`
  padding: 10px 0;
  color: ${(props) => props.theme.modals.logoutTextColor};
`;

const StyleButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;

  button:nth-of-type(2) {
    margin-left: 10px;
  }
`;
export interface ILogoutModalProps {
  show: boolean;
  onCancel: () => void;
  onLogout: () => void;
}

export const LogoutModal: FC<ILogoutModalProps> = ({ show, onCancel, onLogout }) => {
  return (
    <Modal show={show} onHide={onCancel} keyboard={false} dialogAs={StyledModalDialog}>
      <StyledModalTitle>This will end your login session.</StyledModalTitle>
      <StyledModalBody>Do you want to continue?</StyledModalBody>
      <StyleButtonContainer>
        <CancelButton onClick={onCancel}>CANCEL</CancelButton>
        <SubmitButton onClick={onLogout}>LOG OUT</SubmitButton>
      </StyleButtonContainer>
    </Modal>
  );
};
