import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AgencyDetailForm } from '../AgencyDetailForm';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

describe('AgencyDetailForm', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <ThemeProvider theme={AppTheme}>
          <AgencyDetailForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
        </ThemeProvider>,
      );
      mockOnSubmit.mockReset();
    });
  });

  it('should render form fields', () => {
    expect(screen.getByLabelText(/Agency Name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'CANCEL' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'SUBMIT' })).toBeInTheDocument();
  });

  it('should submit form if all form fields are valid', async () => {
    const testFormData = {
      agencyName: 'New Agency',
    };
    await act(async () => {
      const agencyNameInput = screen.getByLabelText(/Agency Name/i);
      userEvent.type(agencyNameInput, testFormData.agencyName);
    });

    await act(async () => userEvent.click(screen.getByRole('button', { name: 'SUBMIT' })));

    expect(mockOnSubmit).toHaveBeenCalledWith(testFormData, expect.any(Object));
  });

  it('should validate user inputs and provide error messages', async () => {
    const agencyNameInput = screen.getByLabelText(/Agency Name/i);
    userEvent.type(agencyNameInput, '1@!');

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'SUBMIT' }));
    });

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
  });
});
