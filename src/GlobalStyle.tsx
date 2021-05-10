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
        height: 100%;
        width: 100%;
    }

    body {
        /* display: flex;
        flex-direction: column;
        box-sizing: border-box; */
        grid-template-areas: inherit;
        width: 100%;
        height: 100%;
        box-sizing: inherit;
    }
>>>>>>> 4d5699f... feat(holy-grail): updated styled.ts
`;
export default GlobalStyle;
