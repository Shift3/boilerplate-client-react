import { Factory } from 'fishery';
import { Thumbnail } from '../thumbnail';
import { FileMetaDataFactory } from './file-meta-data-factory';

export const ThumbnailFactory = Factory.define<Thumbnail>(({ sequence }) => ({
  id: sequence,
  file: FileMetaDataFactory.build(),
  size: ['xs', 'sm'][Math.round(Math.random())],
}));
