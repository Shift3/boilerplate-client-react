import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createAppStore } from 'app/redux';
import { ModalProvider } from 'react-modal-hook';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import light from 'themes/light';
import { UpdateProfilePictureForm } from '../UpdateProfilePictureForm';

const mockOnSubmit = jest.fn();

describe('UpdateProfilePictureForm', () => {
  const file = new File(['test'], 'testpicture.png', { type: 'image/png' });
  global.URL.createObjectURL = jest.fn();

  beforeEach(async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={createAppStore()}>
            <ModalProvider>
              <ThemeProvider theme={light}>
                <UpdateProfilePictureForm onSubmit={mockOnSubmit} />
              </ThemeProvider>
            </ModalProvider>
          </Provider>
        </MemoryRouter>,
      );
    });
    mockOnSubmit.mockReset();
  });

  const getProfilePictureInput = () => screen.getByLabelText(/Photo/i) as HTMLInputElement;

  it('should submit form if profilePicture field is valid', async () => {
    const profilePictureInput = getProfilePictureInput();
    await userEvent.upload(profilePictureInput, file);
    await userEvent.click(screen.getByRole('button', { name: 'Update' }));

    waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it('should validate image upload', async () => {
    const profilePictureInput = getProfilePictureInput();

    await userEvent.upload(profilePictureInput, file);

    expect(profilePictureInput.files ? profilePictureInput.files[0] : null).toStrictEqual(file);
    expect(profilePictureInput.files ? profilePictureInput.files.item(0) : null).toStrictEqual(file);
    expect(profilePictureInput.files).toHaveLength(1);
  });

  it('should show alert when no file has been uploaded', async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Update' }));

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
  });
});
