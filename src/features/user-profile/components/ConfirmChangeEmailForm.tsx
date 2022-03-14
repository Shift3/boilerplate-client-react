import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { Constants } from 'utils/constants';
import { LoadingButton } from 'common/components/LoadingButton';

export type FormData = {
  verificationCode: number;
};

type Props = {
  onSubmit: (data: FormData) => void;
};

const schema: yup.SchemaOf<FormData> = yup.object().shape({
  verificationCode: yup
    .number()
    .transform(value => (!value ? 0 : value))
    .required(Constants.errorMessages.VERIFICATION_CODE_REQUIRED)
    .lessThan(1000000, Constants.errorMessages.VERIFICATION_CODE_LENGTH_MISMATCH)
    .moreThan(99999, Constants.errorMessages.VERIFICATION_CODE_LENGTH_MISMATCH),
});

export const ConfirmChangeEmailForm: FC<Props> = ({ onSubmit }) => {
  const {
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      verificationCode: ''
    },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Control
          autoFocus
          id='verificationCode'
          type='text'
          {...register('verificationCode')}
          isInvalid={!!errors.verificationCode}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.verificationCode?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <div className='d-grid gap-2 mt-3'>
        <LoadingButton as={Button} disabled={!isValid} loading={isSubmitting}>
          Change my Email
        </LoadingButton>
      </div>
    </Form>
  );
};
