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

export const SpinnerOverlay = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${props => props.theme.spinner.overlayBackgroundColor};
    position: absolute;
    z-index: 1040; // consistent with Bootstrap's $zindex-modal-backdrop value
`;

export const CenteredSpinnerContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1060; // consistent with Bootstrap's $zindex-modal value
`;
