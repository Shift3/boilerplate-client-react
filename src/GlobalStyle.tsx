import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *,
    *::after,
    *::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html,
    body {
        min-height: 100vh;
        background: #fafafa;
    }

    a {
        text-decoration: none;
        color: #3b82f6;
    }

    button.btn:disabled {
        cursor: not-allowed;
        pointer-events: unset;
    }

    .badge {
        padding: 0.4rem 0.75rem;

        &.bg-warning {
            background: #eaf0e3 !important;
            color: #dc7906;
        }

        &.bg-danger {
            background: #eae6e5 !important;
            color: #cc1503;
        }

        &.bg-secondary {
            background: #ddd !important;
            color: #555;
        }

        &.bg-info {
            background: #e3edfc !important;
            color: #37aaa5;
        }
    }

    label {
        margin-bottom: .25rem !important;
        margin-top: 0;
        font-size: 0.825rem;
        font-weight: 500;
        color: #555;
    }
    `;
export default GlobalStyle;
