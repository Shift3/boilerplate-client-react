import { Factory } from 'fishery';
import { Image } from '../image';
import { FileMetaDataFactory } from './fileMetaData-factory';
import { ThumbnailFactory } from './thumbnail-factory';

export const ImageFactory = Factory.define<Image>(({ sequence }) => ({
  id: sequence,
  file: FileMetaDataFactory.build(),
  thumbnails: [ThumbnailFactory.build(), ThumbnailFactory.build()]
}));