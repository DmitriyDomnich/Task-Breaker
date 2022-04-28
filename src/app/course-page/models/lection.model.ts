import { CreationPreview } from './creation-preview.model';

export interface Topic {
  id: string;
  name: string;
}

export interface GeneralInfo {
  id?: string;
  title: string;
  description?: string;
  topic: Topic | null;
  published?: Date;
}
export interface LectionModel extends GeneralInfo {
  editorData?: string;
  files?: CreationPreview[];
  links?: CreationPreview[] | [];
}
