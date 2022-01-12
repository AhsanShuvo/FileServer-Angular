export interface IAttributes {
  first_name: string;
  last_name: string;
  email: string;
  create_timestamp: number;
  modified_timestamp: number;
  company: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  country: string;
  postal: number;
  fax: string;
  phone: string;
}

export interface IProfile {
  id: number;
  type: string;
  attributes: IAttributes;
}