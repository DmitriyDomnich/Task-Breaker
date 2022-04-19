import { CreationPreview } from './creation-preview.model';

export interface Topic {
  id: string;
  name: string;
}

export interface GeneralInfo {
  title: string;
  description?: string;
  topic: Topic | null;
}
export interface LectionModel extends GeneralInfo {
  editorData?: string;
  files?: CreationPreview[];
  links?: CreationPreview[] | [];
}
