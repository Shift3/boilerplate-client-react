import { FileMetaData } from './fileMetaData';

export interface Thumbnail {
  id: number;
  file: FileMetaData;
  size: string;
}
