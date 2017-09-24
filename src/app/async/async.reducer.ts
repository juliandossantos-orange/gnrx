import {
  AsyncAction, AsyncActions, AsyncPhase, CLEAR_ASYNC_ACTION, COMPLETE_PHASE, ERROR_PHASE, FETCH_PHASE,
  isAsyncAction,
} from './async.actions';
import {arrayOf} from '../code/function.helpers';

export interface AsyncState {
  [id: string]: AsyncStatePart;
}

export interface AsyncActionState {
  pending: boolean;
  complete: boolean;
  failed: boolean;
  terminated: boolean;
}

type AsyncStatePart = AsyncActionState | AsyncState;

export function reduceAsyncState(state: AsyncState = {}, action: AsyncActions): AsyncState {
  if (isAsyncAction(action)) {
    const ids = arrayOf(action.id);
    return {
      ...state,
      [action.type]: reduceAsyncStatePart(state[action.type], action, 0, ids),
    };
  } else {
    switch (action.type) {
      case CLEAR_ASYNC_ACTION:
        return {};
      default:
        return state;
    }
  }
}

function reduceAsyncStatePart(state: AsyncStatePart = {}, action: AsyncAction, index: number, ids: string[]): AsyncStatePart {
  if (index === ids.length) {
    return reduceAsyncActionState(state as AsyncActionState, action);
  } else {
    const currentId = ids[index];
    return {
      ...state,
      [currentId]: {
        ...reduceAsyncStatePart(state[currentId], action, index + 1, ids),
      },
    };
  }
}

function reduceAsyncActionState(state: AsyncActionState, action: AsyncAction): AsyncActionState {
  return {
    ...state,
    pending: action.phase === FETCH_PHASE,
    complete: action.phase === COMPLETE_PHASE,
    failed: action.phase === ERROR_PHASE,
    terminated: action.phase === ERROR_PHASE || action.phase === COMPLETE_PHASE,
  };
}
