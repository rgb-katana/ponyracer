interface PonyModel {
  id: number;
  name: string;
  color: string;
}

export default interface RaceModel {
  id: number;
  name: string;
  ponies: PonyModel[];
  startInstant: string;
}
