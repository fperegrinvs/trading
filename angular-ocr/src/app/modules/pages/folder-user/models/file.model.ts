export class FileModel {
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

  constructor() {
    this.id = '';
    this.type = '';
    this.name = '';
    this.size = 0;
    this.addtime = new Date();
    this.state = 0;
    this.modify = undefined;
    this.docid = '';
    this.taskid = '';
    this.ocrdate = undefined;
    this.deleted = false;
    this.page_count = 0;
    this.folder = '';
    this.folderid = '';
    this.owner = 0;
  }
}
