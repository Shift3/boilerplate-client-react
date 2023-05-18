import { FC } from 'react';
import { User, Thumbnail } from 'common/models';
import portraitPlaceholder from 'assets/img/portrait_placeholder.png';
import { CircularImg } from 'common/styles/utilities';
import { useTranslation } from 'react-i18next';

type Props = {
  user: User | null;
  size: string;
  radius: number;
};

const getUserThumbnailOfSize = (user: User, size: string) => {
  if (user.profilePicture) {
    const assocThumbnails = user.profilePicture.thumbnails.filter((thumbnail: Thumbnail) => thumbnail.size === size);
    if (assocThumbnails.length !== 0) {
      return assocThumbnails[0].file.url;
    }
    return user.profilePicture.file.url;
  }

  return portraitPlaceholder;
};

export const UserProfileImg: FC<{ user: User; size: string }> = ({ user, size }) => {
  const { t } = useTranslation('common');
  const fullName = user ? `${user.firstName} ${user.lastName}` : t('user');
  const imageSource = getUserThumbnailOfSize(user, size);

  return <img alt={fullName} src={imageSource} />;
};

export const UserProfilePicture: FC<Props> = ({ user, size, radius }) => {
  const { t } = useTranslation('common');
  const fullName = user ? `${user.firstName} ${user.lastName}` : t('user');
  const imageSource = getUserThumbnailOfSize(user!, size);

  return <CircularImg radius={radius} src={imageSource} alt={fullName} />;
};
