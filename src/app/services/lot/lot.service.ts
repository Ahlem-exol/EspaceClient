import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lot } from 'src/app/models/lot.model';
import { StatLot } from 'src/app/models/statLot.model';

const BACKEND_URL = 'http://localhost:3000/api/lot';
interface addData {
  titre: string;
  duree: string;
  description: string;
  montentLot: number;
  dateFinLot: Date;
  datedebut: Date;
  etat: string;
  prj_id: string;
}

interface addDataLotStat {
  percentage: Number;
  dateUpdate: Date;
  lot_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class LotService {
  constructor(private http: HttpClient) {}

  createLot(
    titre: string,
    duree: string,
    description: string,
    montentLot: number,
    dateFinLot: Date,
    datedebut: Date,
    etat: string,
    prj_id: string
  ) {
    const ProjData: addData = {
      titre: titre,
      duree: duree,
      description: description,
      montentLot: montentLot,
      dateFinLot: dateFinLot,
      datedebut: datedebut,
      etat: etat,
      prj_id: prj_id,
    };

    console.log(ProjData);
    return this.http.post<{ message: string }>(`${BACKEND_URL}/`, ProjData);
  }

  getLots() {
    return this.http.get<{ message: string; lots: Lot[] }>(`${BACKEND_URL}/`);
  }

  updateLot(updateLot: Lot) {
    return this.http.put<{ message: string }>(
      BACKEND_URL + '/update/' + updateLot.id,
      updateLot
    );
  }
  DeleteLot(idLot: number) {
    console.log('id user ', idLot);

    return this.http.put<{ message: string }>(
      BACKEND_URL + '/desactiver/' + idLot,
      null
    );
  }

  updateLotStat(percentage: Number, dateUpdate: Date, lot_id: number) {
    const ProjData: addDataLotStat = {
      percentage: percentage,
      dateUpdate: dateUpdate,
      lot_id: lot_id,
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
