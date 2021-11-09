export interface TableColumn {
  id: string;
  text: string;
  headerAlign: TableAlignment;
  cellAlign: TableAlignment;
  sortable?: boolean;
}

export enum TableAlignment {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right"
}
