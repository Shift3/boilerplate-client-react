import { FC, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Constants } from 'utils/constants';
import { LoadingButton } from 'common/components/LoadingButton';
import FormPrompt from 'common/components/FormPrompt';

export type ProfilePhotoFormData = {
  profilePicture: FileList | null;
};

type Props = {
  onSubmit: (data: ProfilePhotoFormData) => void;
  defaultValues?: Partial<ProfilePhotoFormData>;
};

const checkProfilePhotoFormat = (value: FileList) => value.length !== 0 ? Constants.SUPPORTED_PROFILE_PHOTO_FORMATS.includes(value[0].type) : true;

const schema: yup.SchemaOf<ProfilePhotoFormData> = yup.object().shape({
  profilePicture: yup.mixed().notRequired().test('fileFormat', Constants.errorMessages.VALID_PROFILE_PHOTO_FORMAT, value => checkProfilePhotoFormat(value))
});

export const UpdateProfilePhotoForm: FC<Props> = ({ onSubmit, defaultValues }) => {
  const {
    formState: { errors, isValid, isDirty, isSubmitting },
    handleSubmit,
    register,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  });

  const [imgPreviewState, setImagePreview] = useState({
    src: '',
    alt: ''
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const handleImage = (e: React.BaseSyntheticEvent) => {
    if (e.target.files[0]) {
      setImagePreview({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name
      });
    } else if (e.target.files.length === 0) {
      setImagePreview({
        src: '',
        alt: ''
      })
    }
    e.target.blur();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className='d-flex flex-column'>
        {imgPreviewState.src !== '' ?
          <img className='img-fluid img-thumbnail' src={imgPreviewState.src} alt={imgPreviewState.alt} /> :
          null
        }
        <Form.Label htmlFor='profilePicture'>Photo</Form.Label>
        <Form.Control id="profilePicture" type="file" accept={Constants.SUPPORTED_PROFILE_PHOTO_FORMATS.join(',')}  {...register('profilePicture')} onChange={handleImage} isInvalid={!!errors.profilePicture} />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.profilePicture?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <LoadingButton className="mt-3" type='submit' as={Button} disabled={imgPreviewState.src === '' || !isValid}  loading={isSubmitting}>
        Update
      </LoadingButton>
      <FormPrompt isDirty={isDirty} isSubmitting={isSubmitting} />
    </Form>
  );
};