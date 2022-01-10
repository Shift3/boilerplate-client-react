import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *,
    *::after,
    *::before {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }
    html,
    body {
        min-height: 100vh;
        width: 100vw;
    }
    body {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }
`;
