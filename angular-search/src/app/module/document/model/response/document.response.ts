import {Document} from "../document";

export interface DocumentResponse {
  isvalid: boolean;
  noofpage: number;
  total_row: number;
  page: number;
  pagesize: number;
  msg: string;
  warnmsg: string;
  hits: Document[];
}
