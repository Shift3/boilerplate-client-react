import { Badge } from "react-bootstrap";
import styled, { css } from "styled-components";

export const SubtleBadge = styled(Badge)`
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
