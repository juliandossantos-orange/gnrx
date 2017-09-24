import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AppState, DeviceResource, selectDevices, selectNewDevice} from './app.reducer';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/map';
import {
  DeviceEditOffAction, DeviceCollectionComplete, DeviceEditOnAction, DeviceAddOnAction,
  DeviceAddOffAction,
} from './app.actions';
import {AlterableDevice} from './device';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [],
})
export class AppComponent {
  newDevice: Observable<AlterableDevice>;
  devices: Observable<DeviceResource[]>;

  constructor(public store: Store<AppState>) {
    store.dispatch(new DeviceCollectionComplete({
      list: [{
        id: 'h',
        name: 'Hello',
      }, {
        id: 'w',
        name: 'World',
      }],
    }));
    this.devices = store.select(selectDevices);
    this.newDevice = store.select(selectNewDevice);
  }

  create() {
    this.store.dispatch(new DeviceAddOnAction({name: ''}));
  }

  add() {}

  edit(device: DeviceResource) {
    this.store.dispatch(new DeviceEditOnAction(device.id, {name: device.name}));
  }

  update(id: string, device: AlterableDevice) {}

  cancelEdit(id: string) {
    this.store.dispatch(new DeviceEditOffAction(id));
  }

  cancelAdd() {
    this.store.dispatch(new DeviceAddOffAction());
  }
}
