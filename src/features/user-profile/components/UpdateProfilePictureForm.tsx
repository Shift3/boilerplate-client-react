import React, { FC, useEffect, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Constants } from 'utils/constants';
import { User } from 'common/models';
import { UserProfilePicture } from 'features/navbar/components/UserProfilePicture';
import styled from 'styled-components';
import { OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { LoadingSpinner } from 'common/components/LoadingSpinner';
import { showErrorMessage } from 'common/services/notification';

const UserProfilePictureContainer = styled.div`
  position: relative;
  display: inline-block;

  svg {
    position: absolute;
    top: 38%;
    left: 28%;
  }
`;

const StyledTooltip = styled(Tooltip)`
  .tooltip-inner {
    background-color: ${props => props.theme.buttons.tooltipBackgroundColor};
    color: ${props => props.theme.buttons.tooltipTextColor};
  }
  .tooltip-arrow::before {
    border-bottom-color: ${props => props.theme.buttons.tooltipBackgroundColor};
  }
`;

const StyledLoadingSpinner = styled.div`
  position: absolute;
  padding: 0.25rem;
  text-align: center;
  height: 100%;

  #loading-spinner {
    width: 3.5em;
    height: 3.5em;
  }
`;

export type ProfilePictureFormData = {
  profilePicture: FileList | null;
};

type Props = {
  user: User | null;
  onSubmit: (data: ProfilePictureFormData) => void;
  defaultValues?: Partial<ProfilePictureFormData>;
};

const checkIfSupportedFormat = (type: string) => Constants.SUPPORTED_PROFILE_PICTURE_FORMATS.includes(type);

const checkProfilePictureFormat = (value: FileList) => {
  if (value) {
    // This check is necessary when the form's state is reset after the form is submitted.
    return value.length !== 0 ? checkIfSupportedFormat(value[0].type) : true;
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

export const UpdateProfilePictureForm: FC<Props> = ({ user, onSubmit, defaultValues }) => {
  const {
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    register,
    trigger,
    reset,
    setValue,
  } = useForm<ProfilePictureFormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const isProfilePictureUpdating = useRef(false);

  useEffect(() => {
    if (isProfilePictureUpdating.current) {
      isProfilePictureUpdating.current = false;
    }
  }, [user]);

  useEffect(() => {
    trigger();
    if (isSubmitSuccessful) {
      reset({ profilePicture: null });
    }
  }, [trigger, reset, isSubmitSuccessful]);

  const handleImage = (e: React.BaseSyntheticEvent) => {
    const fileList = e.target.files;

    setValue('profilePicture', fileList ?? null, { shouldValidate: true });

    if (fileList && fileList.length > 0) {
      if (checkIfSupportedFormat(fileList[0].type)) {
        isProfilePictureUpdating.current = true;
        handleSubmit(onSubmit)();
      } else {
        e.target.value = '';
        showErrorMessage(Constants.errorMessages.VALID_PROFILE_PICTURE_FORMAT);
      }
    }

    e.target.blur();
  };

  const handleUpload = () => {
    inputRef.current?.click();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className='d-flex flex-column'>
        <Form.Control
          className='d-none'
          id='profilePicture'
          type='file'
          accept={Constants.SUPPORTED_PROFILE_PICTURE_FORMATS.join(',')}
          {...register('profilePicture')}
          ref={inputRef}
          onChange={handleImage}
          isInvalid={!!errors.profilePicture}
          role='dialog'
        />
        <UserProfilePictureContainer>
          {isProfilePictureUpdating.current ? (
            <StyledLoadingSpinner>
              <LoadingSpinner />
            </StyledLoadingSpinner>
          ) : (
            <OverlayTrigger
              placement='bottom'
              overlay={<StyledTooltip id='tooltip-bottom'>Upload Photo</StyledTooltip>}
            >
              <FontAwesomeIcon
                role='button'
                onClick={() => handleUpload()}
                icon={faCamera}
                color={user?.profilePicture ? 'white' : 'black'}
                size='lg'
              />
            </OverlayTrigger>
          )}
          <UserProfilePicture user={user} size='sm' radius={64} />
        </UserProfilePictureContainer>
      </Form.Group>
    </Form>
  );
};
