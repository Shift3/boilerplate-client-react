import { yupResolver } from '@hookform/resolvers/yup';
import { Agency, Role, User } from 'common/models';
import { FC, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { CancelButton, ButtonWrapper, SubmitButton } from 'features/styles/PageStyles';

export type FormData = Pick<User, 'email' | 'firstName' | 'lastName' | 'profilePicture' | 'role' | 'agency'>;

export interface Props {
  availableRoles: Role[];
  availableAgencies: Agency[];
  defaultValues?: Partial<FormData>;
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
  agency: yup.object().shape({
    agencyName: yup.string().required('Agency is required.'),
  }),
});

export const UserDetailForm: FC<Props> = ({
  availableRoles,
  availableAgencies,
  defaultValues = {},
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
    defaultValues: {
      ...defaultValues,
      // Make dropdowns default to empty instead of first option if no valid default passed.
      role: {
        roleName: defaultValues?.role?.roleName ?? '',
      },
      agency: {
        agencyName: defaultValues?.agency?.agencyName ?? '',
      },
    },
  });

  const watchRoleName = watch('role.roleName');
  const watchAgencyName = watch('agency.agencyName');

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

  // Update agency id in response to agency select value changing.
  useEffect(() => {
    const agency = availableAgencies.find((agency) => agency.agencyName === watchAgencyName);

    if (agency) {
      setValue('agency.id', agency?.id);
    }
  }, [watchAgencyName, availableAgencies, setValue]);

  return (
    <Form name='create-user-form' onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId='create-user-form-first-name'>
        <Form.Label>First Name</Form.Label>
        <Form.Control type='text' {...register('firstName')} isInvalid={!!errors.firstName} />
        <Form.Control.Feedback type='invalid'>{errors.firstName?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId='create-user-form-last-name'>
        <Form.Label>Last Name</Form.Label>
        <Form.Control type='text' {...register('lastName')} isInvalid={!!errors.lastName} />
        <Form.Control.Feedback type='invalid'>{errors.lastName?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId='create-user-form-email'>
        <Form.Label>Email</Form.Label>
        <Form.Control type='email' {...register('email')} isInvalid={!!errors.email} />
        <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId='create-user-form-role'>
        <Form.Label>Role</Form.Label>
        <Form.Select id='role' aria-label='Role' {...register('role.roleName')} isInvalid={!!errors.role?.roleName}>
          <option value='' disabled hidden>
            Select a role
          </option>
          {availableRoles.map((role) => (
            <option key={role.id} value={role.roleName}>
              {role.roleName}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type='invalid'>{errors.role?.roleName?.message}</Form.Control.Feedback>
      </Form.Group>
      {availableAgencies.length > 0 && (
        <Form.Group>
          <Form.Label>Agency</Form.Label>
          <Form.Select
            id='agency'
            aria-label='Select User Agency'
            {...register('agency.agencyName')}
            isInvalid={!!errors.agency?.agencyName}
          >
            <option value='' disabled hidden>
              Select an agency
            </option>

            {availableAgencies.map((agency) => (
              <option key={agency.id} value={agency.agencyName}>
                {agency.agencyName}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type='invalid'>{errors.agency?.agencyName?.message}</Form.Control.Feedback>
        </Form.Group>
      )}
      <ButtonWrapper>
        <CancelButton onClick={onCancel}>{cancelButtonLabel}</CancelButton>
        <SubmitButton type='submit' disabled={!isValid}>
          {submitButtonLabel}
        </SubmitButton>
      </ButtonWrapper>
    </Form>
  );
};
