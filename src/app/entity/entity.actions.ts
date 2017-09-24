import {Action} from '@ngrx/store';

export interface EntityAction extends Action {
  entityId: string
}

export function isEntityAction(action: Action): action is EntityAction {
  return typeof (<EntityAction>action).entityId === 'string';
}
