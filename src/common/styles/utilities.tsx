import { Badge } from "react-bootstrap";
import styled, { css } from "styled-components";

export const SubtleBadge = styled(Badge)<{
    variant?: 'warning' | 'danger' | 'secondary' | 'info'
}>`
    padding: 0.4rem 0.75rem;

    ${props => props.variant === 'warning' && css`
        background: #eaf0e3 !important;
        color: #dc7906;
    `}

    ${props => props.variant === 'danger' && css`
        background: #eae6e5 !important;
        color: #cc1503;
    `}

    ${props => props.variant === 'secondary' && css`
        background: #ddd !important;
        color: #555;
    `}

    ${props => props.variant === 'info' && css`
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
    dim: boolean
  }>`
    ${props =>
      props.dim ? css`
        &:after {
          content: '';
          position: absolute;
          left: 5;
          right: 5;
          top: 5;
          bottom: 5;
          background: white;
          opacity: 0.5;
        }
      ` : null
    }
  `;