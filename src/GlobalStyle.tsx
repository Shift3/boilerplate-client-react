import { createGlobalStyle } from 'styled-components';
import dark from 'themes/dark';

export const GlobalStyle = createGlobalStyle<{ theme: typeof dark }>`
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
        background: ${({ theme }) => theme.backgroundColor};
        color: ${({ theme }) => theme.textColor};
    }

    a, .btn-link {
        text-decoration: none;
        color: ${({ theme }) => theme.linkColor};
        &:hover {
            color: ${({ theme }) => theme.linkHoverColor};
        }
    }

    .bg-dark {
        background-color: ${({ theme }) => theme.textColor} !important;
        color: ${({ theme }) => theme.backgroundColor} !important;
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
        color: ${({ theme }) => theme.forms.labelColor};
    }

    .form-control,
    .form-select,
    textarea {
        background-color: ${({ theme }) => theme.input.backgroundColor};
        color: ${({ theme }) => theme.input.textColor};
        border-color: ${({ theme }) => theme.input.borderColor};

        &:disabled {
            background-color: ${({ theme }) => theme.input.disabledBackground};
        }

        &.is-invalid {
            border-color: ${({ theme }) => theme.forms.errorBorderColor};
        }
    }

    .invalid-feedback {
        color: ${({ theme }) => theme.forms.errorTextColor};
    }

    .card {
        background-color: ${({ theme }) => theme.card.backgroundColor};
        border-radius: 6px;
        border: none;
        box-shadow: ${({ theme }) => theme.boxShadow};
    }

    .text-muted {
        color: ${({ theme }) => theme.pages.p} !important;
    }

    .btn-primary {
        background-color: ${({ theme }) => theme.buttons.primaryBackgroundColor};
        border-color: ${({ theme }) => theme.buttons.primaryBorderColor};
        color: ${({ theme }) => theme.buttons.primaryTextColor};

        &:hover {
            background-color: ${({ theme }) => theme.buttons.primaryHoverBackgroundColor};
            color: ${({ theme }) => theme.buttons.primaryHoverTextColor};
            border-color: transparent;
        }
    }

    .btn-default {
        background-color: ${({ theme }) => theme.buttons.defaultBackgroundColor};
        border-color: ${({ theme }) => theme.buttons.defaultBorderColor};
        color: ${({ theme }) => theme.buttons.defaultTextColor};

        &:hover {
            background-color: ${({ theme }) => theme.buttons.defaultHoverBackgroundColor};
            color: ${({ theme }) => theme.buttons.defaultHoverTextColor};
            border-color: transparent;
        }
    }

    div.react-select__control {
        background-color: ${({ theme }) => theme.input.backgroundColor};
        border-color: ${({ theme }) => theme.input.borderColor};
    }
    span.react-select__indicator-separator {
        background-color: ${({ theme }) => theme.input.borderColor};
    }
    div.react-select__indicator {
        color: ${({ theme }) => theme.input.borderColor};
    }
    div.react-select__value-container,
    div.react-select__single-value {
        color: ${({ theme }) => theme.input.textColor};
    }

    div.react-select__menu {
        background-color: ${({ theme }) => theme.card.backgroundColor};
    }
    div.react-select__option--is-focused:not(.react-select__option--is-selected) {
        background-color: ${({ theme }) => theme.backgroundColor};
    }

`;
export default GlobalStyle;
