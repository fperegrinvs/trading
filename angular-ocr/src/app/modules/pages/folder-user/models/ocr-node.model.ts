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
  haschild?: boolean;
  folderState?: any;
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
  ocring?: Ocring;
  ocr?: any;
}

export interface FolderState {
  numberFileOcring: number;
  numberFileNew: number;
  numberFileDoneOcring: number;
  numberFileNotOcr: number;
}

export interface Ocring {
  current: number;
  data: string[];
  'detect-lines-time': number;
  percent: number;
  total: number;
  error: string;
}
