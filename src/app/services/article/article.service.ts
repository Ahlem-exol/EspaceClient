import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { Lot } from 'src/app/models/lot.model';
import { StatLot } from 'src/app/models/statLot.model';

const BACKEND_URL = 'http://localhost:3000/api/article';
interface addData {
  designation: string;
  unite: string;
  quantite: number;
  prixUnitaire: number;
  datedebut: Date;
  dateFin: Date;
  lot_id: number;
}

interface addDataLotStat {
  percentage: Number;
  dateUpdate: Date;
  lot_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  createArticle(
    designation: string,
    unite: string,
    quantite: number,
    prixUnitaire: number,
    datedebut: Date,
    dateFin: Date,
    lot_id: number
  ) {
    const ArticleData: addData = {
      designation: designation,
      unite: unite,
      quantite: quantite,
      prixUnitaire: prixUnitaire,
      datedebut: datedebut,
      dateFin: dateFin,
      lot_id: lot_id,
    };

    console.log(ArticleData);
    return this.http.post<{ message: string }>(`${BACKEND_URL}/`, ArticleData);
  }

  getArticle() {
    return this.http.get<{ message: string; Articles: Article[] }>(
      `${BACKEND_URL}/`
    );
  }

  // updateLot(updateLot: Lot) {
  //   return this.http.put<{ message: string }>(
  //     BACKEND_URL + '/update/' + updateLot.id,
  //     updateLot
  //   );
  // }
  // DeleteLot(idLot: number) {
  //   console.log('id user ', idLot);

  //   return this.http.put<{ message: string }>(
  //     BACKEND_URL + '/desactiver/' + idLot,
  //     null
  //   );
  // }

  // updateLotStat(percentage: Number, dateUpdate: Date, lot_id: number) {
  //   const ProjData: addDataLotStat = {
  //     percentage: percentage,
  //     dateUpdate: dateUpdate,
  //     lot_id: lot_id,
  //   };

  //   console.log(ProjData);
  //   return this.http.post<{ message: string }>(
  //     `${BACKEND_URL}/updateLotStat`,
  //     ProjData
  //   );
  // }

  // getLotStaTs(id: number) {
  //   return this.http.get<{ message: string; lotstats: StatLot[] }>(
  //     BACKEND_URL + '/' + id
  //   );
  // }
}
