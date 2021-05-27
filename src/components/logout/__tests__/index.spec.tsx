import { render, screen, cleanup, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Logout } from '..';

const { click } = userEvent;
const { getByTestId } = screen;

let logoutButton: HTMLElement;

beforeEach(() => {
    render(<Logout />);
    logoutButton = getByTestId('lo-btn');
});

afterEach(cleanup);

describe('Logout Button', () => {
    it('Should render', () => {
        expect(logoutButton).toBeInTheDocument();
    });

    it('Should have an innerHTML equal to "Sign Out"', () => {
        expect(logoutButton.innerHTML).toEqual("Sign Out");
    });

    // it('Should sign out the logged in user on click', () => {
    //     act(() => click(logoutButton));

    //     expect();
    // })
});