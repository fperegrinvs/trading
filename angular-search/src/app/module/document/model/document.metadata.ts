export interface DocumentMetadata {
  name: string;
  note: string;
  type: string;
  required: boolean;
}

export enum MetadataType {
  STRING = "string",
  DATE = "date",
  BASE64 = "base64"
}
