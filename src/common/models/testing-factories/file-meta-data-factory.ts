import * as Faker from 'faker';
import { Factory } from 'fishery';
import { FileMetaData } from '../fileMetaData';

export const FileMetaDataFactory = Factory.define<FileMetaData>(({ sequence }) => {
  const url = Faker.internet.avatar();
  return {
    id: sequence,
    key: url,
    url: url
  }
});