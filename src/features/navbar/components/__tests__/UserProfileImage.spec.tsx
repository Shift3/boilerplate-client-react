import { render, screen } from '@testing-library/react';
import { FileMetaData, Image, User } from 'common/models';
import { UserFactory, FileMetaDataFactory } from 'common/models/testing-factories';
import { UserProfilePicture } from '../UserProfilePicture';

describe('with generated profile picture', () => {
  const testUser: User = UserFactory.build(
    { firstName: 'Test', lastName: 'User' },
    { transient: { hasProfilePicture: true } },
  );

  it("should have a http url for img tag's src attribute", () => {
    render(<UserProfilePicture user={testUser} size='xs' radius={32} />);

    const image: HTMLImageElement = screen.getByAltText('Test User');

    expect(image.src).toContain('http');
  });

  it('should have either a xs or sm thumbnail', () => {
    if (testUser.profilePicture) {
      expect(['xs', 'sm'].includes(testUser.profilePicture.thumbnails[0].size)).toBeTruthy();
    } else {
      fail("profilePicture shouldn't be null");
    }
  });
});

describe('with provided profile picture', () => {
  const testFile: FileMetaData = FileMetaDataFactory.build();

  const testProfilePicture: Image = {
    id: 34,
    file: testFile,
    thumbnails: [
      {
        id: 5,
        size: 'lg',
        file: testFile,
      },
      {
        id: 6,
        size: 'sm',
        file: testFile,
      },
    ],
  };

  // Important: Associations will also take precedence over transient params. So, setting hasProfilePicture to false here won't cause this test to fail. Try providing a firstName association here. That value will bypass the code in the UserFactory.
  const testUser = UserFactory.build(
    {},
    { transient: { hasProfilePicture: false }, associations: { profilePicture: testProfilePicture } },
  );

  it('should have a lg thumbnail', () => {
    if (testUser.profilePicture) {
      expect(testUser.profilePicture.thumbnails.filter(thumbnail => thumbnail.size === 'lg')[0].size).toBe('lg');
    } else {
      fail("profilePicture shouldn't be null");
    }
  });
});

describe('no profile picture', () => {
  const testUser = UserFactory.build({}, { transient: { hasProfilePicture: false } });

  it('should have a null profilePicture', () => {
    if (!testUser.profilePicture) {
      expect(testUser.profilePicture).toBeNull();
    } else {
      fail('profilePicture should be null');
    }
  });
});
