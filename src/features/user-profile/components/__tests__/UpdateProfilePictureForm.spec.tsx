import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UpdateProfilePictureForm } from '../UpdateProfilePictureForm';
import { ThemeProvider } from 'styled-components';
import light from 'themes/light';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createAppStore } from 'app/redux';
import { ServerValidationErrors } from 'common/models';

const mockOnSubmit = jest.fn();

describe('UpdateProfilePictureForm', () => {
  const file = new File(['test'], 'testpicture.png', { type: 'image/png' });
  global.URL.createObjectURL = jest.fn();

  beforeEach(async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={createAppStore()}>
            <ThemeProvider theme={light}>
              <UpdateProfilePictureForm onSubmit={mockOnSubmit} ServerValidationErrors={null} />
            </ThemeProvider>
          </Provider>
        </MemoryRouter>,
      );
    });
    mockOnSubmit.mockReset();
  });

  const getProfilePictureInput = () => screen.getByLabelText(/Photo/i) as HTMLInputElement;

  it('should submit form if profilePicture field is valid', async () => {
    const profilePictureInput = getProfilePictureInput();

    await act(async () => {
      await userEvent.upload(profilePictureInput, file);
    });

    await act(async () => userEvent.click(screen.getByRole('button', { name: 'Update' })));

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('should validate image upload', async () => {
    const profilePictureInput = getProfilePictureInput();

    await act(async () => {
      await userEvent.upload(profilePictureInput, file);
    });

    expect(profilePictureInput.files ? profilePictureInput.files[0] : null).toStrictEqual(file);
    expect(profilePictureInput.files ? profilePictureInput.files.item(0) : null).toStrictEqual(file);
    expect(profilePictureInput.files).toHaveLength(1);
  });

  it('should show alert when no file has been uploaded', async () => {
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: 'Update' }));
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
  });
});
