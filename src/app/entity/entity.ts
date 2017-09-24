export interface Entity {
  id: Id
}

export type Id = string;

export const selectId = (entity: Entity) => entity.id;
