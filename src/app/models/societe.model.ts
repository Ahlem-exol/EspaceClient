export class Societe {
  constructor(
    public id: number,
    public raisonSocial: string,
    public adresse: string,
    public mail: string,
    public telephone: string,
    public description: string,
    public active: number,
    public fixe: string,
    public usr_id: string
  ) {}
}
