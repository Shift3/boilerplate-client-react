import { FC } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

const StyledModalDialog = styled(Modal.Dialog)`
  .modal-content {
    background-color: ${(props) => props.theme.primary};
    padding: 50px;
  }
`;

const StyledModalTitle = styled(Modal.Title)`
  color: ${(props) => props.theme.cardHeader};
`;

const StyledModalBody = styled(Modal.Body)`
  padding: 10px 0;
  color: #fff;
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

const StyledButton = styled(Button)`
  min-width: 150px;
  padding: 10px;
`;

const StyledCancelButton = styled(StyledButton)`
  color: #fff;
  background-color: ${(props) => props.theme.primary};
  border-color: ${(props) => props.theme.primaryBorder};
`;

interface ILogoutModalProps {
  show: boolean;
  onCancel: () => void;
  onLogOut: () => void;
}

export const LogoutModal: FC<ILogoutModalProps> = ({ show, onCancel, onLogOut }) => {
  return (
    <Modal show={show} onHide={onCancel} keyboard={false} dialogAs={StyledModalDialog}>
      <StyledModalTitle>This will end your login session.</StyledModalTitle>
      <StyledModalBody>Do you want to continue?</StyledModalBody>
      <StyleButtonContainer>
        <StyledCancelButton variant='outline-light' onClick={onCancel}>
          CANCEL
        </StyledCancelButton>
        <StyledButton variant='primary' onClick={onLogOut}>
          LOG OUT
        </StyledButton>
      </StyleButtonContainer>
    </Modal>
  );
};
