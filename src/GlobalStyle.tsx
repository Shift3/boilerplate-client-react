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
        min-height: 100%;
    }

    a {
        text-decoration: none;
        color: #3b82f6;
    }

    button.btn:disabled {
        cursor: not-allowed;
        pointer-events: unset;
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
