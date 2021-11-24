import {DocumentHighlight} from "./document.highlight";

export interface Document {
  _id: number;
  _score: number;
  _source: any;
  highlight: DocumentHighlight
}
