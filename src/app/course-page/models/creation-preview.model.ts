export interface CreationPreview {
  id: string;
  title?: string;
  info: string;
  previewUrl: string;
  url?: string;
  previewType: 'file' | 'link';
  file?: File;
}
