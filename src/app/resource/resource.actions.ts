import {Action} from '@ngrx/store';
import {defined} from '../code/type.helpers';

interface AbstractResourceAction extends Action {
  resourceActionType: ResourceActionType;
}

export interface SimpleResourceAction extends AbstractResourceAction {
  resourceActionType: ResourceActionSimpleType;
}

export interface EditOnResourceAction<T = defined> extends AbstractResourceAction {
  resourceActionType: typeof EDIT_ON_RESOURCE_ACTION;
  editedResource: T;
}

export interface AddOnResourceAction<T = defined> extends AbstractResourceAction {
  resourceActionType: typeof ADD_ON_RESOURCE_ACTION;
  newResource: T;
}

export type ResourceAction<T = defined> = SimpleResourceAction | EditOnResourceAction<T> | AddOnResourceAction<T>;

export const REFRESH_RESOURCE_ACTION = 'REFRESH';
export const ADD_ON_RESOURCE_ACTION = 'ADD_ON';
export const ADD_OFF_RESOURCE_ACTION = 'ADD_OFF';
export const EDIT_ON_RESOURCE_ACTION = 'EDIT_ON';
export const EDIT_OFF_RESOURCE_ACTION = 'EDIT_OFF';
export const DELETE_RESOURCE_ACTION = 'DELETE';
export const INVALIDATE_RESOURCE_ACTION = 'INVALIDATE';

type ResourceActionSimpleType = typeof REFRESH_RESOURCE_ACTION |
  typeof DELETE_RESOURCE_ACTION | typeof INVALIDATE_RESOURCE_ACTION | typeof EDIT_OFF_RESOURCE_ACTION
  | typeof ADD_OFF_RESOURCE_ACTION;

type ResourceActionType = ResourceActionSimpleType | typeof EDIT_ON_RESOURCE_ACTION | typeof ADD_ON_RESOURCE_ACTION;

export function isResourceAction(action: Action): action is ResourceAction {
  return typeof (<ResourceAction>action).resourceActionType === 'string';
}
