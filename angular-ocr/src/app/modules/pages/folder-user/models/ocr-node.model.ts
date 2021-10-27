export interface OcrNodeModel {
  id: string;
  name: string;
  note: string;
  addtime: Date;
  deleted: boolean;
  modify: Date;
  type: string;
  owner: number;
  level?: number;
  // type just folder
  parent?: string;
  parentid?: string;
  childs?: any[];
  isOpen?: boolean;
  // type just file
  size?: number;
  state?: number;
  docid?: string;
  taskid?: string;
  ocrdate?: Date;
  ocrtime?: number;
  page_count?: number;
  folder?: string;
  folderid?: string;
}
