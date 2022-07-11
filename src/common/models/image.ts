import { FileMetaData } from './fileMetaData';
import { Thumbnail } from './thumbnail';

export interface Image {
  id: number;
  file: FileMetaData;
  thumbnails: Thumbnail[];
}
