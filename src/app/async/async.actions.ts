import {Action} from '@ngrx/store';

export const CLEAR_ASYNC_ACTION = '[Async] Clear';

export interface AsyncAction extends Action {
  phase: AsyncPhase;
  id?: AsyncId;
}

export class ClearAction implements Action {
  readonly type = CLEAR_ASYNC_ACTION;
}

export type AsyncActions = AsyncAction | ClearAction;

export const FETCH_PHASE = '[Async] Fetch';
export const COMPLETE_PHASE = '[Async] Complete';
export const ERROR_PHASE = '[Async] Error';

export type AsyncPhase = typeof FETCH_PHASE | typeof COMPLETE_PHASE| typeof ERROR_PHASE;
export type AsyncId = string[] | string;

export function isAsyncAction(action: Action): action is AsyncAction {
  return (<AsyncAction>action).phase !== undefined;
}

export function isAsyncFetch(action: Action): action is AsyncAction {
  return (<AsyncAction>action).phase === FETCH_PHASE;
}

export function isAsyncComplete(action: Action): action is AsyncAction {
  return (<AsyncAction>action).phase === COMPLETE_PHASE;
}

export function isAsyncError(action: Action): action is AsyncAction {
  return (<AsyncAction>action).phase === ERROR_PHASE;
}
