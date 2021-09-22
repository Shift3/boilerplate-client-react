import { yupResolver } from '@hookform/resolvers/yup';
import { Role, User } from 'common/models';
import { FC, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { StyledCancelButton, StyledFormButtonWrapper, StyledSubmitButton } from './styled';

export type FormData = Pick<User, 'email' | 'firstName' | 'lastName' | 'profilePicture' | 'role'>;

export interface Props {
  availableRoles: Role[];
  defaultValues?: FormData;
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required.'),
  lastName: yup.string().required('Last Name is required.'),
  email: yup.string().email().required('Email is required.'),
  role: yup.object().shape({
    roleName: yup.string().required('Role is required.'),
  }),
});

export const UserDetailForm: FC<Props> = ({
  availableRoles,
  defaultValues,
  submitButtonLabel = 'SUBMIT',
  cancelButtonLabel = 'CANCEL',
  onSubmit,
  onCancel,
}) => {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    setValue,
    trigger,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: defaultValues,
  });

  const watchRoleName = watch('role.roleName');

  // Trigger validation on first render.
  useEffect(() => {
    trigger();
  }, [trigger]);

  // Update role id in response to role select value changing.
  useEffect(() => {
    const role = availableRoles.find((role) => role.roleName === watchRoleName);

    if (role) {
      setValue('role.id', role?.id);
    }
  }, [watchRoleName, availableRoles, setValue]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId='create-user-form-first-name'>
        <Form.Label>First Name</Form.Label>
        <Form.Control type='text' {...register('firstName')} isInvalid={!!errors.firstName} />
        <Form.Control.Feedback type='invalid'>{errors.firstName?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control type='text' {...register('lastName')} isInvalid={!!errors.lastName} />
        <Form.Control.Feedback type='invalid'>{errors.lastName?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type='email' {...register('email')} isInvalid={!!errors.email} />
        <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Role</Form.Label>
        <Form.Control
          id='role'
          as='select'
          custom
          aria-label='Select User Role'
          {...register('role.roleName')}
          isInvalid={!!errors.role?.roleName}
        >
          {availableRoles.map((role) => (
            <option key={role.id} value={role.roleName}>
              {role.roleName}
            </option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type='invalid'>{errors.role?.roleName?.message}</Form.Control.Feedback>
      </Form.Group>
      <StyledFormButtonWrapper>
        <StyledCancelButton onClick={onCancel}>{cancelButtonLabel}</StyledCancelButton>
        <StyledSubmitButton type='submit' disabled={!isValid}>
          {submitButtonLabel}
        </StyledSubmitButton>
      </StyledFormButtonWrapper>
    </Form>
  );
};
