import { PonyModel } from './pony.model';

export default interface RaceModel {
  id: number;
  name: string;
  ponies: PonyModel[];
  startInstant: string;
}
