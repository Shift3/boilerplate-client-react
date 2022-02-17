import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UpdateProfilePhotoForm } from '../UpdateProfilePhotoForm';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const mockOnSubmit = jest.fn();

describe('UpdateProfilePhotoForm', () => {

  const file = new File(["test"], "testpicture.png", { type: "image/png" });
  global.URL.createObjectURL = jest.fn();

  beforeEach(async () => {
    const history = createMemoryHistory();
    await act(async () => {
      render(
        <Router history={history}>
          <ThemeProvider theme={AppTheme}>
            <UpdateProfilePhotoForm onSubmit={mockOnSubmit} />
          </ThemeProvider>,
        </Router>
      );
    });
    mockOnSubmit.mockReset();
  });

  const getProfilePictureInput = () => screen.getByLabelText(/Photo/i) as HTMLInputElement;

  it('should submit form if profilePicture field is valid', async () => {
    const profilePictureInput = getProfilePictureInput();

    await act(async () => {
        userEvent.upload(profilePictureInput, file);
    });

    await act(async () => userEvent.click(screen.getByRole('button', { name: 'Update' })));

    expect(mockOnSubmit).toHaveBeenCalledWith({ profilePicture: profilePictureInput.files }, expect.any(Object));
  });

  it('should validate image upload', async () => {
    const profilePictureInput = getProfilePictureInput();

    await act(async () => {
        userEvent.upload(profilePictureInput, file);
    });

    expect(profilePictureInput.files ? profilePictureInput.files[0] : null).toStrictEqual(file);
    expect(profilePictureInput.files ? profilePictureInput.files.item(0) : null).toStrictEqual(file);
    expect(profilePictureInput.files).toHaveLength(1);
  });

  it('should show alert when no file has been uploaded', async () => {
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Update' }));
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
  });
});
