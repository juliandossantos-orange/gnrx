import {Ids, NormalizedCollection} from './collection';
import {Entity, selectId} from '../entity/entity';
import {Action} from '@ngrx/store';
import {isCollectionAction} from './collection.actions';
import {isEntityAction} from '../entity/entity.actions';

export function reduceCollection<T extends Entity, E extends Entity, L extends Ids>
(reduceItem: (state: E | undefined, action: Action, current: T) => E,
 reduceEntity: (state: E, action: Action) => E) {
  return function (state: NormalizedCollection<E, L>, action: Action): NormalizedCollection<E, L> {
    if (isCollectionAction(action)) {
      return action.collection.list.reduce((normalizedCollection, item) => {
        const id = selectId(item);
        return Object.assign({}, normalizedCollection, {
          entities: Object.assign({}, normalizedCollection.entities, {
            [id]: reduceEntity(reduceItem(state.entities[id], action, item as T), action),
          }),
          collection: Object.assign({}, normalizedCollection.collection, {
            list: [...normalizedCollection.collection.list, id],
          }),
        });
      }, Object.assign({}, state, {
        entities: state.entities,
        collection: Object.assign({}, state.collection, {
          list: [] as string[],
        }),
      }));
    } else if (isEntityAction(action)) {
      const entity = state.entities[action.entityId];
      if (entity) {
        return Object.assign({}, state, {
          entities: Object.assign({}, state.entities, {
            [action.entityId]: reduceEntity(entity, action),
          }),
        });
      } else {
        return state;
      }
    } else {
      return state;
    }
  };
}

// TODO Combine collection reducer
