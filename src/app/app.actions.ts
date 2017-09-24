import {AsyncAction, COMPLETE_PHASE, FETCH_PHASE} from './async/async.actions';
import {CollectionAction} from './collection/collection.actions';
import {AlterableDevice, Device} from './device';
import {EntityCollection} from './collection/collection';
import {
  ADD_OFF_RESOURCE_ACTION,
  ADD_ON_RESOURCE_ACTION,
  AddOnResourceAction,
  EDIT_OFF_RESOURCE_ACTION,
  EDIT_ON_RESOURCE_ACTION,
  EditOnResourceAction,
  INVALIDATE_RESOURCE_ACTION,
  REFRESH_RESOURCE_ACTION,
  SimpleResourceAction,
} from './resource/resource.actions';
import {EntityAction} from './entity/entity.actions';

export const DEVICE_COLLECTION_FETCH = '[Device] Collection Fetch';
export const DEVICE_COLLECTION_COMPLETE = '[Device] Collection Complete';
export const DEVICE_ADD_ACTION = '[Device] Add';
export const DEVICE_EDIT_ACTION = '[Device] Edit';

export class DeviceCollectionFetch implements SimpleResourceAction, AsyncAction {
  readonly type = DEVICE_COLLECTION_FETCH;
  readonly phase = FETCH_PHASE;
  readonly resourceActionType = INVALIDATE_RESOURCE_ACTION;
}

export class DeviceCollectionComplete implements SimpleResourceAction, CollectionAction<Device, EntityCollection<Device>> {
  readonly type = DEVICE_COLLECTION_COMPLETE;
  readonly phase = COMPLETE_PHASE;
  readonly resourceActionType = REFRESH_RESOURCE_ACTION;

  constructor(public collection: EntityCollection<Device>) {}

  get id() { return this.resourceActionType; };
}

export class DeviceEditOnAction implements EditOnResourceAction<AlterableDevice>, EntityAction {
  readonly type = DEVICE_EDIT_ACTION;
  readonly resourceActionType = EDIT_ON_RESOURCE_ACTION;

  constructor(public entityId: string, public editedResource: AlterableDevice) {}
}


export class DeviceEditOffAction implements SimpleResourceAction, EntityAction {
  readonly type = DEVICE_EDIT_ACTION;
  readonly resourceActionType = EDIT_OFF_RESOURCE_ACTION;

  constructor(public entityId: string) {}
}

export class DeviceAddOnAction implements AddOnResourceAction<AlterableDevice> {
  readonly type = DEVICE_ADD_ACTION;
  readonly resourceActionType = ADD_ON_RESOURCE_ACTION;

  constructor(public newResource: AlterableDevice) {}
}


export class DeviceAddOffAction implements SimpleResourceAction {
  readonly type = DEVICE_ADD_ACTION;
  readonly resourceActionType = ADD_OFF_RESOURCE_ACTION;
}

export type AnyAction = DeviceCollectionFetch | DeviceCollectionComplete | DeviceEditOnAction | DeviceEditOffAction
  | DeviceAddOnAction | DeviceAddOffAction;
