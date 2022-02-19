import { render, screen } from '@testing-library/react';
import { FileMetaData, Image, User } from 'common/models';
import { UserFactory, FileMetaDataFactory } from 'common/models/testing-factories';
import { UserProfilePicture } from '../UserProfilePicture';

describe('with generated profile picture', () => {
  
    const testUser: User = UserFactory.build({ firstName: "Test", lastName: "User" });

    it('should have a http url for img tag\'s src attribute', () => {
        render(<UserProfilePicture user={testUser} size="xs" radius={32} />);

        const image: HTMLImageElement = screen.getByAltText('Test User');

        expect(image.src).toContain('http');
    });

    it('should have either a xs or sm thumbnail', () => {
        if (testUser.profilePicture)
            expect(['xs', 'sm'].includes(testUser.profilePicture.thumbnails[0].size)).toBeTruthy();
    })
});

describe('with provided profile picture', () => {

    const testFile: FileMetaData = FileMetaDataFactory.build();

    const testProfilePicture: Image = {
        id: 34,
        file: testFile,
        thumbnails: [ 
            { 
                id: 5,
                size: "lg",
                file: testFile
            },
            {
                id: 6,
                size: "sm",
                file: testFile
            }
        ]
    };

    const testUser = UserFactory.build({}, { associations: { profilePicture: testProfilePicture } });

    it('should have a lg thumbnail', () => {
        if (testUser.profilePicture)
            expect(testUser.profilePicture.thumbnails.filter(thumbnail => thumbnail.size === 'lg')[0].size).toBe('lg');
    }); 
})