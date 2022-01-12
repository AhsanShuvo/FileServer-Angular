export interface IFilter {
  field_name: string;
  field_value: any;
}

export interface IAttributes {
  filter: IFilter[];
  name: string;
  subtype: string;
  request_ts: number;
}

export interface IRequestedReport {
  id: string;
  type: string;
  attributes: IAttributes;
}
