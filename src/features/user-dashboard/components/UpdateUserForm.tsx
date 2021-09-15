import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { StyledCancelButton, StyledFormButtonWrapper, StyledSubmitButton } from './styled';
import { Role } from 'common/models/role';
import { Agency } from 'common/models/agency';

export interface UpdateUserFormData {
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  roleName: string;
  agencyName: string;
}
export interface UpdateUserFormProps {
  defaultValues: UpdateUserFormData;
  onCancel: () => void;
  onSubmit: (data: UpdateUserFormData) => void;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required.'),
  lastName: yup.string().required('Last Name is required.'),
  email: yup.string().email().required('Email is required.'),
  roleName: yup.string().required('Role is required.'),
  agencyName: yup.string().required('Agency is required.'),
});

export const UpdateUserForm: FC<UpdateUserFormProps> = ({ defaultValues, roles, agencies, onCancel, onSubmit }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    trigger,
  } = useForm<UpdateUserFormData>({ resolver: yupResolver(schema), mode: 'all' });

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId='update-user-form-first-name'>
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type='text'
          defaultValue={defaultValues.firstName}
          {...register('firstName')}
          isInvalid={!!errors.firstName}
        />
        <Form.Control.Feedback type='invalid'>{errors.firstName?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type='text'
          defaultValue={defaultValues.lastName}
          {...register('lastName')}
          isInvalid={!!errors.lastName}
        />
        <Form.Control.Feedback type='invalid'>{errors.lastName?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          defaultValue={defaultValues.email}
          {...register('email')}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Role</Form.Label>
        <Form.Control
          id='role'
          as='select'
          defaultValue={defaultValues.roleName}
          custom
          aria-label='Select User Role'
          {...register('roleName')}
          isInvalid={!!errors.roleName}
        >
          {roles.map((role: Role) => (
            <option key={role.id} value={role.roleName}>
              {role.roleName}
            </option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type='invalid'>{errors.roleName?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Agency</Form.Label>
        <Form.Control
          id='agency'
          as='select'
          defaultValue={defaultValues.agencyName}
          custom
          aria-label='Select User Agency'
          {...register('agencyName')}
          isInvalid={!!errors.agencyName}
        >
          {agencies.map((agency: Agency) => (
            <option key={agency.id} value={agency.agencyName}>
              {agency.agencyName}
            </option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type='invalid'> {errors.agencyName?.message}</Form.Control.Feedback>
      </Form.Group>
      <StyledFormButtonWrapper>
        <StyledCancelButton onClick={onCancel}>CANCEL</StyledCancelButton>
        <StyledSubmitButton type='submit' disabled={!isValid}>
          SUBMIT
        </StyledSubmitButton>
      </StyledFormButtonWrapper>
    </Form>
  );
};
