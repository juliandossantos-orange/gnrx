
import {Entity} from './entity/entity';

export interface Device extends Entity {
    name: string;
}

export interface AlterableDevice {
  name: string;
}
