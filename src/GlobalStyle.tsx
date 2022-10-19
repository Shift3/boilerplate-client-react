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

    .btn {
        border-radius: ${({ theme }) => theme.buttons.borderRadius};
        transition: all 0.3 ease-in-out;
    }

    .input-group > .btn {
        border-radius: ${({ theme }) => theme.borderRadius};
    }

    button.btn:disabled {
        cursor: not-allowed;
        pointer-events: unset;
    }

    label {
        margin-bottom: .25rem !important;
        margin-top: 0;
        font-size: 0.825rem;
        font-weight: 600;
        color: ${({ theme }) => theme.forms.labelColor};
    }

    .form-control,
    .form-select,
    textarea,
    .react-tel-input > .form-control {
        background-color: ${({ theme }) => theme.input.backgroundColor};
        color: ${({ theme }) => theme.input.textColor};
        border-color: ${({ theme }) => theme.input.borderColor};
        border-radius: ${({ theme }) => theme.borderRadius};

        &:disabled {
            background-color: ${({ theme }) => theme.input.disabledBackground};
        }

        &.is-invalid {
            border-color: ${({ theme }) => theme.forms.errorBorderColor};
        }
    }

    .dropdown-menu {
        border-radius: ${({ theme }) => theme.borderRadius};
        background-color: ${({ theme }) => theme.card.backgroundColor};
        border: 1px solid ${({ theme }) => theme.nav.borderColor};
        margin-top: 0.5rem !important;
        box-shadow: ${({ theme }) => theme.boxShadow};

        .dropdown-item {
            color: ${({ theme }) => theme.card.textColor};

            &:hover,
            &:active {
                color: ${({ theme }) => theme.card.backgroundColor};
                background-color: ${({ theme }) => theme.card.textColor};
            }
        }
    }

    .invalid-feedback {
        color: ${({ theme }) => theme.forms.errorTextColor};
    }

    .tooltip-inner {
        background-color: ${({ theme }) => theme.tooltips.backgroundColor};
        color: ${({ theme }) => theme.tooltips.textColor};
    }
    .tooltip-arrow::before {
        border-top-color: ${({ theme }) => theme.tooltips.backgroundColor} !important;
    }

    .card {
        background-color: ${({ theme }) => theme.card.backgroundColor};
        border-radius: ${({ theme }) => theme.borderRadius};
        border: none;
        box-shadow: ${({ theme }) => theme.boxShadow};
        
        .dimmable-content-container::after {
            border-radius: ${({ theme }) => theme.borderRadius};
        }
    }

    .card-header {
        background-color: ${({ theme }) => theme.card.backgroundColor};
        border: none;
    }

    .card-title {
        margin: 0;
    }

    .text-muted {
        color: ${({ theme }) => theme.pages.p} !important;
    }
    
    .btn {
        font-weight: 600;
        font-size: 0.9rem;
    }
    .btn.btn-primary {
        background-color: ${({ theme }) => theme.buttons.primaryBackgroundColor};
        border-color: ${({ theme }) => theme.buttons.primaryBorderColor};
        color: ${({ theme }) => theme.buttons.primaryTextColor};

        &:hover {
            background-color: ${({ theme }) => theme.buttons.primaryHoverBackgroundColor};
            color: ${({ theme }) => theme.buttons.primaryHoverTextColor};
            border-color: transparent;
        }
    }

    .btn.btn-default {
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

    .modal-dialog {
        display: flex;
        align-items: center;
    }

    .modal-content {
        box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
        border-radius: calc(${({ theme }) => theme.borderRadius} * 3);
        background-color: ${({ theme }) => theme.card.backgroundColor};
        color: ${({ theme }) => theme.card.textColor};
    }

    .modal-body {
        padding-top: 0;
    }

    .modal-header {
        border: 0;
    }

    .modal-footer {
        border: 0;
        margin-top: 1rem;
        border-bottom-left-radius: calc(${({ theme }) => theme.borderRadius} * 3);;
        border-bottom-right-radius: calc(${({ theme }) => theme.borderRadius} * 3);;
        background: ${({ theme }) => theme.backgroundColor}
    }

    .changelog-modal-content {
        height: 50vh;
    }

    .changelog-modal-body {
        overflow-y: auto;
        height: 85%;
    }

    .changelog-modal-footer {
        height: 15%;
    }

    .action-shadow {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    .react-tel-input .form-control {
        width: 100%;
        line-height: 1.5;
        height: inherit;
        font-size: 1rem;
    }

    .react-tel-input .flag-dropdown {
        border: 1px solid transparent;
        border-top-left-radius: ${props => props.theme.borderRadius};
        overflow:hidden;
        border-bottom-left-radius: ${props => props.theme.borderRadius};

        .flag {
            margin-left: 0.1rem;
        }
    }

    .in-app-notification {
        color: black;
        font-size: 1rem;
    }

`;
export default GlobalStyle;
