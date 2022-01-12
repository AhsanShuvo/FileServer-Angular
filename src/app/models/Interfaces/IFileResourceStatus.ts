export interface IAttributes {
  accepted_ts: number;
  created_by_username: string;
  error_ts?: any;
  processed_ts: number;
  size: number;
  status: string;
}
  
export interface IFileResourceStatus {
  id: string;
  type: string;
  attributes: IAttributes;
}

  