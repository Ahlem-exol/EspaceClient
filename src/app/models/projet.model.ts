import { Societe } from './societe.model';

// SELECT `lot_id`, `titre`, `description`, `duree`, `dateFinLot`, `usr_id`, `prj_id`, `active`
export class Projet {
  constructor(
    public id: number,
    public titre: string,
    public duree: string,
    public description: string,
    public localisation: Date,
    public dateDemarage: string,
    public dateFin: string,
    public active: string,
    public raisonSocial: string,
    public societe_id: string,
    public societe: Societe
  ) {}
}
