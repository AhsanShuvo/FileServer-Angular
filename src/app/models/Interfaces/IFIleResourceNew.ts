export interface IAttributes {
  accepted_ts: number;
  status: string;
}
  
export interface IFileResourceNew {
  id: string;
  type: string;
  attributes: IAttributes;
}
  