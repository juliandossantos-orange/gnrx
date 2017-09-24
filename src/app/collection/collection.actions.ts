import {EntityCollection} from './collection';
import {Action} from '@ngrx/store';
import {Entity} from '../entity/entity';

export interface CollectionAction<E extends Entity, C extends EntityCollection<E>> extends Action {
  collection: C;
}

export function isCollectionAction(action: Action): action is CollectionAction<Entity, EntityCollection<Entity>> {
  return (<CollectionAction<Entity, EntityCollection<Entity>>>action).collection !== undefined;
}
