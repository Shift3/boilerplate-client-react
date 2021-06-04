import { render} from '@testing-library/react';
import { Logout } from '..';
import { expectInDocByRole, expectInnerHTMLByRole } from '../../../utils/test';

describe('Logout Button', () => {
    beforeEach(() => render(<Logout />));

    it('Should render', () => 
        expectInDocByRole('button'))

    it('Should have an innerHTML equal to "Sign Out"', () => 
        expectInnerHTMLByRole('button', 'Sign Out'));

    // it('Should sign out the logged in user on click', () => {
    //     act(() => click(logoutButton));

    //     expect();
    // })
});