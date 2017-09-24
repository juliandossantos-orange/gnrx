import {Entity} from '../entity/entity';

export interface Dictionnary<T extends Entity> {
    [id: string]: T | undefined
}
