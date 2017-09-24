import {Resource} from './resource';
import {
  ADD_OFF_RESOURCE_ACTION,
  ADD_ON_RESOURCE_ACTION,
  DELETE_RESOURCE_ACTION,
  EDIT_OFF_RESOURCE_ACTION,
  EDIT_ON_RESOURCE_ACTION,
  INVALIDATE_RESOURCE_ACTION,
  REFRESH_RESOURCE_ACTION,
  ResourceAction,
} from './resource.actions';
import {isAsyncFetch} from '../async/async.actions';

export function reduceResource<T extends Resource>(state: T, action: ResourceAction): T {
  return Object.assign({}, state, {
    fetching: isAsyncFetch(action),
    editing: reduceEditing(state.editing, action),
    deleting: isAsyncFetch(action) && action.resourceActionType === DELETE_RESOURCE_ACTION,
    invalid: reduceInvalidate(state.invalid, action),
    refreshTime: reduceRefreshTime(state.refreshTime, action),
  });
}

function reduceRefreshTime(state: number | undefined, action: ResourceAction): number | undefined {
  return action.resourceActionType === REFRESH_RESOURCE_ACTION ? (new Date).getTime() : state;
}

function reduceInvalidate(state: boolean | undefined, action: ResourceAction): boolean | undefined {
  if (action.resourceActionType === INVALIDATE_RESOURCE_ACTION) {
    return true;
  } else if (action.resourceActionType === REFRESH_RESOURCE_ACTION) {
    return false;
  } else {
    return state;
  }
}

function reduceEditing(state: any, action: ResourceAction): any {
  if (action.resourceActionType === EDIT_ON_RESOURCE_ACTION) {
    return action.editedResource;
  } else if (action.resourceActionType === EDIT_OFF_RESOURCE_ACTION) {
    return null;
  } else {
    return state;
  }
}

export function reduceNewResources<T>(state: T, action: ResourceAction<T>): T {
  switch (action.resourceActionType) {
    case ADD_ON_RESOURCE_ACTION:
      return action.newResource;
    case ADD_OFF_RESOURCE_ACTION:
      return null;
    default:
      return state;
  }
}

