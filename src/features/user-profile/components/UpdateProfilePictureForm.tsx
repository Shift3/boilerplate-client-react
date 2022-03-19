import { FC, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Constants } from 'utils/constants';
import { LoadingButton } from 'common/components/LoadingButton';
import WithUnsavedChangesPrompt from 'common/components/WithUnsavedChangesPrompt';

export type ProfilePictureFormData = {
  profilePicture: FileList | null;
};

type Props = {
  onSubmit: (data: ProfilePictureFormData) => void;
  defaultValues?: Partial<ProfilePictureFormData>;
};

const checkProfilePictureFormat = (value: FileList) => {
  if (value) {
    // This check is necessary when the form's state is reset after the form is submitted.
    return value.length !== 0 ? Constants.SUPPORTED_PROFILE_PICTURE_FORMATS.includes(value[0].type) : true;
  }
  return true;
};

const schema: yup.SchemaOf<ProfilePictureFormData> = yup.object().shape({
  profilePicture: yup
    .mixed()
    .notRequired()
    .test('fileFormat', Constants.errorMessages.VALID_PROFILE_PICTURE_FORMAT, value =>
      checkProfilePictureFormat(value),
    ),
});

export const UpdateProfilePictureForm: FC<Props> = ({ onSubmit, defaultValues }) => {
  const {
    formState: { errors, isValid, isDirty, isSubmitting, isSubmitted, isSubmitSuccessful },
    handleSubmit,
    register,
    trigger,
    reset,
  } = useForm<ProfilePictureFormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  });

  const [imgPreviewState, setImagePreview] = useState({
    src: '',
    alt: '',
  });

  useEffect(() => {
    trigger();
    if (isSubmitSuccessful) {
      reset({ profilePicture: null });
      setImagePreview({ src: '', alt: '' });
    }
  }, [trigger, reset, isSubmitSuccessful]);

  const handleImage = (e: React.BaseSyntheticEvent) => {
    if (e.target.files[0]) {
      setImagePreview({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
    } else if (e.target.files.length === 0) {
      setImagePreview({
        src: '',
        alt: '',
      });
    }
    e.target.blur();
  };

  return (
    <WithUnsavedChangesPrompt when={isDirty && !(isSubmitting || isSubmitted)}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className='d-flex flex-column'>
          {imgPreviewState.src !== '' ? (
            <img className='img-fluid img-thumbnail' src={imgPreviewState.src} alt={imgPreviewState.alt} />
          ) : null}
          <Form.Label htmlFor='profilePicture'>Photo</Form.Label>
          <Form.Control
            id='profilePicture'
            type='file'
            accept={Constants.SUPPORTED_PROFILE_PICTURE_FORMATS.join(',')}
            {...register('profilePicture')}
            onChange={handleImage}
            isInvalid={!!errors.profilePicture}
          />
          <Form.Control.Feedback type='invalid' role='alert'>
            {errors.profilePicture?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <LoadingButton
          className='mt-3'
          type='submit'
          as={Button}
          disabled={imgPreviewState.src === '' || !isValid}
          loading={isSubmitting}
        >
          Update
        </LoadingButton>
      </Form>
    </WithUnsavedChangesPrompt>
  );
};
