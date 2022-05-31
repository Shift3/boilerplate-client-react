import { Badge } from 'react-bootstrap';
import styled, { css } from 'styled-components';

export const SubtleBadge = styled(Badge)<{
  variant?: 'warning' | 'danger' | 'secondary' | 'info';
}>`
  padding: 0.4rem 0.75rem;

  ${props =>
    props.variant === 'warning' &&
    css`
      background: #eaf0e3 !important;
      color: #dc7906;
    `}

  ${props =>
    props.variant === 'danger' &&
    css`
      background: #eae6e5 !important;
      color: #cc1503;
    `}

    ${props =>
    props.variant === 'secondary' &&
    css`
      background: #ddd !important;
      color: #555;
    `}

    ${props =>
    props.variant === 'info' &&
    css`
      background: #e3edfc !important;
      color: #37aaa5;
    `}
`;

export const CenteredSpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1060; // consistent with Bootstrap's $zindex-modal value
`;

export const DimmableContent = styled.div<{
  dim: boolean;
  containerHasRoundedCorners: boolean;
  containerBorderRadius: string;
}>`
  ${props =>
    props.dim
      ? css`
          &:after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: white;
            opacity: 0.5;
            border-radius: ${props.containerHasRoundedCorners ? props.containerBorderRadius : '0px'};
          }
        `
      : null}
`;

export const CircularImg = styled.img<{
  radius: number;
}>`
  border-radius: 50%;
  height: ${props => `${props.radius}px`};
  width: ${props => `${props.radius}px`};
  margin: 0;
  margin-right: 0.75rem;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`;

export const CircularContainer = styled.div<{
  radius: number;
  backgroundColor: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: ${props => `${props.radius}px`};
  width: ${props => `${props.radius}px`};
  background-color: ${props => `${props.backgroundColor}`};
`;

export const NoContent = styled.div`
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  i,
  svg {
    color: #333;
    margin-bottom: 0.5rem;
  }
`;
