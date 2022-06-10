export class User {
  constructor(
    public id: number,
    public nom: string,
    public prenom: string,
    public fonction: string,
    public dateInscreption: Date,
    public adress: string,
    public telephone: string,
    public email: string,
    public password: string
  ) {}
}
