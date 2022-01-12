export interface IFilter {
  start_ts: number;
  end_ts: string;
}

export interface IAttributes {
  name: string;
  request_ts: number;
  subtype: string;
  filter: IFilter;
}

export interface IReportSpec {
  id: string;
  type: string;
  attributes: IAttributes;
}