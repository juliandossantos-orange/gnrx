import {Dictionnary} from './collection/dictionnary';
import {Resource} from './resource/resource';
import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {AlterableDevice, Device} from './device';
import {
  DEVICE_COLLECTION_COMPLETE, DEVICE_COLLECTION_FETCH, AnyAction, DEVICE_EDIT_ACTION,
  DEVICE_ADD_ACTION,
} from './app.actions';
import {reduceCollection} from './collection/collection.reducer';
import {reduceNewResources, reduceResource} from './resource/resource.reducer';
import {InjectionToken} from '@angular/core';
import {Ids} from './collection/collection';
import {environment} from '../environments/environment';
import {AsyncState, reduceAsyncState} from './async/async.reducer';

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('App reducer');

export interface AppState {
  deviceManagement: DeviceManagementState;
  async: AsyncState;
}

export interface DeviceManagementState {
  newDevice?: AlterableDevice,
  devices: Dictionnary<DeviceResource>;
  deviceCollection: DeviceCollection;
}

export interface DeviceResource extends Device, Resource<AlterableDevice> {}

export interface DeviceCollection extends Ids, Resource {}

export const reducer: ActionReducerMap<AppState> = {
  deviceManagement: reduceDeviceManagement,
  async: reduceAsyncState,
};

const initialDeviceManagmentState: DeviceManagementState = {
  devices: {},
  deviceCollection: {
    list: [],
  },
};

function reduceDeviceManagement(state = initialDeviceManagmentState, action: AnyAction): DeviceManagementState {
  switch (action.type) {
    case DEVICE_COLLECTION_FETCH:
    case DEVICE_COLLECTION_COMPLETE:
      const reducedDevices = reduceCollection<Device, DeviceResource, DeviceCollection>(reduceDeviceForCollection, reduceResource)(
        {entities: state.devices, collection: state.deviceCollection}, action);
      return {
        ...state,
        devices: {
          ...state.devices,
          ...reducedDevices.entities
        },
        deviceCollection: reduceResource(reducedDevices.collection, action),
      };
    case DEVICE_EDIT_ACTION:
      return {
        ...state,
        devices: {
          ...state.devices,
          [action.entityId]: reduceResource(state.devices[action.entityId], action),
        },
      };
    case DEVICE_ADD_ACTION:
      return {
        ...state,
        newDevice: reduceNewResources(state.newDevice, action),
      };
    default:
      return state;
  }
}

function reduceDeviceForCollection(state: DeviceResource | undefined, action: AnyAction,
                                   current: Device): DeviceResource {
  return {
    ...state,
    id: current.id,
    name: current.name,
  };
}

export const selectDevices = state => {
  return state.deviceManagement.deviceCollection.list.map(id => state.deviceManagement.devices[id]);
};

export const selectNewDevice = state => {
  return state.deviceManagement.newDevice;
};


// console.log all actions
export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function (state: AppState, action: any): AppState {
    const newState = reducer(state, action);
    console.log('action', action);
    console.log('state', newState);
    return newState;
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
