export interface DocumentMetadata {
  name: string;
  note?: string;
  type: string;
  required?: boolean;
  show_in_form?: boolean;
  show_in_detail?: boolean;
}

export enum MetadataType {
  STRING = "string",
  DATE = "date",
  BASE64 = "base64"
}
