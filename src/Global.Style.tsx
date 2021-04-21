import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
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

    html {
        font-size: 62.5%;
    }

    body {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }
`

export default GlobalStyle
