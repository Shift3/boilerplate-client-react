import { FC } from 'react';
import Form from 'react-bootstrap/Form';

export const CreateAgencyForm: FC = () => {
  return (
    <Form>
      <Form.Group controlId='create-agency-form-agency-name'>
        <Form.Label>Agency Name</Form.Label>
        <Form.Control type='text' isInvalid />
        <Form.Control.Feedback type='invalid'>Agency Name is required.</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};
