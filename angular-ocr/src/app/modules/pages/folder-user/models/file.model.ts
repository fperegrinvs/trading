export interface FileModel {
  id: string;
  type: string;
  name: string;
  note: string;
  size: number;
  addtime: Date;
  state: number;
  modify: Date;
  docid: string;
  taskid: string;
  ocrdate: Date;
  ocrtime: number;
  deleted: boolean;
  page_count: number;
  folder: string;
  folderid: string;
  owner: number;
}
