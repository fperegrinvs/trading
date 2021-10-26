export class OcrNodeModel {
  id: string;
  name: string;
  note: string;
  addtime: Date;
  deleted: boolean;
  modify: Date;
  parent: string;
  parentid: string;
  type: string;
  owner: number;
  childs: any[];
  size: number;
  constructor() {
    this.id = '';
    this.name = '';
    this.note = '';
    this.addtime = new Date();
    this.deleted = false;
    this.modify = new Date();
    this.parent = '';
    this.parentid = '';
    this.type = '';
    this.owner = 0;
    this.childs = [];
    this.size = 0;
  }
}
