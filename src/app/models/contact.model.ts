import { Societe } from './societe.model';

export class Contact {
  constructor(
    public id: number,
    public nom: string,
    public prenom: string,
    public fonction: string,
    public dateInscreption: Date,
    public adress: string,
    public telephone: string,
    public email: string,
    public password: string,
    public raisonSocial: string,
    public societe: Societe,
    public idSociete: number
  ) {}
}
