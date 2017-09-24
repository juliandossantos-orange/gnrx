export interface Resource<E=any> {
  editing?: E;
  deleting?: boolean;
  fetching?: boolean;
  invalid?: boolean;
  refreshTime?: number;
}
