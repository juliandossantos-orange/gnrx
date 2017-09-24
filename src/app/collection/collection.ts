import {Entity, Id} from '../entity/entity';
import {Dictionnary} from './dictionnary';

export interface Collection<T> {
  list: T[];
}

export interface EntityCollection<T extends Entity> extends Collection<T> {}

export interface NormalizedCollection<E extends Entity, C extends Ids> {
  entities: Dictionnary<E>;
  collection: C;
}

export interface Ids extends Collection<Id> {}

export interface PaginatedCollection<T> extends Collection<T> {
  pageNumber: number;
  pageSize: number;
  total: number;
}

export interface SelectableCollection<T> extends Collection<T> {
  selectedList: Ids;
}

export interface SortableCollection<T> extends Collection<T> {
  order: SortOrder[];
}

export interface Filters {
  [id: string]: any;
}

export interface SortOrder {
  id: string;
  descending: boolean;
}
