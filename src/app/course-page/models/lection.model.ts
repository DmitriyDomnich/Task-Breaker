import { CreationPreview } from './creation-preview.model';

export interface GeneralInfo {
  title: string;
  description?: string;
  topic: string | null;
}
export interface LectionModel extends GeneralInfo {
  editorData?: string;
  files?: CreationPreview[];
  links?: CreationPreview[];
}
