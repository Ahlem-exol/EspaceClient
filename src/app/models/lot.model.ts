import { Projet } from './projet.model';

export class Lot {
  constructor(
    public id: number,
    public titre: string,
    public duree: string,
    public description: string,
    public dateFinLot: Date,
    public etat: string,
    public prj_id: string,
    public projeTitre: string,
    public projet: Projet
  ) {}
}
