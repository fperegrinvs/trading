export interface TableColumn {
  id: string;
  text: string;
  headerAlign: TableAlignment;
  cellAlign: TableAlignment;
  sortable?: boolean;
  active: boolean;
  bold?: boolean
  clickFn?: Function
}

export enum TableAlignment {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right"
}
