import { FC } from 'react';
import { User, Thumbnail } from 'common/models';
import portraitPlaceholder from 'assets/img/portrait_placeholder.png';
import { CircularImg } from 'common/styles/utilities';

type Props = {
  user: User | null;
  size: string;
  radius: number;
};

export const UserProfilePicture: FC<Props> = ({ user, size, radius }) => {
  let imageSource = '';
  const fullName = user ? `${user.firstName} ${user.lastName}` : 'User';

  if (user && user.profilePicture) {
    const assocThumbnails = user.profilePicture.thumbnails.filter((thumbnail: Thumbnail) => thumbnail.size === size);
    if (assocThumbnails.length !== 0) {
      imageSource = assocThumbnails[0].file.url;
    } else {
      imageSource = user.profilePicture.file.url;
    }
  } else {
    imageSource = portraitPlaceholder;
  }

  return <CircularImg radius={radius} src={imageSource} alt={fullName} />;
};
