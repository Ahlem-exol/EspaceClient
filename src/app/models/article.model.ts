import { Lot } from './lot.model';

export class Article {
  constructor(
    public id: number,

    public designation: string,
    public unite: string,
    public quantite: number,
    public prixUnitaire: number,
    public montant: number,
    public montantRealise:number,
    public quantitRealise: number,

    public per: number,
    public perReal: number,
    public perNonReal: number,
    public perRealiseCalc: number,
    public perNonRealiseCalc: number,

    public datedebut: Date,
    public dateFin: Date,

    public lot_id: string,
    public lot: Lot
  ) {}
}
