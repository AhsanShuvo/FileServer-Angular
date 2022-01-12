export interface IAttributes {
  field_name: string;
  field_display: string;
  filter_type: string;
  values: string[];
}

export interface IReportFilterList {
  id: string;
  type: string;
  attributes: IAttributes;
}