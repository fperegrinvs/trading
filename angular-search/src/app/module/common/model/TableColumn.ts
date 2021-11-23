export interface TableColumn {
  id: string;
  text: string;
  headerAlign: TableAlignment;
  cellAlign: TableAlignment;
  sortable?: boolean;
  active: boolean;
  bold?: boolean
}

export enum TableAlignment {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right"
}
