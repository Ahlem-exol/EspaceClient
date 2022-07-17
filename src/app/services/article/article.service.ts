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
  id_art: number;
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

  getArticle(id: number) {
    return this.http.get<{ message: string; Articles: Article[] }>(
      BACKEND_URL + '/all' + id
    );
  }

  updateLotStat(percentage: Number, dateUpdate: Date, id_art: number) {
    const ProjData: addDataLotStat = {
      percentage: percentage,
      dateUpdate: dateUpdate,
      id_art: id_art,
    };

    console.log(ProjData);
    return this.http.post<{ message: string }>(
      `${BACKEND_URL}/updateLotStat`,
      ProjData
    );
  }

  getLotStaTs(id: number) {
    return this.http.get<{ message: string; lotstats: StatLot[] }>(
      BACKEND_URL + '/' + id
    );
  }
}
