import { Factory } from 'fishery';
import { Thumbnail } from '../thumbnail';
import { FileMetaDataFactory } from './fileMetaData-factory';

export const ThumbnailFactory = Factory.define<Thumbnail>(({ sequence }) => ({
  id: sequence,
  file: FileMetaDataFactory.build(),
  size: ['xs', 'sm'][Math.round((Math.random()))]
}));