export interface IValue {
  id?: string;
  value: string;
  display: string;
}
  
export interface IAttributes {
  display_name: string;
  values: IValue[];
}

export interface IGeoInterfaces {
  id: string;
  type: string;
  attributes: IAttributes;
}

export interface ICountryList extends IGeoInterfaces {}

export interface IStates extends IGeoInterfaces {}
  