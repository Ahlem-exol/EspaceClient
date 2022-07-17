import { Lot } from './lot.model';

export class StatLot {
  constructor(
    public id: number,
    public dateUpdate: Date,
    public percentage: number,
    public id_art: number,
    public lotTitre: string,
    public lot: Lot
  ) {}
}
