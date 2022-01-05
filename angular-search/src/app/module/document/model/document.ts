import {DocumentHighlight} from "./document.highlight";

export interface Document {
  _id: string;
  _score: number;
  _source: any;
  highlight: DocumentHighlight
}
