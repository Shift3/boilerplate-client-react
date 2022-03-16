import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { render, screen } from '@testing-library/react';
import { FormServerError } from './FormServerError';

describe('FormServerError', () => {
  describe('error property is of type string', () => {

    const submissionError: FetchBaseQueryError = { status: 404, data: { statusCode: 404, error: 'Not Found', message: 'Cannot assign the new email to user with id' } };

    beforeEach(() => {
      render(
        <FormServerError fieldName='email' serverError={submissionError} />
      );
    });

    it('should render the error message', () => {
        const errorMsg = screen.queryByRole('alert');
        expect(errorMsg).toBeInTheDocument();
    });
  });

  describe('error property is an object with ErrorIndexType\'s signature', () => {

    const submissionError: FetchBaseQueryError = { status: 400, data: { statusCode: 400, error: { 'email': ['must be unique'] }, message: 'Bad Request' } };

    beforeEach(() => {
      render(
        <FormServerError fieldName='email' serverError={submissionError} />
      );
    });

    it('should render the error message', () => {
        const errorMsg = screen.queryByRole('alert');
        expect(errorMsg).toBeInTheDocument();
    });
  });
});